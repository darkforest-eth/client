# Dark Forest Client

## Development Guide

### Installing Core Dependencies

- Node (v14.15.x)
- Yarn (Javascript Package Manager)

#### Installing The Correct Node Version Using NVM

Dark Forest is built and tested using Node.js v14.15.x and might not run properly on other Node.js versions. We recommend using NVM to switch between multiple Node.js version on your machine.

```sh
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install
```

After the installation is finished, you can run `node --version` to verify that you are running v14.15.x

#### Installing Yarn

Refer to [Yarn's official documentation](https://classic.yarnpkg.com/en/docs/install) for the installation guide.

After you have Yarn installed, run `yarn` to install the dependencies:

### Running the client

For connecting to the mainnet client, simply run `yarn start:prod`. When asked you can use your whitelist key or import your mainnet burner secret and Home coordinates.

To connect to your own development client, follow directions there to start that node, then run `yarn start:dev`. When the game asks, you won't have access to the whitelist server and can't create a new account or use a whitelist key. Instead import a wallet and use the private key of one of the accounts the hardhat node created and funded, which are printed when you started the node such as:

> Account #2: 0x3097403b64fe672467345bf159f4c9c5464bd89e (100 ETH)
> Private Key: 0x67195c963ff445314e667112ab22f4a7404bad7f9746564eb409b9bb8c6aed32
