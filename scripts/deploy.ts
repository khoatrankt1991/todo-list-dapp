import fs from "fs";
import { ethers } from "hardhat";
import path from "path";

async function main() {
  console.log("Deploying TodoList contract...");

  // Get the contract factory
  const TodoList = await ethers.getContractFactory("TodoList");

  // Deploy the contract
  const todoList = await TodoList.deploy();
  await todoList.waitForDeployment();

  const contractAddress = await todoList.getAddress();
  console.log("TodoList deployed to:", contractAddress);

  // Save contract address and ABI to a JSON file
  const contractInfo = {
    address: contractAddress,
    abi: TodoList.interface.formatJson()
  };

  const contractsDir = path.join(__dirname, "../contracts-info");
  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  fs.writeFileSync(
    path.join(contractsDir, "TodoList.json"),
    JSON.stringify(contractInfo, null, 2)
  );

  console.log("Contract info saved to contracts-info/TodoList.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });