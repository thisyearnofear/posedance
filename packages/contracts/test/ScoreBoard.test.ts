import { ethers } from "hardhat";
import { expect } from "chai";

describe("ScoreBoard", function () {
  it("should deploy ScoreBoard", async function () {
    const ScoreBoard = await ethers.getContractFactory("ScoreBoard");
    const scoreBoard = await ScoreBoard.deploy();
    await scoreBoard.waitForDeployment();
    expect(await scoreBoard.getAddress()).to.properAddress;
  });
});