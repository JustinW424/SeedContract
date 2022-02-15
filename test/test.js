const { expect } = require("chai");

let team_address = "0x24be59F617ff5B93528F1471b80c1592eFfdF423";
let marketing_address = "0x6B630A52F5Ec882A78B504065AED16a8C704c609";
let reward_address = "0xbED6f3b2e6557Fe370Cb7aEB0C116b695BFf1925";

describe("My Test!", function() {
  it("Mint function test", async function() {
    const [owner] = await ethers.getSigners();
    team_address = owner.address;
    reward_address = owner.address;
    team_address = owner.address;
    const seedFT = await ethers.getContractFactory("Clover_Seeds_Token");
    const seedNFT = await ethers.getContractFactory("Clover_Seeds_NFT");
    const seedController = await ethers.getContractFactory("Clover_Seeds_Controller");
    const  seedPicker= await ethers.getContractFactory("Clover_Seeds_Picker");
    const  seedStake= await ethers.getContractFactory("Clover_Seeds_Stake");

    const seedFTContract = await seedFT.deploy(team_address, marketing_address);
    console.log("Clover_Seeds_Token deployed to:", seedFTContract.address);
    await seedFTContract.deployed();

    const seedNFTContract = await seedNFT.deploy(seedFTContract.address);
    console.log("Clover_Seeds_NFT deployed to:", seedNFTContract.address);
    await seedNFTContract.deployed();

    const seedControllerContract = await seedController.deploy(seedFTContract.address, seedNFTContract.address, team_address, reward_address) ;
    console.log("Clover_Seeds_Controller deployed to:", seedControllerContract.address);
    await seedControllerContract.deployed();

    const seedPickerContract = await seedPicker.deploy(seedNFTContract.address, seedControllerContract.address) ;
    console.log("Clover_Seeds_Picker deployed to:", seedPickerContract.address);
    await seedPickerContract.deployed();

    const seedStakeContract = await seedStake.deploy(team_address, seedFTContract.address, seedNFTContract.address, seedControllerContract.address, seedPickerContract.address);
    console.log("Clover_Seeds_Stake deployed to:", seedStakeContract.address);
    await seedStakeContract.deployed();

    await seedFTContract.AddController(seedNFTContract.address);
    await seedFTContract.AddController(seedControllerContract.address);
    await seedFTContract.enabledTrading();

    await seedNFTContract.addMinter(seedControllerContract.address);
    await seedNFTContract.setClover_Seeds_Picker(seedPickerContract.address);
    await seedNFTContract.setController(seedControllerContract.address);

    await seedControllerContract.setClover_Seeds_Picker(seedPickerContract.address);
    await seedControllerContract.setClover_Seeds_Stake(seedStakeContract.address);
    await seedControllerContract.ActiveThisContract();
    const ddd = await seedFTContract.balanceOf(owner.address);
    console.log("seed:", ddd);
    await seedControllerContract.buyCloverField1();
  });
});