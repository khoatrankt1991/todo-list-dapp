// components/WalletConnection.tsx
'use client';

import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import { polygonAmoy, monadTestnet, sepolia } from 'wagmi/chains';

interface WalletConnectionProps {
  currentChainId?: number;
  isCorrectNetwork: boolean;
}

export default function WalletConnection({
  currentChainId,
  isCorrectNetwork,
}: WalletConnectionProps) {
  const { address, isConnected, chain } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChain } = useSwitchChain();

  const formatAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const getNetworkInfo = (chainId: number) => {
    switch (chainId) {
      case monadTestnet.id:
        return { name: 'Monad Testnet', color: 'bg-purple-500' };
      case polygonAmoy.id:
        return { name: 'Polygon Amoy', color: 'bg-purple-500' };
      case sepolia.id:
        return { name: 'Sepolia', color: 'bg-purple-500' };
      case 1337:
        return { name: 'Local Hardhat', color: 'bg-gray-500' };
      default:
        return { name: 'Unsupported Network', color: 'bg-red-500' };
    }
  };

  const networkInfo = currentChainId ? getNetworkInfo(currentChainId) : null;

  const handleSwitchNetwork = (chainId: number) => switchChain({ chainId });

  return (
    <div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
      {!isConnected ? (
        <div className="text-center">
          <p className="mb-4 text-gray-600">
            Connect your wallet to get started
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {connectors.map(connector => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white hover:bg-blue-600"
              >
                {connector.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div>
              <p className="text-sm text-gray-600">Connected Account:</p>
              <p className="rounded bg-gray-100 px-3 py-1 font-mono text-sm">
                {formatAddress(address!)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Network:</p>
              <div className="flex items-center space-x-2">
                <div
                  className={`h-2 w-2 rounded-full ${networkInfo?.color || 'bg-gray-400'}`}
                />
                <p className="text-sm font-medium">
                  {networkInfo?.name || 'Unknown'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            {!isCorrectNetwork && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleSwitchNetwork(monadTestnet.id)}
                  className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
                >
                  Switch to Monad
                </button>
                <button
                  onClick={() => handleSwitchNetwork(polygonAmoy.id)}
                  className="rounded-lg bg-purple-500 px-4 py-2 text-white hover:bg-purple-600"
                >
                  Switch to Polygon
                </button>
              </div>
            )}
            <button
              onClick={() => disconnect()}
              className="rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600"
            >
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
