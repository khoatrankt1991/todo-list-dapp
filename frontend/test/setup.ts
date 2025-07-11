import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Add this line to extend expect
declare global {
  namespace Vi {
    interface JestAssertion<T = any> extends jest.Matchers<void, T> {}
  }
}

vi.mock('@/app/globals.css', () => ({}));
vi.mock('react-toastify/dist/ReactToastify.css', () => ({}));

// Mock wagmi
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

// Mock react-toastify
vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
  ToastContainer: vi.fn(() => null),
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));

// Mock environment variables
process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_MONAD =
  '0x1111111111111111111111111111111111111111';
process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_POLYGON_AMOY =
  '0x1111111111111111111111111111111111111111';
process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_LOCAL =
  '0x1111111111111111111111111111111111111111';
process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA =
  '0x1111111111111111111111111111111111111111';
process.env.NEXT_PUBLIC_WC_PROJECT_ID = 'test_project_id';
process.env.NEXT_PUBLIC_ALCHEMY_ID = 'test_alchemy_id';

vi.mock('*.css', () => ({}));
vi.mock('*.scss', () => ({}));
vi.mock('*.sass', () => ({}));
