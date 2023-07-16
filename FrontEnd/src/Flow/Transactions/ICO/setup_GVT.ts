export const setup_GVT = () => {
  return `
import FungibleToken from 0xc61f695fe4f80614
import NonFungibleToken from 0xc61f695fe4f80614
import GToken from 0xc61f695fe4f80614
import MetadataViews from 0xc61f695fe4f80614
import FUSD from 0xc61f695fe4f80614
import GTokenExampleDAO from 0xc61f695fe4f80614
import GovTokenPublicSale from 0xc61f695fe4f80614

transaction () {

    prepare(signer: AuthAccount) {

        // Return early if the account already stores a GToken Vault
        if signer.borrow<&GToken.Vault>(from: GToken.VaultStoragePath) != nil {
            return
        }

        // Create a new GToken Vault and put it in storage
        signer.save(
            <-GToken.createEmptyVault(),
            to: GToken.VaultStoragePath
        )

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&GToken.Vault{FungibleToken.Receiver}>(
            GToken.ReceiverPublicPath,
            target: GToken.VaultStoragePath
        )

        // Create a public capability to the Vault that exposes the Balance and Resolver interfaces
        signer.link<&GToken.Vault{FungibleToken.Balance, MetadataViews.Resolver}>(
            GToken.VaultPublicPath,
            target: GToken.VaultStoragePath
        )

        //-----------------------------FUSD Setup--------------------------------

                // It's OK if the account already has a Vault, but we don't want to replace it
        if(signer.borrow<&FUSD.Vault>(from: /storage/FUSDVault) != nil) {
            log("FUSD Vault already exists in account")
            return
        }

        // Create a new FUSD Vault and put it in storage
        signer.save(<-FUSD.createEmptyVault(), to: /storage/FUSDVault)

        // Create a public capability to the Vault that only exposes
        // the deposit function through the Receiver interface
        signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
            /public/fusdReceiver,
            target: /storage/FUSDVault
        )

        // Create a public capability to the Vault that only exposes
        // the balance field through the Balance interface
        signer.link<&FUSD.Vault{FungibleToken.Balance}>(
            /public/fusdBalance,
            target: /storage/FUSDVault
        )


        //-----------------------------GovTokenPublicSale Setup--------------------------------

            // Claim a Admin resource
    let admin <- GovTokenPublicSale.claimAdmin()
    
    // Save the Admin to the account storage
    signer.save(<-admin, to: /storage/GovTokenPublicSaleAdmin)
    
    log("you are now an admin")

    //-----------------------------GToken Setup--------------------------------

        // Claim an Admin resource
    let admin2 <- GToken.claimAdminGVT()
    
    // Save the Admin to the account storage
    signer.save(<-admin2, to: /storage/GTokenAdmin)

    //-----------------------------GTokenExampleDAO Setup--------------------------------

        // Claim a Proposer resource
    let proposer <- GTokenExampleDAO.claimProposer()
    
    // Save the proposer to the account storage
    signer.save(<-proposer, to: /storage/DAOProposer)
    
    log("Done")

    
    let voter <- GTokenExampleDAO.initVoter()

    signer.save(<-voter, to: /storage/GTokenExampleDAOVoter)
    signer.link<&GTokenExampleDAO.Voter>(
      /public/GTokenExampleDAOVoter,
      target: /storage/GTokenExampleDAOVoter
    )

    log("Done")

    //-----------------------------Burner Setup--------------------------------


    // Claim a Burner resource

        let adminRef = signer.borrow<&GToken.Administrator>(from: /storage/GTokenAdmin)
            ?? panic("Could not borrow a reference to the Administrator resource")

        // Create a new Burner resource
        let burner <- adminRef.createNewBurner()

        // Save the newly created Burner resource to storage
        signer.save(<-burner, to: /storage/GTBurner)

        // Log a message or perform additional actions if needed
        log("New Burner resource created")
    }
}
  `
}