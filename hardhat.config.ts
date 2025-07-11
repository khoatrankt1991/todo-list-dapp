import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
dotenv.config();

// Environment variables
const AICHEMY_KEY = process.env.AICHEMY_KEY || ''
const ACCOUNT_PRIVATE_KEY = process.env.ACCOUNT_PRIVATE_KEY || ''
const LOCALHOST_OX = process.env.LOCALHOST_OX || ''
// Scan API keys to verify contracts on other networks
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ''
const POLYGON_SCAN_API_KEY = process.env.POLYGON_SCAN_API_KEY || ''
// MONAD don't need to have api key to verify contracts on MONAD network (use sourcify to verify)

const config: HardhatUserConfig = {
  networks: {
    ganacheLocalhost: {
      url: `http://127.0.0.1:8545`,
      accounts: [LOCALHOST_OX]
    },
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${AICHEMY_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    mainnet: {
      url: `https://eth-mainnet.g.alchemy.com/v2/${AICHEMY_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    polygonAmoy: {
      url: `https://polygon-amoy.g.alchemy.com/v2/${AICHEMY_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    polygon: {
      url: `https://polygon-mainnet.g.alchemy.com/v2/${AICHEMY_KEY}`,
      accounts: [ACCOUNT_PRIVATE_KEY],
    },
    monadTestnet: {
      url: `https://monad-testnet.g.alchemy.com/v2/${AICHEMY_KEY}`,
      chainId: 10143,
    }
  },
  etherscan: {
    apiKey: {
      sepolia: ETHERSCAN_API_KEY,
      mainnet: ETHERSCAN_API_KEY,
      polygonAmoy: POLYGON_SCAN_API_KEY,
      polygon: POLYGON_SCAN_API_KEY,
    },
    customChains: [
      {
        network: "mainnet",
        chainId: 1,
        urls: {
          apiURL: "https://etherscan.io/api",
          browserURL: "https://etherscan.io/",
        },
      },
      {
        network: "sepolia",
        chainId: 11155111,
        urls: {
          apiURL: "https://api-sepolia.etherscan.io/api",
          browserURL: "https://sepolia.etherscan.io/",
        },
      },
      {
        network: "polygonAmoy",
        chainId: 80002,
        urls: {
          apiURL: "https://api-amoy.polygonscan.com/api",
          browserURL: "https://docs.polygonscan.com/v/amoy-polygonscan",
        },
      },
      {
        network: "polygon",
        chainId: 137,
        urls: {
          apiURL: "https://api.polygonscan.com/api",
          browserURL: "https://docs.polygonscan.com",
        },
      }
    ],
  },
  solidity: "0.8.28",
  
};

export default config;
