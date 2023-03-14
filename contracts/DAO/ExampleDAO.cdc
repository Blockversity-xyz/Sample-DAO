import NonFungibleToken from "../utility/NonFungibleToken.cdc"
import FungibleToken from "../utility/FungibleToken.cdc"
import GovernanceToken from "../GovernanceToken.cdc"

pub contract ExampleDAO {
  access(contract) var Proposals: [Proposal]
  access(contract) var votedRecords: [{ Address: Int }]
  access(contract) var totalProposals: Int

  pub let AdminStoragePath: StoragePath;
  pub let ProposerStoragePath: StoragePath;
  // The storage Path for Proposers' ProposerProxy
  pub let ProposerProxyStoragePath: StoragePath
  // The public path for Proposers' ProposerProxy capability
  pub let ProposerProxyPublicPath: PublicPath
  // Admin resourse holder can create Proposers
  pub let VoterStoragePath: StoragePath;
  pub let VoterPublicPath: PublicPath;
  pub let VoterPath: PrivatePath;

    // Events
  pub event ContractInitialized()
  pub event ProposalCreated(Title: String, Proposer: Address, MinHoldedGVTAmount: UFix64?)
  pub event VoteSubmitted(Voter: Address, ProposalId: Int, OptionIndex: Int)

  pub resource Admin {
    pub fun createProposer(): @ExampleDAO.Proposer {
      return <- create Proposer()
    }
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

        ExampleDAO.Proposals.append(Proposal(
         proposer: self.owner!.address,
         title: title,
         description: description,
         options: options,
         startAt: startAt,
         endAt: endAt,
         minHoldedGVTAmount: minHoldedGVTAmount
        ))

        ExampleDAO.votedRecords.append({})
        ExampleDAO.totalProposals = ExampleDAO.totalProposals + 1
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
          ExampleDAO.Proposals[id].proposer == self.owner!.address: "Only original proposer can update"
        }

        ExampleDAO.Proposals[id].update(
          title: title,
          description: description,
          startAt: startAt,
          endAt: endAt,
          voided: voided
        )
      }
     }

    pub resource interface ProposerProxyPublic {
        pub fun setProposerCapability(capability: Capability<&Proposer>)
    }
    // ProposerProxy
    //
    // Resource object holding a capability that can be used to create new proposals.
    // The resource that this capability represents can be deleted by the admin
    // in order to unilaterally revoke proposer capability if needed.
    pub resource ProposerProxy: ProposerProxyPublic {
        // access(self) so nobody else can copy the capability and use it.
        access(self) var ProposerCapability: Capability<&Proposer>?
        // Anyone can call this, but only the admin can create Proposer capabilities,
        // so the type system constrains this to being called by the admin.
        pub fun setProposerCapability(capability: Capability<&Proposer>) {
            self.ProposerCapability = capability
        }

        pub fun addProposal(
          _title: String,
          _description: String,
          _options: [String],
          _startAt: UFix64?,
          _endAt: UFix64?,
          _minHoldedGVTAmount: UFix64?
          ): Void? {

            return self.ProposerCapability
            ?.borrow()!
            ?.addProposal(
              title: _title,
              description: _description,
              options: _options,
              startAt: _startAt,
              endAt: _endAt,
              minHoldedGVTAmount: _minHoldedGVTAmount
              )
        }

        pub fun updateProposal(
          id: Int,
          title: String?,
          description: String?,
          startAt: UFix64?,
          endAt: UFix64?,
          voided: Bool?
          ) {

          return self.ProposerCapability!
          .borrow()!
          .updateProposal(
            id: id,
            title: title,
            description: description,
            startAt: startAt,
            endAt: endAt,
            voided: voided
            )
        }

        init () {
          self.ProposerCapability = nil
        }

    }
    // createProposerProxy
    //
    // Function that creates a ProposerProxy.
    // Anyone can call this, but the ProposerProxy cannot
    // create proposals without a Proposer capability,
    // and only the admin can provide that.
    //
    pub fun createProposerProxy(): @ProposerProxy {
        return <- create ProposerProxy()
    }

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
        optionIndex < ExampleDAO.Proposals[ProposalId].options.length: "Invalid option"
      }
      ExampleDAO.Proposals[ProposalId].vote(voterAddr: self.owner!.address, optionIndex: optionIndex)
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

      self.id = ExampleDAO.totalProposals

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
        ExampleDAO.votedRecords[self.id][voterAddr] == nil: "Already voted"
      }

      let voterGVT = ExampleDAO.getHoldedGVT(address: voterAddr)

      assert(voterGVT >= self.minHoldedGVTAmount, message: "Not enought GVT in your Vault to vote")

      ExampleDAO.votedRecords[self.id][voterAddr] = optionIndex

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
      let votedList = ExampleDAO.votedRecords[self.id].keys
      // Count from the last time you counted
      var batchEnd = self.countIndex + size
      // If the count index is bigger than the number of voters
      // set the count index to the number of voters
      if batchEnd > votedList.length {
        batchEnd = votedList.length
      }

      while self.countIndex != batchEnd {
        let address = votedList[self.countIndex]
        let votedOptionIndex = ExampleDAO.votedRecords[self.id][address]!
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
      return ExampleDAO.votedRecords[self.id].keys.length
    }
  }

  pub fun getHoldedGVT(address: Address): UFix64 {
    let acct = getAccount(address)
    let vaultRef = acct.getCapability(GovernanceToken.VaultPublicPath)
        .borrow<&GovernanceToken.Vault{FungibleToken.Balance}>()
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

  pub fun initVoter(): @ExampleDAO.Voter {
    return <- create Voter()
  }

  init () {
    self.Proposals = []
    self.votedRecords = []
    self.totalProposals = 0

    self.AdminStoragePath = /storage/ExampleDAOAdmin
    self.ProposerStoragePath = /storage/ExampleDAOProposer
    self.ProposerProxyPublicPath = /public/ExampleDAOProposerProxy
    self.ProposerProxyStoragePath = /storage/ExampleDAOProposerProxy
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
