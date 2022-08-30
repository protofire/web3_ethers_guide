// Setup provider
const { ethers } = require("ethers");
const rpcURL = "https://cloudflare-eth.com/";
const provider = new ethers.providers.JsonRpcProvider(rpcURL);

// 2 ways of ABI entry
// const ERC20_ABI = require("./ABI.json");
const { ERC20_ABI } = require("./array_ABI.js");

// Información de la Red
const getLastBlock = async () => {
  const block = await provider.getBlock();
  console.log("Last Block: ", block);
};

// ENS under the hood
const vitalikBalance = async () => {
  const balance = await provider.getBalance("vitalik.eth");
  console.log("Vitalik has:", `${ethers.utils.formatEther(balance)} ethers`);
};

// Reading constant from SC
const getDaiTotalSupply = async () => {
  const contractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const contractDai = new ethers.Contract(contractAddress, ERC20_ABI, provider);

  const suministroTotal = await contractDai.totalSupply();

  console.log(
    "The DAI total supply will be:",
    suministroTotal.div(ethers.BigNumber.from(10).pow(18)).toString()
  );
};

// The DAI total supply will be: 6487310000256098210394586290

// getLastBlock();
// vitalikBalance();
getDaiTotalSupply();
