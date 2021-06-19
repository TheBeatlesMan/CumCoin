const { ethers } = require('hardhat');

// npx hardhat run --network mainnet scripts/deploy_crowdsale.js

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ', deployer.address);
    console.log('Account balance: ', (await deployer.getBalance()).toString());
    const Crowdsale = await ethers.getContractFactory('TokenCrowdsale');
    const crowdsale = await Crowdsale.deploy(
        '250000', // Rate
        '0x4cC8310479aCd5C8b6E6693A49B028Ec97899F38', // Wallet
        '0xfD408f6F705d19A0642df5B56f5ee796f47d63D4', // Token
        '800000000000000000000' // Cap
    );
    console.log('Token deployed to: ', crowdsale.address);
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
