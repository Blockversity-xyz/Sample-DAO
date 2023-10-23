export const setup_USDC = () => {
    return `
    import FungibleToken from 0xc61f695fe4f80614
    import OnChainMultiSig from 0xc61f695fe4f80614
    import NonFungibleToken from 0xc61f695fe4f80614
    import MetadataViews from 0xc61f695fe4f80614
    import GToken from 0xba85020e56e96b74

    import FiatToken from 0xa4f61a30f7716c6f
    import GTokenExampleDAO from 0xba85020e56e96b74
    import GovTokenPublicSale from 0xba85020e56e96b74
    
    transaction(multiSigPubKeys: [String], multiSigKeyWeights: [UFix64], multiSigAlgos: [UInt8]) {
    
        prepare(signer: AuthAccount) {
    
            // Return early if the account already stores a FiatToken Vault
            if signer.borrow<&FiatToken.Vault>(from: FiatToken.VaultStoragePath) != nil {
                return
            }
    
            // Create a new ExampleToken Vault and put it in storage
            signer.save(
                <-FiatToken.createEmptyVault(),
                to: FiatToken.VaultStoragePath
            )
    
            // Create a public capability to the Vault that only exposes
            // the deposit function through the Receiver interface
            signer.link<&FiatToken.Vault{FungibleToken.Receiver}>(
                FiatToken.VaultReceiverPubPath,
                target: FiatToken.VaultStoragePath
            )
    
            // Create a public capability to the Vault that only exposes
            // the UUID() function through the VaultUUID interface
            signer.link<&FiatToken.Vault{FiatToken.ResourceId}>(
                FiatToken.VaultUUIDPubPath,
                target: FiatToken.VaultStoragePath
            )
    
            // Create a public capability to the Vault that only exposes
            // the balance field through the Balance interface
            signer.link<&FiatToken.Vault{FungibleToken.Balance}>(
                FiatToken.VaultBalancePubPath,
                target: FiatToken.VaultStoragePath
            )

            //-----------------------------GToken Setup--------------------------------

            // Return early if the account already stores a GToken Vault
            if signer.borrow<&GToken.Vault>(from: /storage/DemoGToken) != nil {
                return
            }
    
            // Create a new GToken Vault and put it in storage
            signer.save(
                <-GToken.createEmptyVault(),
                to: /storage/DemoGToken
            )
    
            // Create a public capability to the Vault that only exposes
            // the deposit function through the Receiver interface
            signer.link<&GToken.Vault{FungibleToken.Receiver}>(
                /public/DemoGTokenReceiver,
                target: /storage/DemoGToken
            )
    
            // Create a public capability to the Vault that exposes the Balance and Resolver interfaces
            signer.link<&GToken.Vault{FungibleToken.Balance, MetadataViews.Resolver}>(
                /public/DemoGTokenBalanceResolver,
                target: /storage/DemoGToken
            )
    
    
            //-----------------------------GovTokenPublicSale Setup--------------------------------
    
                // Claim a Admin resource
        let admin <- GovTokenPublicSale.claimAdmin()
        
        // Save the Admin to the account storage
        signer.save(<-admin, to: /storage/DemoGovTokenPublicSaleAdmin)
        
        log("you are now an admin")
    
        //-----------------------------GToken Setup--------------------------------
    
            // Claim an Admin resource
        let admin2 <- GToken.claimAdminGVT()
        
        // Save the Admin to the account storage
        signer.save(<-admin2, to: /storage/DemoGTokenAdmin)
    
        //-----------------------------GTokenExampleDAO Setup--------------------------------
    
            // Claim a Proposer resource
        let proposer <- GTokenExampleDAO.claimProposer()
        
        // Save the proposer to the account storage
        signer.save(<-proposer, to: /storage/DemoDAOProposer)
        
        log("Done")
    
        
        let voter <- GTokenExampleDAO.initVoter()
    
        signer.save(<-voter, to: /storage/DemoGTokenExampleDAOVoter)
        signer.link<&GTokenExampleDAO.Voter>(
          /public/DemoGTokenExampleDAOVoter,
          target: /storage/DemoGTokenExampleDAOVoter
        )
    
        log("Done")
    
        //-----------------------------Burner Setup--------------------------------
    
    
        // Claim a Burner resource
    
            let adminRef = signer.borrow<&GToken.Administrator>(from: /storage/DemoGTokenAdmin)
                ?? panic("Could not borrow a reference to the Administrator resource")
    
            // Create a new Burner resource
            let burner <- adminRef.createNewBurner()
    
            // Save the newly created Burner resource to storage
            signer.save(<-burner, to: /storage/DemoGTBurner)
    
            // Log a message or perform additional actions if needed
            log("New Burner resource created")
        }
    }
    

    `;
  };