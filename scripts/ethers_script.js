// Setup del provider
const { ethers } = require("ethers");
const rpcURL = "https://cloudflare-eth.com/";
const provider = new ethers.providers.JsonRpcProvider(rpcURL);

const ERC20_ABI = require("./ABI.json");

// Información de la Red
const getLastBlock = async () => {
  const block = await provider.getBlock();
  console.log("Last Block: ", block);
};

// Interacción con EOA
const vitalikBalance = async () => {
  const balance = await provider.getBalance("vitalik.eth");
  console.log("Vitalik has:", `${ethers.utils.formatEther(balance)} ethers`);
};

// Leyendo del SmartContract
const getDaiTotalSupply = async () => {
  const contractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const contractDai = new ethers.Contract(contractAddress, ERC20_ABI, provider);

  const suministroTotal = await contractDai.totalSupply();

  console.log(
    "The DAI total supply will be:",
    suministroTotal.div(ethers.BigNumber.from(10).pow(18)).toString()
  );
};

// const _ABI = [
//   "function symbol() view returns (string)",
//   "function totalSupply() view returns (uint256)",
//   "function balanceOf(address) view returns (uint)",
// ];

getLastBlock();
vitalikBalance();
getDaiTotalSupply();
