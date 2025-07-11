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
- **Linting**: ESLint, Prettier, Husky
- **CI/CD**: GitHub Actions, Cloudflare & Vercel deployment

## 🌐 Live Demo

- **Cloudflare**: [https://web3-todolist-dapp.pages.dev/](https://web3-todolist-dapp.pages.dev/)
- **Vercel**: [https://todo-list-dapp-neon.vercel.app/](https://todo-list-dapp-neon.vercel.app/)

## 📦 Project Structure

```
todo-list-dapp/
├── contracts/                    # Solidity smart contracts
│   └── TodoList.sol             # Main TodoList contract
├── scripts/                     # Deployment scripts
│   └── deploy.ts               # Contract deployment script
├── test/                       # Smart contract tests
│   └── TodoList.test.ts        # Contract test suite
├── frontend/                   # Next.js application
│   ├── src/
│   │   ├── app/               # Next.js 14 app router
│   │   │   ├── layout.tsx     # Root layout
│   │   │   ├── page.tsx       # Home page
│   │   │   ├── todo-app/      # Todo app pages
│   │   │   └── providers/     # Web3 providers
│   │   ├── components/        # React components
│   │   │   ├── WalletConnection.tsx
│   │   │   ├── AddTaskForm.tsx
│   │   │   ├── TaskList.tsx
│   │   │   └── TaskItem.tsx
│   │   ├── hooks/            # Custom React hooks
│   │   │   └── useTodoContract.ts
│   │   ├── constants/        # App constants
│   │   │   ├── contract.ts   # Contract ABI & addresses
│   │   │   └── networks.ts   # Network configurations
│   │   └── test/             # Frontend tests
│   │       ├── setup.ts      # Test configuration
│   │       ├── components/   # Component tests
│   │       ├── hooks/        # Hook tests
│   │       └── pages/        # Page tests
│   ├── public/               # Static assets
│   ├── vitest.config.ts      # Vitest configuration
│   ├── package.json          # Frontend dependencies
│   └── tsconfig.json         # TypeScript config
├── .github/workflows/        # CI/CD configuration
├── hardhat.config.ts         # Hardhat configuration
├── package.json              # Root dependencies
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
# Alchemy API Keys
AICHEMY_KEY=YOUR_ALCHEMY_KEY
ACCOUNT_PRIVATE_KEY=YOUR_ACCOUNT_PRIVATE_KEY
LOCALHOST_OX=YOUR_PRIVATE_KEY_LOCALHOST

# Blockchain Explorer API Keys
ETHERSCAN_API_KEY=YOUR_ETHERSCAN_API_KEY
POLYGON_SCAN_API_KEY=YOUR_POLYGON_SCAN_API_KEY
```

Create `frontend/.env.local`:

```env
# Contract Addresses (auto-configured based on network)
NEXT_PUBLIC_WC_PROJECT_ID=68902f130008379ab19f2167fcd6bbed
NEXT_PUBLIC_CONTRACT_ADDRESS=0x1e2Da01b7bb80FCF011f821D75AEFA3BF48ABf0a
NEXT_PUBLIC_CONTRACT_ADDRESS_MONAD=0xA2555F09b2aCC3EabD2feee5e2AC36b5Da066e61
NEXT_PUBLIC_CONTRACT_ADDRESS_POLYGON_AMOY=0x1e2Da01b7bb80FCF011f821D75AEFA3BF48ABf0a
NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA=0xD4144c1FB6E8d1D068D3E9897B6F233fd34F4B4F
NEXT_PUBLIC_ALCHEMY_ID={YOUR_ALCHEMY_ID}
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
npm run deploy:monadTestnet
```

## 🔧 Development

### 5. Frontend Development

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

#### Run Frontend Tests
```bash
cd frontend
npm test
```

#### Build for Production
```bash
cd frontend
npm run build
```

## 🧪 Testing

### Smart Contract Tests
```bash
npm run test
```

### Frontend Tests
```bash
cd frontend
npm test
```

### Test Coverage
```bash
cd frontend
npm run test:coverage
```

## 📝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Wagmi](https://wagmi.sh/) for Web3 React hooks
- [Viem](https://viem.sh/) for Ethereum TypeScript interface
- [Hardhat](https://hardhat.org/) for Ethereum development environment
- [Next.js](https://nextjs.org/) for React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling


## 📋 Smart Contract Deployments

| Network | Contract Address |
|---------|------------------|
| Monad Testnet | `0xA2555F09b2aCC3EabD2feee5e2AC36b5Da066e61` |
| Polygon Amoy | `0x1e2Da01b7bb80FCF011f821D75AEFA3BF48ABf0a` |
| Sepolia | `0xD4144c1FB6E8d1D068D3E9897B6F233fd34F4B4F` |

## 🚀 Deployment

### Frontend Deployment
- **Cloudflare Pages**: [https://web3-todolist-dapp.pages.dev/](https://web3-todolist-dapp.pages.dev/)
- **Vercel**: [https://todo-list-dapp-neon.vercel.app/](https://todo-list-dapp-neon.vercel.app/)

### Smart Contract Deployment
```bash
# Deploy to local network
npm run deploy:localhost

# Deploy to Polygon Amoy
npm run deploy:polygonAmoy

# Deploy to Monad Testnet
npm run deploy:monadTestnet
```
 
