import { ethers, run } from "hardhat";
import fs from "fs";
import path from "path";

async function main() {
  const deploymentsDir = path.resolve(__dirname, "..", "deployments");
  const outFile = path.join(deploymentsDir, "mumbai.json");
  if (!fs.existsSync(deploymentsDir)) {
    fs.mkdirSync(deploymentsDir);
  }

  const ScoreBoard = await ethers.getContractFactory("ScoreBoard");
  const scoreBoard = await ScoreBoard.deploy();
  await scoreBoard.waitForDeployment();

  const Tips = await ethers.getContractFactory("Tips");
  const tips = await Tips.deploy();
  await tips.waitForDeployment();

  const Reactions = await ethers.getContractFactory("Reactions");
  const reactions = await Reactions.deploy();
  await reactions.waitForDeployment();

  const deployment = {
    ScoreBoard: {
      address: await scoreBoard.getAddress(),
      abi: JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "..", "dist", "contracts", "ScoreBoard.sol", "ScoreBoard.json"),
          "utf8"
        )
      ).abi
    },
    Tips: {
      address: await tips.getAddress(),
      abi: JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "..", "dist", "contracts", "Tips.sol", "Tips.json"),
          "utf8"
        )
      ).abi
    },
    Reactions: {
      address: await reactions.getAddress(),
      abi: JSON.parse(
        fs.readFileSync(
          path.join(__dirname, "..", "dist", "contracts", "Reactions.sol", "Reactions.json"),
          "utf8"
        )
      ).abi
    }
  };

  fs.writeFileSync(outFile, JSON.stringify(deployment, null, 2));
  console.log("Contracts deployed and info written to", outFile);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});