import { monadTestnet, polygonAmoy, sepolia } from 'wagmi/chains';

export const TODO_CONTRACT_ABI = [
  {
    type: 'function',
    name: 'addTask',
    inputs: [
      {
        name: 'description',
        type: 'string',
        internalType: 'string',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'toggleTask',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'getAllTasks',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'tuple[]',
        internalType: 'struct TodoList.Task[]',
        components: [
          {
            name: 'description',
            type: 'string',
            internalType: 'string',
          },
          {
            name: 'completed',
            type: 'bool',
            internalType: 'bool',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTasksCount',
    inputs: [],
    outputs: [
      {
        name: '',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    name: 'getTask',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        internalType: 'uint256',
      },
    ],
    outputs: [
      {
        name: 'description',
        type: 'string',
        internalType: 'string',
      },
      {
        name: 'completed',
        type: 'bool',
        internalType: 'bool',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'event',
    name: 'TaskAdded',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'description',
        type: 'string',
        indexed: false,
        internalType: 'string',
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'TaskUpdated',
    inputs: [
      {
        name: 'index',
        type: 'uint256',
        indexed: true,
        internalType: 'uint256',
      },
      {
        name: 'completed',
        type: 'bool',
        indexed: false,
        internalType: 'bool',
      },
    ],
    anonymous: false,
  },
] as const;

// Mapping contract address theo từng chain
export const CONTRACT_ADDRESSES: Record<number, `0x${string}`> = {
  [polygonAmoy.id]: process.env
    .NEXT_PUBLIC_CONTRACT_ADDRESS_POLYGON_AMOY as `0x${string}`,
  [monadTestnet.id]: process.env
    .NEXT_PUBLIC_CONTRACT_ADDRESS_MONAD as `0x${string}`,
  [sepolia.id]: process.env
    .NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA as `0x${string}`,
};

export const GET_TODO_CONTRACT_ADDRESS = (chainId: number): `0x${string}` => {
  const address = CONTRACT_ADDRESSES[chainId];
  if (!address) throw new Error(`No contract address for chain ID ${chainId}`);
  return address;
};
