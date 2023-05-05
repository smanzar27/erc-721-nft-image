import "@nomiclabs/hardhat-ethers";

const ALCHEMY_API_KEY = "NqUbe9Vmk7454xP23SLyAaUT_joG3-1O";
const SEPOLIA_PRIVATE_KEY = "1feb98ba72e7fe929c0f1e0fb38474b6940508d2c14c75f5f4ecb49fc867b507";


module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [SEPOLIA_PRIVATE_KEY]
    }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  etherscan: {
    apiKey: "KEHAT2STSVG3WCD34EWXCJ6IHA4T3E16GF",
  },
  mocha: {
    timeout: 40000
  }
}