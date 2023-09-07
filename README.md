# DAO History Tools

DAO History tools are a collection of tools designed to retrieve contract data associated with DAOs (Decentralized Autonomous Organizations) from the Antelope blockchain. These tools are built upon the components of the history tools starter kit, which utilize MongoDB and EOSjs. The entire operational logic of the history tools is implemented through dependencies, meaning this repository solely contains scripts that execute individual processes and processors necessary for data processing from the designated "featured" contracts.

The contract components are implemented through the `@alien-worlds/aw-contract-<contract_name>` packages. These components, such as repositories, entities, and mappers, are exclusively used in processors. All pertinent contracts, along with their actions and deltas, are encompassed within the `dao.featured.json` file. If you wish to modify or add a contract, action, or delta, you must include it in this JSON file and create or adjust an existing processor in the `processor/processors` directory. Additionally, you should consider potential modifications to the `index.ts` file to ensure that all available processors are included.

## Dependencies

This package is dependent on the following packages:

- [@alien-worlds/aw-history-starter-kit](https://github.com/Alien-Worlds/aw-history-starter-kit)
- [@alien-worlds/aw-contract-dao-worlds](https://github.com/Alien-Worlds/aw-contract-dao-worlds)
- [@alien-worlds/aw-contract-index-worlds](https://github.com/Alien-Worlds/aw-contract-index-worlds)
- [@alien-worlds/aw-contract-stkvt-worlds](https://github.com/Alien-Worlds/aw-contract-stkvt-worlds)
- [@alien-worlds/aw-contract-token-worlds](https://github.com/Alien-Worlds/aw-contract-token-worlds)
- [@alien-worlds/aw-contract-ref-worlds](https://github.com/Alien-Worlds/aw-contract-ref-worlds)
- [@alien-worlds/aw-contract-prop-worlds](https://github.com/Alien-Worlds/aw-contract-prop-worlds)
- [@alien-worlds/aw-contract-escrw-worlds](https://github.com/Alien-Worlds/aw-contract-escrw-worlds)

## Table of Contents

- [Installation](#installation)
- [Startup](#startup)
- [Tutorials](#tutorials)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone this repository:

   ```shell
   git clone https://github.com/Alien-Worlds/aw-history-dao.git
   ```

2. Install the dependencies:

   ```shell
   yarn
   ```

3. Configure the DAO History Tools by setting up environment variables or editing the configuration files as needed. The list of required variables can be found in the `./empty.env` file and their descriptions [here](https://github.com/Alien-Worlds/aw-history-starter-kit/blob/main/tutorials/config-vars.md)

## Startup

To run the tools, you must first select the mode: `default` (to download current data) or `replay` (to download a specific range of blocks). If you choose replay, set the start and end block as well. Having all the configuration, create a separate session for each of the processes and start them. The order doesn't matter but the starting point is `broadcast` followed by `boot`.

```shell
# first session
yarn broadcast

# second session
yarn boot

# third session
yarn reader

# fourth session
yarn filter

# fifth session
yarn processor
```

## Tutorials

A tutorial on how to create a new processor can be found in the tutorials available in the **History Tools Starter Kit**.

- [Using History Tools Starter Kit](https://github.com/Alien-Worlds/aw-history-starter-kit/blob/main/tutorials/using-history-tools-starter-kit.md)

## Contributing

We welcome contributions from the community. Before contributing, please read through the existing issues on this repository to prevent duplicate submissions. New feature requests and bug reports can be submitted as an issue. If you would like to contribute code, please open a pull request.

## License

This project is licensed under the terms of the MIT license. For more information, refer to the [LICENSE](./LICENSE) file.
