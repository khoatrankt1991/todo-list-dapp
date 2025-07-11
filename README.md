# Web3 TodoList DApp

A decentralized TodoList application built with Solidity smart contracts and Next.js frontend, featuring wallet integration and real-time blockchain interactions.

## 🚀 Features

- **Smart Contract**: Solidity-based TodoList contract deployed on Ethereum-compatible networks
- **Web3 Integration**: Connect MetaMask wallet and interact with blockchain
- **Real-time Updates**: Live task updates with event listening
- **Responsive UI**: Clean, modern interface built with Tailwind CSS
- **Type Safety**: Full TypeScript implementation
- **Testing**: Comprehensive test suite for both contracts and frontend
- **CI/CD**: Automated testing and deployment with GitHub Actions

## 🛠 Tech Stack

- **Smart Contract**: Solidity, Hardhat
- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Web3**: Wagmi v2, Viem, TanStack Query
- **Testing**: Vitest, Hardhat testing framework
- **Linting**: ESLint, Prettier
- **CI/CD**: GitHub Actions, Clouflare deployment

## 📦 Project Structure

```
├── contracts/           # Solidity smart contracts
├── deploy/            # Deployment scripts
├── test/              # Smart contract tests
├── frontend/          # Next.js application
│   ├── src/
│   │   ├── app/       # Next.js 14 app router
│   │   ├── components/# React components
│   │   └── test/      # Frontend tests
├── .github/workflows/ # CI/CD configuration
└── README.md
```

## 🏃‍♂️ Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- MetaMask browser extension
- Git

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd todo-list-dapp
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend && npm install && cd ..
```

### 3. Environment Setup

Create `.env` file in the root directory:

```env
# Private key for deployment (DO NOT commit to git)
AICHEMY_KEY=YOUR_ALCHEMY_KEY
ACCOUNT_PRIVATE_KEY=YOUR_ACCOUNT_PRIVATE_KEY
LOCALHOST_OX=YOUR_PRIVATE_KEY_LOCALHOST
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
POLYGON_SCAN_API_KEY=YOUR_POLYGON_SCAN_API_KEY

# RPC URLs
MONAD_RPC_URL=https://monad-testnet.g.alchemy.com/v2/${AICHEMY_KEY}
ETHERSCAN_API_KEY=your_etherscan_api_key

# Frontend environment variables
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
```

### 4. Smart Contract Development

#### Compile Contracts
```bash
npm run compile
```

#### Run Tests
```bash
npm run test
```

#### Deploy to Local Network
```bash
# Terminal 1: Start local Hardhat node
npm run node

# Terminal 2: Deploy contracts
npm run deploy:localhost
```

#### Deploy to Monad Testnet
```bash
npm run deploy:monad
```

### 5. Frontend Development
 Inprocessing the contract address from the backend and displaying