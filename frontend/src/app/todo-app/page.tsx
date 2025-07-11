// app/TodoApp.tsx
'use client';

import { useAccount } from 'wagmi';
import { TODO_CONTRACT_ABI } from '@/constants/contract';
import { useTodoContract } from '@/hooks/useTodoContract';
import WalletConnection from '@/components/WalletConnection';
import AddTaskForm from '@/components/AddTaskForm';
import TaskList from '@/components/TaskList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TodoApp() {
  const { isConnected, chain } = useAccount();

  const {
    tasks,
    isError,
    isLoading,
    isCorrectNetwork,
    contractAddress,
    writeContract,
    isPending,
    isConfirming,
    isConfirmed,
    refetch,
  } = useTodoContract(isConnected, chain?.id);

  const addTask = (desc: string) => {
    writeContract({
      address: contractAddress!,
      abi: TODO_CONTRACT_ABI,
      functionName: 'addTask',
      args: [desc],
    });
  };

  const toggleTask = (index: number) => {
    writeContract({
      address: contractAddress!,
      abi: TODO_CONTRACT_ABI,
      functionName: 'toggleTask',
      args: [BigInt(index)],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-center text-4xl font-bold text-gray-800">
          Web3 Todo List
          <span className="mt-2 block text-sm font-normal text-blue-600">
            Powered by Wagmi & Monad Testnet
          </span>
        </h1>

        <WalletConnection
          currentChainId={chain?.id}
          isCorrectNetwork={isCorrectNetwork}
        />

        {isConnected && isCorrectNetwork && (
          <>
            <div className="mb-6 rounded-xl bg-white p-6 shadow-lg">
              <AddTaskForm
                onAddTask={addTask}
                disabled={isPending || isConfirming}
              />
            </div>

            <div className="rounded-xl bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Your Tasks {tasks && `(${tasks.length})`}
              </h2>
              {isLoading ? (
                <div className="py-8 text-center">
                  <div className="mx-auto h-8 w-8 animate-spin rounded-full border-b-2 border-blue-500"></div>
                  <p className="mt-2 text-gray-500">Loading tasks...</p>
                </div>
              ) : isError ? (
                <div className="py-8 text-center">
                  <p className="text-red-500">
                    Error loading tasks. Please try again.
                  </p>
                </div>
              ) : !tasks || tasks.length === 0 ? (
                <div className="py-8 text-center">
                  <p className="text-gray-500">No tasks yet. Add one above!</p>
                </div>
              ) : (
                <TaskList
                  tasks={tasks as any}
                  onToggle={toggleTask}
                  isPending={isPending || isConfirming}
                />
              )}
            </div>
          </>
        )}

        {(isPending || isConfirming) && (
          <div className="fixed right-4 bottom-4 rounded-lg bg-blue-500 p-4 text-white shadow-lg">
            <div className="flex items-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>
                {isPending
                  ? 'Confirming transaction...'
                  : 'Waiting for confirmation...'}
              </span>
            </div>
          </div>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
