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
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [polygonAmoy.id]: http(),
    [monadTestnet.id]: http(),
    [hardhat.id]: http(),
    [polygon.id]: http(),
  },
  ssr: true,
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
