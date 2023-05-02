require("dotenv").config();
const API_URL = process.env.API_URL;

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");
//console.log(JSON.stringify(contract.abi));

const contractAddress = "0xaa0f2cD2603036308bB9C64bef50DD27031ac3a8";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

//console.log(nftContract);

async function mintNFT(tokenURI : any) {

    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

    console.log(tokenURI);
    //the transaction
    const tx = { 
        from: PUBLIC_KEY,
        to: contractAddress,
        nonce: nonce,
        gas: 500000,
        data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    signPromise
    .then((signedTx : any) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err : any, hash : any) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err:any) => {
      console.log(" Promise failed:", err);
    });
}

mintNFT(
    "https://gateway.pinata.cloud/ipfs/Qmby82GBf46UcGTc3DYDb3Ch1KKgVQz5LfxkJQ4mFkN59Z"
);