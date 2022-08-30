// Setup provider
const Web3 = require("web3");
const rpcURL = "https://cloudflare-eth.com/";
const web3 = new Web3(rpcURL);

// ABI only via json object
const ERC20_ABI = require("./ABI.json");

// Get network info
const getLastBlock = () => {
  web3.eth.getBlockNumber((_error, block) => {
    console.log("Last Block:", block);
  });
};

// There is no native support for ENS
const _getVitalikAddress = async () => web3.eth.ens.getAddress("vitalik.eth");

const vitalikBalance = async () => {
  const addressVitalik = await _getVitalikAddress();

  web3.eth.getBalance(addressVitalik, (_err, wei) => {
    if (_err) {
      console.error("Fail", _err);
      return;
    }

    console.log("Vitalik has:", web3.utils.fromWei(wei, "ether"), "ethers");
  });
};

vitalikBalance();
// Vitalik has: 1185.222968679011216534 ethers

// Reading constant from SC
const getDaiTotalSupply = () => {
  const contractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const contractDai = new web3.eth.Contract(ERC20_ABI, contractAddress);

  contractDai.methods
    .totalSupply()
    .call()
    .then((result) => {
      console.log(
        "The DAI total supply will be:",
        web3.utils
          .toBN(result)
          .div(web3.utils.BN(10).pow(web3.utils.BN(18)))
          .toString()
      );
    })
    .catch(console.log);
};

// getDaiTotalSupply()
// The DAI total supply will be: 6487310000256098210394586290

getLastBlock();
vitalikBalance();
getDaiTotalSupply();
