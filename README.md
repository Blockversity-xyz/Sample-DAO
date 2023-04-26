<a href="https://www.blockversity.xyz/" target="_blank">
    <img src="https://www.blockversity.xyz/img/logo-1-1@1x.png" alt="Sample logo" title="Sample" align="right" height="40" />
</a>

# Sample-DAO

[Sample](https://www.blockversity.xyz/) is THE platform agnostic community for online educators supported by a DAO. Sample's objective is to serve online educators with NFTs as a service,  giving power back to Course Creators and verifiable on-chain credentials to students.

Sample gives power back to thousands of global course creators selling on centralized marketplaces, offering them fairer compensation by providing tools to sell courses as NFTs on their websiste, social networks or even by email. For students, Sample provides them with verifiable on-chain credentials. These proof-of-skill NFTs would have the same credibility globally.

[![Sample Website](https://i.postimg.cc/Pfw7z1g4/Screenshot-2022-12-14-at-11-40-21-AM.png)](https://www.blockversity.xyz/)

## Overview

 Congratulations! This is the first step in your journey towards learning how to build a DAO on the Flow network. This document's objective is to provide the basic tools and help you understand how to use them. You can read the full guide [here](https://medium.com/blockversity/build-a-dao-on-flow-21569387fc3a) 

 All of the code that interacts with Flow is written with Cadence; a new high-level programming language intended for smart contract development.

 The tools used for testing the smart contracts, scripts and transactions are written in Go and are part of the [Overflow](https://github.com/bjartek/overflow) library.

## Table of content

- [Getting Started](#installation)
    - [Install Dependencies](#install-dependencies)
    - [Clone the Repo](#clone-the-repo)
    - [Prerequisites](#prerequisites)
- [Cadence](#cadence)
    - [Smart Contract](#smart-contracts)
    - [Transactions](#transactions)
    - [Scripts](#scripts)
- [Testing](#testing)
    - [Overflow](#overflow)
- [License](#license)
- [Links](#links)

## Getting Started

To get a local copy up and running, please follow these simple steps.

### 1. Install Dependencies

- `NodeJS v16.x` or above. See: [Node installation instructions](https://nodejs.org/en/) <br/>
- `flow-cli` [Flow CLI installation instructions](https://docs.onflow.org/flow-cli) <br/>

### 2. Clone the project

```sh
git clone --depth=1 https://github.com/Blockversity-xyz/Sample-DAO.git
   ```

### Prerequisites

Here is what you need to be able to run the project.

- Node.js
- NPM _(recommended)_
- Flow CLI
- Go

## Testing

### Overflow
The testing framework for the Flow Cadence contract uses [Overflow](https://github.com/bjartek/overflow)

To test the contracts go to the Cadence folder `cd Cadence` and run the below command

```
go run ./tasks/main.go
```

