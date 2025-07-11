// import { getDefaultConfig } from 'connectkit';
import { createConfig, http, injected } from 'wagmi';
import {
  hardhat,
  mainnet,
  monadTestnet,
  polygon,
  polygonAmoy,
  sepolia,
} from 'wagmi/chains';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';

export const config = createConfig({
  chains: [mainnet, hardhat, sepolia, polygon, polygonAmoy, monadTestnet],
  connectors: [
    injected(),
    coinbaseWallet({
      appName: 'Web3 TodoList DApp',
    }),
    walletConnect({
      projectId: process.env.NEXT_PUBLIC_WC_PROJECT_ID || '',
    }),
  ],
  transports: {
    [mainnet.id]: http(
      `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
    ),
    [sepolia.id]: http(
      `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
    ),
    [polygonAmoy.id]: http(
      `https://polygon-amoy.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
    ),
    [monadTestnet.id]: http(
      `https://monad-testnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
    ),
    [hardhat.id]: http(),
    [polygon.id]: http(
      `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
    ),
  },
  ssr: true,
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
