import FungibleToken from 0xc61f695fe4f80614
import NonFungibleToken from 0xc61f695fe4f80614
import GToken from 0xc61f695fe4f80614

pub contract GTokenExampleDAO {
  access(contract) var Proposals: [Proposal]
  access(contract) var votedRecords: [{ Address: Int }]
  access(contract) var totalProposals: Int
  pub var tokensForProposal: UFix64

  pub let ProposerStoragePath: StoragePath;
  pub let VoterStoragePath: StoragePath;
  pub let VoterPublicPath: PublicPath;
  pub let VoterPath: PrivatePath;

    // Events
  pub event ContractInitialized()
  pub event ProposalCreated(Title: String, Proposer: Address, MinHoldedGVTAmount: UFix64?)
  pub event VoteSubmitted(Voter: Address, ProposalId: Int, OptionIndex: Int)



    // Function to allow users to claim a proposer resource
    pub fun claimProposer(): @GTokenExampleDAO.Proposer {
        return <- create Proposer()
    }



  // Proposer
    //
    // Resource object that can create new proposals.
    // The admin stores this and passes it to the Proposer account as a capability wrapper resource.
    //
    pub resource Proposer {

        // Function that creates new proposals.
        //
      pub fun addProposal(
        title: String,
        description: String,
        options: [String],
        startAt: UFix64?,
        endAt: UFix64?,
        minHoldedGVTAmount: UFix64?
        ) {

        GTokenExampleDAO.Proposals.append(Proposal(
         proposer: self.owner!.address,
         title: title,
         description: description,
         options: options,
         startAt: startAt,
         endAt: endAt,
         minHoldedGVTAmount: minHoldedGVTAmount
        ))

        GTokenExampleDAO.votedRecords.append({})
        GTokenExampleDAO.totalProposals = GTokenExampleDAO.totalProposals + 1
      }

      pub fun updateProposal(
        id: Int,
        title: String?,
        description: String?,
        startAt: UFix64?,
        endAt: UFix64?,
        voided: Bool?
        ) {

        pre {
          GTokenExampleDAO.Proposals[id].proposer == self.owner!.address: "Only original proposer can update"
        }

        GTokenExampleDAO.Proposals[id].update(
          title: title,
          description: description,
          startAt: startAt,
          endAt: endAt,
          voided: voided
        )
      }
     }


    // ProposerProxy
    //
    // Resource object holding a capability that can be used to create new proposals.
    // The resource that this capability represents can be deleted by the admin
    // in order to unilaterally revoke proposer capability if needed.

    // createProposerProxy
    //
    // Function that creates a ProposerProxy.
    // Anyone can call this, but the ProposerProxy cannot
    // create proposals without a Proposer capability,
    // and only the admin can provide that.
    //

  pub resource interface VoterPublic {
    // voted Proposal id <-> options index mapping
    pub fun getVotedOption(ProposalId: UInt64): Int?
    pub fun getVotedOptions(): { UInt64: Int }
  }

  // Voter resource holder can vote on Proposals
  pub resource Voter: VoterPublic {
    access(self) var records: { UInt64: Int }

    pub fun vote(ProposalId: UInt64, optionIndex: Int) {
      pre {
        self.records[ProposalId] == nil: "Already voted"
        optionIndex < GTokenExampleDAO.Proposals[ProposalId].options.length: "Invalid option"
      }
      GTokenExampleDAO.Proposals[ProposalId].vote(voterAddr: self.owner!.address, optionIndex: optionIndex)
      self.records[ProposalId] = optionIndex
    };

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
    pub let id: Int;
    pub let proposer: Address
    pub var title: String
    pub var description: String
    pub var options: [String]
    // options index <-> result mapping
    pub var votesCountActual: [UInt64]
    pub let createdAt: UFix64
    pub var updatedAt: UFix64
    pub var startAt: UFix64
    pub var endAt: UFix64
    pub var sealed: Bool
    pub var countIndex: Int
    pub var voided: Bool
    pub let minHoldedGVTAmount: UFix64

    init(proposer: Address, title: String, description: String, options: [String], startAt: UFix64?, endAt: UFix64?, minHoldedGVTAmount: UFix64?) {
      pre {
        title.length <= 1000: "New title too long"
        description.length <= 1000: "New description too long"
        //GTokenExampleDAO.getHoldedGVT(address: proposer) >=  GTokenExampleDAO.tokensForProposal: "Proposer doesn't have enough GVT"
        GTokenExampleDAO.getHoldedGVT(address: proposer) <=  GTokenExampleDAO.tokensForProposal: "Proposer doesn't have enough GVT"
      }

      self.proposer = proposer
      self.title = title
      self.options = options
      self.description = description
      self.votesCountActual = []
      self.minHoldedGVTAmount = minHoldedGVTAmount != nil ? minHoldedGVTAmount! : 0.0

      for option in options {
        self.votesCountActual.append(0)
      }

      self.id = GTokenExampleDAO.totalProposals

      self.sealed = false
      self.countIndex = 0

      self.createdAt = getCurrentBlock().timestamp
      self.updatedAt = getCurrentBlock().timestamp

      self.startAt = startAt != nil ? startAt! : getCurrentBlock().timestamp
      self.endAt = endAt != nil ? endAt! : self.createdAt + 86400.0 * 14.0 // Around a year

      self.voided = false

      emit ProposalCreated(Title: title, Proposer: proposer, MinHoldedGVTAmount: minHoldedGVTAmount)
    }

    pub fun update(title: String?, description: String?, startAt: UFix64?, endAt: UFix64?, voided: Bool?) {
      pre {
        title?.length ?? 0 <= 1000: "Title too long"
        description?.length ?? 0 <= 1000: "Description too long"
        voided != true: "Can't update after started"
        getCurrentBlock().timestamp < self.startAt: "Can't update after started"
      }

      self.title = title != nil ? title! : self.title
      self.description = description != nil ? description! : self.description
      self.endAt = endAt != nil ? endAt! : self.endAt
      self.startAt = startAt != nil ? startAt! : self.startAt
      self.voided = voided != nil ? voided! : self.voided
      self.updatedAt = getCurrentBlock().timestamp
    }

    pub fun vote(voterAddr: Address, optionIndex: Int) {
      pre {
        self.isStarted(): "Vote not started"
        !self.isEnded(): "Vote ended"
        GTokenExampleDAO.votedRecords[self.id][voterAddr] == nil: "Already voted"
      }

      let voterGVT = GTokenExampleDAO.getHoldedGVT(address: voterAddr)

      // assert(voterGVT >= self.minHoldedGVTAmount, message: "Not enought GVT in your Vault to vote")
      assert(voterGVT < self.minHoldedGVTAmount, message: "Not enought GVT in your Vault to vote")

      GTokenExampleDAO.votedRecords[self.id][voterAddr] = optionIndex

      emit VoteSubmitted(Voter: voterAddr, ProposalId: self.id, OptionIndex: optionIndex)
    }

    // return if count ended
    pub fun count(size: Int): [UInt64] {
      if self.isEnded() == false {
        return self.votesCountActual
      }
      if self.sealed {
        return self.votesCountActual
      }
      // Fetch the keys of everyone who has voted on this proposal
      let votedList = GTokenExampleDAO.votedRecords[self.id].keys
      // Count from the last time you counted
      var batchEnd = self.countIndex + size
      // If the count index is bigger than the number of voters
      // set the count index to the number of voters
      if batchEnd > votedList.length {
        batchEnd = votedList.length
      }

      while self.countIndex != batchEnd {
        let address = votedList[self.countIndex]
        let votedOptionIndex = GTokenExampleDAO.votedRecords[self.id][address]!
        self.votesCountActual[votedOptionIndex] = self.votesCountActual[votedOptionIndex] + 1

        self.countIndex = self.countIndex + 1
      }

      self.sealed = self.countIndex == votedList.length

      return self.votesCountActual
    }

    pub fun isEnded(): Bool {
      return getCurrentBlock().timestamp >= self.endAt
    }

    pub fun isStarted(): Bool {
      return getCurrentBlock().timestamp >= self.startAt
    }

    pub fun getTotalVoted(): Int {
      return GTokenExampleDAO.votedRecords[self.id].keys.length
    }
  }

  pub fun getHoldedGVT(address: Address): UFix64 {
    let acct = getAccount(address)
    let vaultRef = acct.getCapability(GToken.VaultPublicPath)
        .borrow<&GToken.Vault{FungibleToken.Balance}>()
        ?? panic("Could not borrow Balance reference to the Vault")

    return vaultRef.balance
  }

  pub fun getProposals(): [Proposal] {
    return self.Proposals
  }

  pub fun getProposalsLength(): Int {
    return self.Proposals.length
  }

  pub fun getProposal(id: UInt64): Proposal {
    return self.Proposals[id]
  }

  pub fun count(ProposalId: UInt64, maxSize: Int): [UInt64] {
    return self.Proposals[ProposalId].count(size: maxSize)
  }

  pub fun getVotedRecords(): [{ Address: Int }] {
    return self.votedRecords
}

  pub fun initVoter(): @GTokenExampleDAO.Voter {
    return <- create Voter()
  }

  init () {
    self.Proposals = []
    self.votedRecords = []
    self.totalProposals = 0
    self.tokensForProposal = 10.0
 
    self.ProposerStoragePath = /storage/GTokenExampleDAOProposer
    self.VoterStoragePath = /storage/GTokenExampleDAOVoter
    self.VoterPublicPath = /public/GTokenExampleDAOVoter
    self.VoterPath = /private/GTokenExampleDAOVoter

    self.account.save(<-create Proposer(), to: self.ProposerStoragePath)
    self.account.save(<-create Voter(), to: self.VoterStoragePath)
    self.account.link<&GTokenExampleDAO.Voter>(
            self.VoterPublicPath,
            target: self.VoterStoragePath
        )

    emit ContractInitialized()
  }
}
 