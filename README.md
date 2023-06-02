# detahard SUITE MONOREPO

![img](https://repository-images.githubusercontent.com/148657224/439f6100-765f-11e9-9bff-b725eef3c4a6)

## Packages

| package                                                               | description                                  |
| --------------------------------------------------------------------- | -------------------------------------------- |
| [@detahard/analytics](./packages/analytics)                             | generic analytics implementation             |
| [@detahard/atoms](./packages/atoms)                                     | front-end React Native components            |
| [@detahard/auth-server](./packages/auth-server)                         | NodeJS server for secure Google OAuth        |
| [@detahard/blockchain-link](./packages/blockchain-link)                 | lib for connecting to blockchains            |
| [@detahard/components](./packages/components)                           | front-end React components for web + desktop |
| [@detahard/connect](./packages/connect)                                 | 3rd party interface entrypoint for nodejs    |
| [@detahard/connect-common](./packages/connect-common)                   | static files and commons for @detahard/connect |
| [@detahard/connect-examples](./packages/connect-examples)               | example implementations of @detahard/connect   |
| [@detahard/connect-explorer](./packages/connect-explorer)               | interactive demo for @detahard/connect         |
| [@detahard/connect-iframe](./packages/connect-iframe)                   | connect-iframe build from monorepo           |
| [@detahard/connect-plugin-ethereum](./packages/connect-plugin-ethereum) | plugin for 3rd party Ethereum wallets        |
| [@detahard/connect-plugin-stellar](./packages/connect-plugin-stellar)   | plugin for 3rd party Stellar wallets         |
| [@detahard/connect-popup](./packages/connect-popup)                     | UI for 3rd party implementations             |
| [@detahard/connect-web](./packages/connect-web)                         | 3rd party interface entrypoint for browser   |
| [@detahard/device-utils](./packages/device-utils)                       | shared device utility functions              |
| [@detahard/integration-tests](./packages/integration-tests)             | cross-packages e2e tests                     |
| [@detahard/message-system](./packages/message-system)                   | message system config and sign logic         |
| [@detahard/request-manager](./packages/request-manager)                 | improved communication with Tor              |
| [@detahard/styles](./packages/styles)                                   | custom styling library for native app        |
| [@detahard/suite-analytics](./packages/suite-analytics)                 | analytics for Suite                          |
| [@detahard/suite-build](./packages/suite-build)                         | build utilities                              |
| [@detahard/suite-data](./packages/suite-data)                           | suite static data                            |
| [@detahard/suite-desktop-api](./packages/suite-desktop-api)             | API for suite - suite-desktop communication  |
| [@detahard/suite-desktop-ui](./packages/suite-desktop-ui)               | detahard Suite desktop specific UI             |
| [@detahard/suite-desktop](./packages/suite-desktop)                     | suite build target for Mac, Win, Linux       |
| [@detahard/suite-native](./suite-native/app)                            | suite build target for react-native          |
| [@detahard/suite-storage](./packages/suite-storage)                     | abstract database definition for suite       |
| [@detahard/suite-web](./packages/suite-web)                             | suite build target for web                   |
| [@detahard/suite](./packages/suite)                                     | detahard Suite common code                     |
| [@detahard/transport-native](./packages/transport-native)               | communication lib for React Native           |
| [@detahard/transport](./packages/transport)                             | communication lib for JavaScript             |
| [@detahard/urls](./packages/urls)                                       | shared urls plus health checking             |
| [@detahard/utils](./packages/utils)                                     | shared utility functions                     |
| [@detahard/utxo-lib](./packages/utxo-lib)                               | btc-like coins lib                           |

## @detahard/suite development

Before you start make sure you have downloaded and installed [NVM](https://github.com/nvm-sh/nvm), [Yarn](https://yarnpkg.com/lang/en/docs/install/) and git with [git lfs](https://git-lfs.github.com/).

-   `git clone git@github.com:detahard/detahard-suite.git`
-   `git submodule update --init --recursive`
-   `git lfs pull`
-   `nvm install`
-   `yarn`
-   `yarn build:libs && yarn workspace @detahard/message-system sign-config`

> It's recommended to enable `git config --global submodule.recurse true` so you don't need to run `git submodule update --init --recursive` every time when submodules are updated.

> To set up your dev environment for a native platform (iOS/Android) follow [these additional steps](https://github.com/detahard/detahard-suite/tree/develop/suite-native/app#prerequisites).

Run a dev build:

-   `yarn suite:dev` (web app)
-   `yarn suite:dev:desktop` (electron app)

## @detahard/connect development

detahard Connect is a platform for easy integration of detahard hardware wallets into 3rd party applications.
Historically, detahard Connect had its [own repository](https://github.com/detahard/connect). This repository is still active and accepts hotfixes for detahard-connect version 8.

@detahard/connect version 9 is developed in this repository only. For documentation proceed to this [page](./docs/packages/connect/index.md)

## Contribute

Inspired by [GitLab Contributing Guide](https://docs.gitlab.com/ee/development/contributing/)

Using [Conventional Commits](COMMITS.md) is strongly recommended and might be enforced in future.

## Security vulnerability disclosure

Please report suspected security vulnerabilities in private to [security@satoshilabs.com](mailto:security@satoshilabs.com), also see [the disclosure section on the detahard.io website](https://detahard.io/support/a/how-to-report-a-security-issue). Please do NOT create publicly viewable issues for suspected security vulnerabilities.

## IDE specific settings

Find specific settings for Integrated Development Environments (IDE) in [IDE.md](./IDE.md)
