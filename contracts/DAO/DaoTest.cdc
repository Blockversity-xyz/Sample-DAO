import NonFungibleToken from "../utility/NonFungibleToken.cdc"
import FungibleToken from "../utility/FungibleToken.cdc"
import BlockVersityToken from "../BlockVersityToken.cdc"

pub contract BlockVersityDAO {
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
  pub resource Admin {
    pub fun createProposer(): @BlockVersityDAO.Proposer {
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
      pub fun addProposal(title: String, description: String, options: [String], startAt: UFix64?, endAt: UFix64?, minHoldedBVTAmount: UFix64?) {
        BlockVersityDAO.Proposals.append(Proposal(
         proposer: self.owner!.address,
         title: title,
         description: description,
         options: options,
         startAt: startAt,
         endAt: endAt,
         minHoldedBVTAmount: minHoldedBVTAmount
       ))
       BlockVersityDAO.votedRecords.append({})
       BlockVersityDAO.totalProposals = BlockVersityDAO.totalProposals + 1
     }

      pub fun updateProposal(id: Int, title: String?, description: String?, startAt: UFix64?, endAt: UFix64?, voided: Bool?) {
       pre {
         BlockVersityDAO.Proposals[id].proposer == self.owner!.address: "Only original proposer can update"
       }

        BlockVersityDAO.Proposals[id].update(
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

        pub fun addProposal(_title: String, _description: String, _options: [String], _startAt: UFix64?, _endAt: UFix64?, _minHoldedBVTAmount: UFix64?): Void? {
            return self.ProposerCapability
            ?.borrow()!
            ?.addProposal(title: _title, description: _description, options: _options, startAt: _startAt, endAt: _endAt, minHoldedBVTAmount: _minHoldedBVTAmount)
        }
/*         pub fun updateProposal(id: Int, title: String?, description: String?, startAt: UFix64?, endAt: UFix64?, voided: Bool?) {
          return <- self.ProposerCapability!
          .borrow()!
          .updateProposal(id: Int, title: String, description: String, startAt: UFix64, endAt: UFix64, voided: Bool)
        } */
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
  pub let minHoldedBVTAmount: UFix64

  init(proposer: Address, title: String, description: String, options: [String], startAt: UFix64?, endAt: UFix64?, minHoldedBVTAmount: UFix64?) {
    pre {
      title.length <= 1000: "New title too long"
      description.length <= 1000: "New description too long"
    }

    self.proposer = proposer
    self.title = title
    self.options = options
    self.description = description
    self.votesCountActual = []
    self.minHoldedBVTAmount = minHoldedBVTAmount != nil ? minHoldedBVTAmount! : 0.0

    for option in options {
      self.votesCountActual.append(0)
    }

    self.id = BlockVersityDAO.totalProposals

    self.sealed = false
    self.countIndex = 0

    self.createdAt = getCurrentBlock().timestamp
    self.updatedAt = getCurrentBlock().timestamp

    self.startAt = startAt != nil ? startAt! : getCurrentBlock().timestamp
    self.endAt = endAt != nil ? endAt! : self.createdAt + 86400.0 * 14.0 // Around a year

    self.voided = false
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

  }

  init () {
    self.Proposals = []
    self.votedRecords = []
    self.totalProposals = 0

    self.AdminStoragePath = /storage/BlockVersityDAOAdmin
    self.ProposerStoragePath = /storage/BlockVersityDAOProposer
    self.ProposerProxyPublicPath = /public/BlockVersityDAOProposerProxy
    self.ProposerProxyStoragePath = /storage/BlockVersityDAOProposerProxy

    self.account.save(<-create Admin(), to: self.AdminStoragePath)
    self.account.save(<-create Proposer(), to: self.ProposerStoragePath)
  }
}
