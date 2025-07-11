// hooks/useTodoContract.ts
import { toast } from 'react-toastify';
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from 'wagmi';

import {
  GET_TODO_CONTRACT_ADDRESS,
  TODO_CONTRACT_ABI,
} from '../constants/contract';
import { SUPPORTED_NETWORKS, SupportedChainId } from '../constants/networks';

export const useTodoContract = (
  isConnected: boolean,
  chainId?: SupportedChainId
) => {
  const isCorrectNetwork = chainId
    ? SUPPORTED_NETWORKS.includes(chainId)
    : false;
  const contractAddress =
    isCorrectNetwork && chainId
      ? GET_TODO_CONTRACT_ADDRESS(chainId)
      : undefined;
  const {
    data: tasks,
    refetch,
    isLoading,
    isError,
  } = useReadContract({
    address: contractAddress,
    abi: TODO_CONTRACT_ABI,
    functionName: 'getAllTasks',
    query: {
      enabled: isConnected && !!contractAddress,
      refetchOnMount: true,
      refetchOnReconnect: true,
    },
  });

  const { writeContract, data: hash, isPending } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // Event listeners
  useWatchContractEvent({
    address: contractAddress,
    abi: TODO_CONTRACT_ABI,
    eventName: 'TaskAdded',
    onLogs: () => {
      toast.success('Task added successfully');
      refetch();
    },
  });

  useWatchContractEvent({
    address: contractAddress,
    abi: TODO_CONTRACT_ABI,
    eventName: 'TaskUpdated',
    onLogs: () => {
      toast.success('Task updated successfully');
      refetch();
    },
  });

  return {
    tasks: tasks?.slice().reverse(),
    isLoading,
    isError,
    refetch,
    isCorrectNetwork,
    contractAddress,
    writeContract,
    isPending,
    isConfirming,
    isConfirmed,
  };
};
