import { monadTestnet, polygonAmoy, sepolia } from 'wagmi/chains';

export const SUPPORTED_NETWORKS = [polygonAmoy.id, monadTestnet.id, sepolia.id];

export const NETWORK_NAMES: Record<number, string> = {
  [polygonAmoy.id]: 'Polygon Amoy',
  [monadTestnet.id]: 'Monad Testnet',
  [sepolia.id]: 'Sepolia',
};
