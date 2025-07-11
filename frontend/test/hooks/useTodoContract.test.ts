import { useTodoContract } from '@/hooks/useTodoContract';
import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWatchContractEvent,
  useWriteContract,
} from 'wagmi';

// Mock wagmi hooks
vi.mock('wagmi', () => ({
  useReadContract: vi.fn(),
  useWriteContract: vi.fn(),
  useWaitForTransactionReceipt: vi.fn(),
  useWatchContractEvent: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('useTodoContract', () => {
  const mockRefetch = vi.fn();
  const mockWriteContract = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useReadContract).mockReturnValue({
      data: [],
      refetch: mockRefetch,
      isLoading: false,
      isError: false,
    } as any);
    vi.mocked(useWriteContract).mockReturnValue({
      writeContract: mockWriteContract,
      data: undefined,
      isPending: false,
    } as any);
    vi.mocked(useWaitForTransactionReceipt).mockReturnValue({
      isLoading: false,
      isSuccess: false,
    } as any);
    vi.mocked(useWatchContractEvent).mockReturnValue(undefined);
  });

  it('returns correct network status for supported network', () => {
    const { result } = renderHook(() => useTodoContract(true, 80002));

    expect(result.current.isCorrectNetwork).toBe(true);
    expect(result.current.contractAddress).toBeDefined();
  });

  it('returns correct network status for unsupported network', () => {
    const { result } = renderHook(() => useTodoContract(true, 1));

    expect(result.current.isCorrectNetwork).toBe(false);
    expect(result.current.contractAddress).toBeUndefined();
  });

  it('returns tasks in reverse order', () => {
    const mockTasks = [
      { description: 'Task 1', completed: false },
      { description: 'Task 2', completed: true },
    ];

    vi.mocked(useReadContract).mockReturnValue({
      data: mockTasks,
      refetch: mockRefetch,
      isLoading: false,
      isError: false,
    } as any);

    const { result } = renderHook(() => useTodoContract(true, 80002));

    expect(result.current.tasks).toEqual([
      { index: 0, description: 'Task 1', completed: false },
      { index: 1, description: 'Task 2', completed: true },
    ]);
  });

  it('returns loading state', () => {
    vi.mocked(useReadContract).mockReturnValue({
      data: [],
      refetch: mockRefetch,
      isLoading: true,
      isError: false,
    } as any);

    const { result } = renderHook(() => useTodoContract(true, 80002));

    expect(result.current.isLoading).toBe(true);
  });

  it('returns error state', () => {
    vi.mocked(useReadContract).mockReturnValue({
      data: [],
      refetch: mockRefetch,
      isLoading: false,
      isError: true,
    } as any);

    const { result } = renderHook(() => useTodoContract(true, 80002));

    expect(result.current.isError).toBe(true);
  });

  it('returns transaction states', () => {
    vi.mocked(useWriteContract).mockReturnValue({
      writeContract: mockWriteContract,
      data: '0x123',
      isPending: true,
    } as any);

    vi.mocked(useWaitForTransactionReceipt).mockReturnValue({
      isLoading: true,
      isSuccess: false,
    } as any);

    const { result } = renderHook(() => useTodoContract(true, 80002));

    expect(result.current.isPending).toBe(true);
    expect(result.current.isConfirming).toBe(true);
  });
});
