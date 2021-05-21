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

After you have Yarn installed, run the following commands in the directory to install the remaining dependencies:

```sh
yarn
```

### Client Development Setup

Assuming you have a local node with game contracts already deployed you can simply start the client with:

```
yarn start:prod
```

You can import the private key of one of the accounts `hardhat node` created and funded, which are printed when you started the node such as:

```
Account #2: 0x3097403b64fe672467345bf159f4c9c5464bd89e (100 ETH)
Private Key: 0x67195c963ff445314e667112ab22f4a7404bad7f9746564eb409b9bb8c6aed32
```
