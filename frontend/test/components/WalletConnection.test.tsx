import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi';
import WalletConnection from '@/components/WalletConnection';

// Mock wagmi hooks
vi.mock('wagmi', () => ({
  useAccount: vi.fn(),
  useConnect: vi.fn(),
  useDisconnect: vi.fn(),
  useSwitchChain: vi.fn(),
}));

describe('WalletConnection', () => {
  const mockConnect = vi.fn();
  const mockDisconnect = vi.fn();
  const mockSwitchChain = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useConnect).mockReturnValue({
      connect: mockConnect,
      connectors: [
        { uid: '1', name: 'MetaMask' },
        { uid: '2', name: 'Coinbase Wallet' },
      ] as any,
      status: 'idle',
      error: null,
    } as any);
    vi.mocked(useConnect).mockReturnValue({
      connect: mockConnect,
      connectors: [
        { uid: '1', name: 'MetaMask', id: '1', type: 'injected' } as any,
        { uid: '2', name: 'Coinbase Wallet' } as any,
      ],
    } as any);
    vi.mocked(useDisconnect).mockReturnValue({
      disconnect: mockDisconnect,
    } as any);
    vi.mocked(useSwitchChain).mockReturnValue({
      switchChain: mockSwitchChain,
    } as any);
  });

  describe('when not connected', () => {
    beforeEach(() => {
      vi.mocked(useAccount).mockReturnValue({
        address: undefined,
        isConnected: false,
        chain: undefined,
      } as any);
    });

    it('shows connect wallet message', () => {
      render(
        <WalletConnection currentChainId={undefined} isCorrectNetwork={false} />
      );

      expect(
        screen.getByText('Connect your wallet to get started')
      ).toBeTruthy();
    });

    it('renders connector buttons', () => {
      render(
        <WalletConnection currentChainId={undefined} isCorrectNetwork={false} />
      );

      expect(screen.getByText('MetaMask')).toBeTruthy();
      expect(screen.getByText('Coinbase Wallet')).toBeTruthy();
    });

    it('calls connect when connector button is clicked', () => {
      render(
        <WalletConnection currentChainId={undefined} isCorrectNetwork={false} />
      );

      fireEvent.click(screen.getByText('MetaMask'));

      // ✅ Simpler approach - just check that connect was called with any object
      expect(mockConnect).toHaveBeenCalledWith(
        expect.objectContaining({
          connector: expect.objectContaining({
            uid: '1',
            name: 'MetaMask',
          }),
        })
      );
    });
  });

  describe('when connected', () => {
    beforeEach(() => {
      vi.mocked(useAccount).mockReturnValue({
        address: '0x1234567890123456789012345678901234567890',
        isConnected: true,
        chain: { id: 80002, name: 'Polygon Amoy' },
      } as any);
    });

    it('shows connected account address', () => {
      render(
        <WalletConnection currentChainId={80002} isCorrectNetwork={true} />
      );

      expect(screen.getByText('0x1234...7890')).toBeTruthy();
    });

    it('shows disconnect button', () => {
      render(
        <WalletConnection currentChainId={80002} isCorrectNetwork={true} />
      );

      expect(screen.getByText('Disconnect')).toBeTruthy();
    });

    it('calls disconnect when disconnect button is clicked', () => {
      render(
        <WalletConnection currentChainId={80002} isCorrectNetwork={true} />
      );

      fireEvent.click(screen.getByText('Disconnect'));

      expect(mockDisconnect).toHaveBeenCalled();
    });

    it('shows network switch buttons when on wrong network', () => {
      render(<WalletConnection currentChainId={1} isCorrectNetwork={false} />);

      expect(screen.getByText('Switch to Monad')).toBeTruthy();
      expect(screen.getByText('Switch to Polygon')).toBeTruthy();
    });

    it('calls switchChain when network switch button is clicked', () => {
      render(<WalletConnection currentChainId={1} isCorrectNetwork={false} />);

      fireEvent.click(screen.getByText('Switch to Monad'));

      expect(mockSwitchChain).toHaveBeenCalledWith({ chainId: 10143 });
    });
  });
});
