import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAccount } from 'wagmi';
import { useTodoContract } from '@/hooks/useTodoContract';
import TodoApp from '@/app/todo-app/page';

// Mock wagmi hooks trực tiếp
vi.mock('wagmi', () => ({
  useAccount: vi.fn(),
  useConnect: vi.fn(),
  useDisconnect: vi.fn(),
  useSwitchChain: vi.fn(),
  useReadContract: vi.fn(),
  useWriteContract: vi.fn(),
  useWaitForTransactionReceipt: vi.fn(),
  useWatchContractEvent: vi.fn(),
}));

// Mock hook trực tiếp
vi.mock('@/hooks/useTodoContract', () => ({
  useTodoContract: vi.fn(),
}));

// Mock components
vi.mock('@/components/WalletConnection', () => ({
  default: ({ currentChainId, isCorrectNetwork }: any) => (
    <div data-testid="wallet-connection">
      Wallet Connection - Chain: {currentChainId}, Correct:{' '}
      {isCorrectNetwork.toString()}
    </div>
  ),
}));

vi.mock('@/components/AddTaskForm', () => ({
  default: ({ onAddTask, disabled }: any) => (
    <div data-testid="add-task-form">
      Add Task Form - Disabled: {disabled.toString()}
      <button onClick={() => onAddTask('Test task')}>Add Test Task</button>
    </div>
  ),
}));

// ✅ Sửa mock TaskList để render đúng
vi.mock('@/components/TaskList', () => ({
  default: ({ tasks, onToggle, isPending }: any) => (
    <div data-testid="task-list">
      Task List - Tasks: {tasks?.length || 0}, Pending: {isPending.toString()}
      {tasks?.map((task: any, index: number) => (
        <div key={index} data-testid={`task-${index}`}>
          <span>
            {task.description} - {task.completed ? 'Completed' : 'Pending'}
          </span>
          <button
            onClick={() => onToggle(index)}
            data-testid={`toggle-button-${index}`}
          >
            Toggle
          </button>
        </div>
      ))}
    </div>
  ),
}));

// Mock react-toastify
vi.mock('react-toastify', () => ({
  ToastContainer: vi.fn(() => null),
}));

describe('TodoApp', () => {
  const mockUseTodoContract = vi.mocked(useTodoContract);

  beforeEach(() => {
    vi.clearAllMocks();

    // ✅ Mock default values cho useTodoContract
    mockUseTodoContract.mockReturnValue({
      tasks: [],
      isLoading: false,
      isError: false,
      isCorrectNetwork: false,
      isPending: false,
      isConfirming: false,
      contractAddress: undefined,
      writeContract: vi.fn(),
    } as any);

    vi.mocked(useAccount).mockReturnValue({
      isConnected: false,
      chain: undefined,
    } as any);
  });

  it('renders main title and subtitle', () => {
    render(<TodoApp />);

    expect(screen.getByText('Web3 Todo List')).toBeTruthy();
    expect(screen.getByText('Powered by Wagmi & Monad Testnet')).toBeTruthy();
  });

  it('renders wallet connection component', () => {
    render(<TodoApp />);

    expect(screen.getByTestId('wallet-connection')).toBeTruthy();
  });

  describe('when not connected', () => {
    beforeEach(() => {
      vi.mocked(useAccount).mockReturnValue({
        isConnected: false,
        chain: undefined,
      } as any);
    });

    it('does not show add task form', () => {
      render(<TodoApp />);

      expect(screen.queryByTestId('add-task-form')).toBeNull();
    });

    it('does not show task list', () => {
      render(<TodoApp />);

      expect(screen.queryByTestId('task-list')).toBeNull();
    });
  });

  describe('when connected but wrong network', () => {
    beforeEach(() => {
      vi.mocked(useAccount).mockReturnValue({
        isConnected: true,
        chain: { id: 1, name: 'Ethereum' },
      } as any);

      mockUseTodoContract.mockReturnValue({
        tasks: [],
        isLoading: false,
        isError: false,
        isCorrectNetwork: false,
        isPending: false,
        isConfirming: false,
        contractAddress: undefined,
        writeContract: vi.fn(),
      } as any);
    });

    it('does not show add task form', () => {
      render(<TodoApp />);

      expect(screen.queryByTestId('add-task-form')).toBeNull();
    });

    it('does not show task list', () => {
      render(<TodoApp />);

      expect(screen.queryByTestId('task-list')).toBeNull();
    });
  });

  describe('loading states', () => {
    beforeEach(() => {
      vi.mocked(useAccount).mockReturnValue({
        isConnected: true,
        chain: { id: 80002, name: 'Polygon Amoy' },
      } as any);
    });

    it('shows loading state when tasks are loading', () => {
      mockUseTodoContract.mockReturnValue({
        tasks: [],
        isLoading: true,
        isError: false,
        isCorrectNetwork: true,
        isPending: false,
        isConfirming: false,
        contractAddress: '0x1234567890123456789012345678901234567890',
        writeContract: vi.fn(),
      } as any);

      render(<TodoApp />);

      expect(screen.getByText('Loading tasks...')).toBeTruthy();
    });

    it('shows error state when tasks fail to load', () => {
      mockUseTodoContract.mockReturnValue({
        tasks: [],
        isLoading: false,
        isError: true,
        isCorrectNetwork: true,
        isPending: false,
        isConfirming: false,
        contractAddress: '0x1234567890123456789012345678901234567890',
        writeContract: vi.fn(),
      } as any);

      render(<TodoApp />);

      expect(
        screen.getByText('Error loading tasks. Please try again.')
      ).toBeTruthy();
    });

    it('shows empty state when no tasks', () => {
      mockUseTodoContract.mockReturnValue({
        tasks: [],
        isLoading: false,
        isError: false,
        isCorrectNetwork: true,
        isPending: false,
        isConfirming: false,
        contractAddress: '0x1234567890123456789012345678901234567890',
        writeContract: vi.fn(),
      } as any);

      render(<TodoApp />);

      expect(screen.getByText('No tasks yet. Add one above!')).toBeTruthy();
    });

    it('shows task list when tasks exist', () => {
      mockUseTodoContract.mockReturnValue({
        tasks: [
          { description: 'Test task 1', completed: false },
          { description: 'Test task 2', completed: true },
        ],
        isLoading: false,
        isError: false,
        isCorrectNetwork: true,
        isPending: false,
        isConfirming: false,
        contractAddress: '0x1234567890123456789012345678901234567890',
        writeContract: vi.fn(),
      } as any);

      render(<TodoApp />);

      expect(screen.getByTestId('task-list')).toBeTruthy();
      expect(screen.getByTestId('task-0')).toBeTruthy();
      expect(screen.getByTestId('task-1')).toBeTruthy();
      expect(screen.getByText('Test task 1 - Pending')).toBeTruthy();
      expect(screen.getByText('Test task 2 - Completed')).toBeTruthy();
    });
  });
});
