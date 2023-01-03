import { config } from "@onflow/fcl";

config()
  .put('app.detail.title', "Sample DAO")
  .put('app.detail.icon', 'https://clipground.com/images/placeholder-logo-6.png')
  .put('accessNode.api', 'https://rest-testnet.onflow.org')
  .put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn');
