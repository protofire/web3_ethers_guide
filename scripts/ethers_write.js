const { ethers } = require("ethers");
const { INFURA_KEY, PRIVATE_KEY } = require("./config");
const rpcURL = `https://goerli.infura.io/v3/${INFURA_KEY}`;
const provider = new ethers.providers.JsonRpcProvider(rpcURL);

const ERC20_ABI = require("./ABI.json");
const DAI_CONTRACT = "0xdc31ee1784292379fbb2964b3b9c4124d8f89c60";
const ACCOUNT_2 = "0x1F8D2668BAaB2B324f61fCf34730BE8e79e8eCCF";

const walletAccount = new ethers.Wallet(PRIVATE_KEY, provider);

const _displayEtherscanURL = (txHash) =>
  console.log(`Follow tx in https://goerli.etherscan.io/tx/${txHash}`);

// calling non-constant method
const sendDaiTo = async (toAddress, amount) => {
  const DAI_DECIMALS = 18;
  const amountBigNum = ethers.BigNumber.from(amount);
  const formattedAmount = amountBigNum.mul(
    ethers.BigNumber.from(10).pow(DAI_DECIMALS)
  );

  const contractDai = new ethers.Contract(DAI_CONTRACT, ERC20_ABI, provider);
  const contractWithSigner = contractDai.connect(walletAccount);
  const tx = await contractWithSigner.transfer(toAddress, formattedAmount);

  await tx.wait();
  _displayEtherscanURL(tx.hash);
};

sendDaiTo(ACCOUNT_2, 10);
// Follow tx in https://goerli.etherscan.io/tx/<thHas>
