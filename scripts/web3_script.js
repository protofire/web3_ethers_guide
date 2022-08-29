const Web3 = require("web3");
const rpcURL = "https://cloudflare-eth.com/";
const web3 = new Web3(rpcURL);
const abi = require("./ABI.json");

// Información de la Red
const ultimoBloque = () => {
  web3.eth.getBlockNumber((_error, block) => {
    console.log("Último bloque es:", block);
  });
};

// Interacción con EOA
const _getVitalikAddress = async () => web3.eth.ens.getAddress("vitalik.eth");
const vitalikBalance = async () => {
  const addressVitalik = await _getVitalikAddress();

  web3.eth.getBalance(addressVitalik, (_err, wei) => {
    if (_err) {
      console.error("fallo", _err);
      return;
    }

    console.log(
      "La cartera de Vitalik tiene:",
      web3.utils.fromWei(wei, "ether"),
      "ethers"
    );
  });
};

// Leyendo del SmartContract
const suministroDeDai = () => {
  const contractAddress = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const contractDai = new web3.eth.Contract(abi, contractAddress);

  contractDai.methods
    .totalSupply()
    .call()
    .then((result) => {
      console.log(
        "El suministro total de DAI será:",
        web3.utils
          .toBN(result)
          .div(web3.utils.BN(10).pow(web3.utils.BN(18)))
          .toString()
      );
    })
    .catch(console.log);
};

vitalikBalance();
