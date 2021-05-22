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

To connecting to the mainnet client, simply run `yarn start:prod`. When asked you can use your whitelist key or import your mainnet burner secret and home coordinates.
