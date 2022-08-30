const Web3 = require("web3");
const { INFURA_KEY, PRIVATE_KEY } = require("./config");
const rpcURL = `https://goerli.infura.io/v3/${INFURA_KEY}`;
const web3 = new Web3(rpcURL);

const ERC20_ABI = require("./ABI.json");
const DAI_CONTRACT = "0xdc31ee1784292379fbb2964b3b9c4124d8f89c60";
const ACCOUNT_2 = "0x1F8D2668BAaB2B324f61fCf34730BE8e79e8eCCF";

const setupAccount = () => {
  const myAccount = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
  web3.eth.accounts.wallet.add(myAccount);
  web3.eth.defaultAccount = myAccount.address;
};

const _displayEtherscanURL = (txHash) =>
  console.log(`Follow tx in https://goerli.etherscan.io/tx/${txHash}`);

// calling non-constant method
const sendDaiTo = (toAddress, amount) => {
  const DAI_DECIMALS = 18;
  const decimals = web3.utils.toBN(DAI_DECIMALS);
  const amountBN = web3.utils.toBN(amount);
  const formattedAmount = amountBN.mul(web3.utils.toBN(10).pow(decimals));

  const contractDai = new web3.eth.Contract(ERC20_ABI, DAI_CONTRACT);

  contractDai.methods
    .transfer(toAddress, formattedAmount)
    .send({
      from: web3.eth.defaultAccount,
      gasLimit: 60000,
      gasPrice: web3.utils.toWei("1.1", "gwei"),
    })
    .on("error", console.error)
    .on("receipt", (receipt) => _displayEtherscanURL(receipt.transactionHash));
};

setupAccount();
sendDaiTo(ACCOUNT_2, 10);
// Follow tx in https://goerli.etherscan.io/tx/<txHash>
