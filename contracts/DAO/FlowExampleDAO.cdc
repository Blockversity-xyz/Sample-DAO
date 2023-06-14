import NonFungibleToken from 0x631e88ae7f1d7c20
import FungibleToken from 0x9a0766d93b6608b7
import GovernanceToken from 0x800a10d0fff7acd4

pub contract ExampleDAO {
  access(contract) var Proposals: [Proposal]
  access(contract) var votedRecords: [{ Address: Int }]
  access(contract) var totalProposals: Int

  pub let AdminStoragePath: StoragePath
  pub let VoterStoragePath: StoragePath
  pub let VoterPublicPath: PublicPath
  pub let VoterPath: PrivatePath
  // storage path for proposer
  pub let ProposerStoragePath: StoragePath


  pub resource Admin {
    pub fun createProposer(): @ExampleDAO.Proposer {
      return <- create Proposer()
    }
  }

  pub resource Proposer {
    pub fun addProposal(
      title: String,
      description: String,
      options: [String],
      startAt: UFix64?,
      endAt: UFix64?,
      minHoldedGVTAmount: UFix64?
    ) {
      
      let proposalResource <- create Proposal(
        proposer: self.owner!.address,
        title: title,
        description: description,
        options: options,
        startAt: startAt,
        endAt: endAt,
        minHoldedGVTAmount: minHoldedGVTAmount
      )
      self.owner!.save(<-proposalResource, to: /storage/ExampleDAOProposal)

      ExampleDAO.Proposals.append(proposalResource)
      ExampleDAO.votedRecords.append({})
      ExampleDAO.totalProposals = ExampleDAO.totalProposals + 1
    }
  }

  pub resource interface VoterPublic {
    pub fun getVotedOption(ProposalId: UInt64): Int?
    pub fun getVotedOptions(): { UInt64: Int }
  }

  

  pub resource Voter: VoterPublic {
    access(self) var records: { UInt64: Int }

    pub fun vote(ProposalId: UInt64, optionIndex: Int) {
      pre {
        self.records[ProposalId] == nil: "Already voted"
        optionIndex < ExampleDAO.Proposals[ProposalId].options.length: "Invalid option"
      }
      ExampleDAO.Proposals[ProposalId].vote(voterAddr: self.owner!.address, optionIndex: optionIndex)
      self.records[ProposalId] = optionIndex
    }

    pub fun getVotedOption(ProposalId: UInt64): Int? {
      return self.records[ProposalId]
    }

    pub fun getVotedOptions(): { UInt64: Int } {
      return self.records
    }

    init() {
      self.records = {}
    }
  }

  pub struct Proposal {
    pub let id: Int
    pub let proposer: Address
    pub var title: String
    pub var description: String
    pub var options: [String]
    pub var votesCountActual: [UInt64]
    pub let createdAt: UFix64
    pub var updatedAt: UFix64
    pub var startAt: UFix64
    pub var endAt: UFix64
    pub var sealed: Bool
    pub var countIndex: Int
    pub var voided: Bool
    pub let minHoldedGVTAmount: UFix64

    init(
      proposer: Address,
      title: String,
      description: String,
      options: [String],
      startAt: UFix64?,
      endAt: UFix64?,
      minHoldedGVTAmount: UFix64?
    ) {
      self.id = ExampleDAO.totalProposals
      self.proposer = proposer
      self.title = title
      self.description = description
      self.options = options
      self.votesCountActual = []
      self.createdAt = getCurrentBlock().timestamp
      self.updatedAt = getCurrentBlock().timestamp
      self.startAt = startAt ?? 0.0
      self.endAt = endAt ?? 0.0
      self.sealed = false
      self.countIndex = ExampleDAO.totalProposals
      self.voided = false
      self.minHoldedGVTAmount = minHoldedGVTAmount ?? 0.0
    }

    pub fun vote(voterAddr: Address, optionIndex: Int) {
      pre {
        !self.sealed: "Proposal is sealed"
        getCurrentBlock().timestamp >= self.startAt: "Voting has not started"
        getCurrentBlock().timestamp <= self.endAt: "Voting has ended"
        optionIndex < self.options.length: "Invalid option"
      }
      let voteCount = self.votesCountActual[optionIndex]
      self.votesCountActual[optionIndex] = voteCount + 1
      ExampleDAO.votedRecords[self.id][voterAddr] = optionIndex
    }
  }

  pub fun getHoldedGVT(address: Address): UFix64 {
    let acct = getAccount(address)
    let receiverRef = acct.getCapability<&{FungibleToken.Balance}>(/public/FungibleTokenHolder)!
    if receiverRef.borrow() != nil {
      let balance = receiverRef.borrow()!.balance
      return balance
    } else {
      return 0.0
    }
  }

  pub fun getProposals(): [Proposal] {
    return ExampleDAO.Proposals
  }

  pub fun getProposal(id: Int): Proposal? {
    return ExampleDAO.Proposals[id]
  }

  pub fun count(): Int {
    return ExampleDAO.totalProposals
  }

  init () {
    self.Proposals = []
    self.votedRecords = []
    self.totalProposals = 0

    self.ProposerStoragePath = /storage/ExampleDAOProposer
    self.AdminStoragePath = /storage/ExampleDAOAdmin
    self.VoterStoragePath = /storage/ExampleDAOVoter
    self.VoterPublicPath = /public/ExampleDAOVoter
    self.VoterPath = /private/ExampleDAOVoter

    self.account.save(<-create Admin(), to: self.AdminStoragePath)
    self.account.save(<-create Proposer(), to: self.ProposerStoragePath)
    self.account.save(<-create Voter(), to: self.VoterStoragePath)
    self.account.link<&ExampleDAO.Voter>(
            self.VoterPublicPath,
            target: self.VoterStoragePath
        )

    emit ContractInitialized()
  }
}
