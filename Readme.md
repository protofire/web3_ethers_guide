# Use case using web3.js y ethers.js

## <https://github.com/henrydpalacios/web3_ethers_guide>

The purpose of these scripts is to show how to build common cases of interaction with the blockchain using web3.js or ethers.js

## 📝 Requirements

- [node](https://nodejs.org/es/)
- [npm](https://docs.npmjs.com/)

## Running

### web3.js

1. run read script using **web3.js**

    ```bash
        node scripts/web3_read.js
    ```

2. run write script using **web3.js**

    > require use a private key and an Infura key on goerli network
    > set up on `.config.js`

    ```bash
        node scripts/web3_write.js
    ```

### ethers.js

1. run read script using **ethers.js**

    ```bash
        node scripts/ethers_read.js
    ```

2. run write script using **ethers.js**

    > require use a private key and an Infura key on goerli network
    > set up on `.config.js`

    ```bash
        node scripts/ethers_write.js
    ```
