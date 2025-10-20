const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

  // Deploy PushToken contract
  const PushToken = await hre.ethers.getContractFactory("PushToken");
  const pushToken = await PushToken.deploy(1000000); // 1M initial supply

  await pushToken.waitForDeployment();
  const contractAddress = await pushToken.getAddress();

  console.log("PushToken deployed to:", contractAddress);
  console.log("Transaction hash:", pushToken.deploymentTransaction().hash);
  
  // Verify contract on explorer (if supported)
  console.log("Contract deployed successfully!");
  console.log("Explorer URL:", `https://testnet-explorer.push0.org/address/${contractAddress}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });