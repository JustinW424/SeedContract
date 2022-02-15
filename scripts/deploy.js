async function main() {
    const team_address = "0x24be59F617ff5B93528F1471b80c1592eFfdF423";
    const marketing_address = "0x6B630A52F5Ec882A78B504065AED16a8C704c609";
    const reward_address = "0xbED6f3b2e6557Fe370Cb7aEB0C116b695BFf1925";

    const seedFT = await ethers.getContractFactory("Clover_Seeds_Token");
    const seedNFT = await ethers.getContractFactory("Clover_Seeds_NFT");
    const seedController = await ethers.getContractFactory("Clover_Seeds_Controller");
    const seedPicker = await ethers.getContractFactory("Clover_Seeds_Picker");
    const seedStake = await ethers.getContractFactory("Clover_Seeds_Stake");

    const seedFTContract = await seedFT.deploy(team_address, marketing_address);
    console.log("Clover_Seeds_Token deployed to:", seedFTContract.address);
    
    const seedNFTContract = await seedNFT.deploy(seedFTContract.address);
    console.log("Clover_Seeds_NFT deployed to:", seedNFTContract.address);

    const seedControllerContract = await seedController.deploy(seedFTContract.address, seedNFTContract.address, team_address, reward_address) ;
    console.log("Clover_Seeds_Controller deployed to:", seedControllerContract.address);

    const seedPickerContract = await seedPicker.deploy(seedNFTContract.address, seedControllerContract.address) ;
    console.log("Clover_Seeds_Picker deployed to:", seedPickerContract.address);

    const seedStakeContract = await seedStake.deploy(team_address, seedFTContract.address, seedNFTContract.address, seedControllerContract.address, seedPickerContract.address);
    console.log("Clover_Seeds_Stake deployed to:", seedStakeContract.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });