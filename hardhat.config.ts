import "@nomiclabs/hardhat-ethers";

module.exports = {
  defaultNetwork: "sepolia",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/NqUbe9Vmk7454xP23SLyAaUT_joG3-1O",
      accounts: ["31757fda30bf5a32ab5634f7d94da504b2efcbf725eb64d16dcda60ac5fe378e"]
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
  mocha: {
    timeout: 40000
  }
}