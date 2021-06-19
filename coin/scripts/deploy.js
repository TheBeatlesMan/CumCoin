const { ethers, upgrades } = require('hardhat');

// npx hardhat run --network mainnet scripts/deploy.js

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log('Deploying contracts with the account: ', deployer.address);
    console.log('Account balance: ', (await deployer.getBalance()).toString());
    const Token = await ethers.getContractFactory('Token');
    const token = await upgrades.deployProxy(Token, [
        'CumCoin',
        'CUM',
        '1.0.0',
        '690420000',
    ]);
    await token.deployed();
    console.log('Token deployed to: ', token.address);
}

main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });
