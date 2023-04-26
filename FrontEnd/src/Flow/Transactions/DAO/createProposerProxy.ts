/** @format */

export const setProxy = () => {
  return `
import ExampleDAO from 0x800a10d0fff7acd4

transaction {

    prepare(Member: AuthAccount) {

        let proposerProxy <- ExampleDAO.createProposerProxy()

        Member.save(
            <- proposerProxy,
            to: ExampleDAO.ProposerProxyStoragePath,
        )

        Member.link<&ExampleDAO.ProposerProxy{ExampleDAO.ProposerProxyPublic}>(
            ExampleDAO.ProposerProxyPublicPath,
            target: ExampleDAO.ProposerProxyStoragePath
        )
    }
}
  `;
};
