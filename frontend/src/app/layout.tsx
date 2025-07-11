import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Web3Provider } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web3 TodoList DApp',
  description:
    'A decentralized TodoList application built with Next.js, Wagmi, and Monad',
  keywords: ['Web3', 'DApp', 'TodoList', 'Blockchain', 'Monad', 'Wagmi'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
