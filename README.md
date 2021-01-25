# Dark Forest Client

## Development Guide

### Installing Core Dependencies

- Node (v14.15.x)
- Yarn (Javascript Package Manager)
- Ganache CLI

#### Installing The Correct Node Version Using NVM

Dark Forest is built and tested using Node.js v14.15.x and might not run properly on other Node.js versions. We recommend using NVM to switch between multiple Node.js version on your machine.

```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
nvm install
```

After the installation is finished, you can run `node --version` to verify that you are running v14.15.x

#### Installing Yarn & Other Dev Dependencies

Refer to [Yarn's official documentation](https://classic.yarnpkg.com/en/docs/install) for the installation guide.

After you have Yarn installed, run the following commands in the root director install the remaining dev depencies:

```
yarn global add ganache-cli
yarn install
```

### Client Development Setup

All of our client related code are located in the `/client` directory.

Currently, after following the setup below, you will be able to have a locally running client that will point towards the current playtest contract on Ropsten. The production contract address is stored in `/client/src/utils/prod_contract_addr.ts`.

**Navigate to the `/client` folder and run the following commands:**

```
yarn install
yarn start:prod
```
