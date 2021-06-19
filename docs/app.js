// Smooth scroll navbar
const navbar_items = document.getElementsByClassName('navbar_item');
const navbarScrollTo = function () {
    const scroll_to = this.getAttribute('id').substring(1);
    if (scroll_to !== 'main') {
        const element = document.getElementById(scroll_to);
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
        window.scroll({ top: 0, left: 0, behavior: 'smooth' });
    }
};
for (item of navbar_items) {
    console.log(item);
    item.addEventListener('click', navbarScrollTo);
}

// Mobile mode dropdown
const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar_menu');
menu.addEventListener('click', function () {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});

// Scroll top button
button = document.getElementById('scroll_top');
window.onscroll = function () {
    if (
        document.body.scrollTop > 20 ||
        document.documentElement.scrollTop > 20
    ) {
        button.style.display = 'block';
    } else {
        button.style.display = 'none';
    }
};

// Funny
document.getElementById('github_button').oncontextmenu = function () {
    document.getElementById('navbar_img').src = 'a.png';
    document.title = 'sus?';
};

// ParticlesJS
try {
    particlesJS.load('particles-js', 'assets/particles.json', function () {
        console.log('callback - particles.js config loaded');
    });
} catch (error) {
    console.log(error);
}

// Metamask
if (typeof window.ethereum !== 'undefined') {
    console.log('MetaMask is installed');
}
const ethereumButton = document.querySelector('.enableEthereumButton');
const addButton = document.querySelector('.addCoin');
const coinButton = document.querySelector('.getCoinButton');
const showAccount = document.querySelector('.showAccount');
const coinAmount = document.getElementById('getCoin');
const balanceButton = document.querySelector('.updateBalanceButton');
const balanceLabel = document.querySelector('.crowdsaleBalance');
const withdrawButton = document.querySelector('.withdrawButton');
const raisedAmount = document.querySelector('.etherRaised');
const agreeButton = document.querySelector('.agreeButton');
const youGet = document.querySelector('.youGet');
let connected = false;
ethereumButton.disabled = true;
coinButton.disabled = true;
balanceButton.disabled = true;
withdrawButton.disabled = true;
addButton.disabled = true;
youGet.innerHTML = 0;
agreeButton.addEventListener('click', async function () {
    ethereumButton.disabled = false;
});
ethereumButton.addEventListener('click', async function () {
    ethereumButton.disabled = true;
    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    showAccount.innerHTML = account;
    ethereumButton.disabled = false;
    coinButton.disabled = false;
    balanceButton.disabled = false;
    addButton.disabled = false;
    connected = true;
    setDisabledWithdraw();
});
ethereum.on('accountsChanged', function (accounts) {
    showAccount.innerHTML = accounts[0];
});
addButton.addEventListener('click', async function () {
    const tx = await ethereum.request({
        method: 'wallet_watchAsset',
        params: {
            type: 'ERC20',
            options: {
                address: '0xfD408f6F705d19A0642df5B56f5ee796f47d63D4',
                symbol: 'CUM',
                decimals: 18,
                // image: 'https://url.com'
            },
        },
    });
});
const abi = [
    {
        inputs: [
            {
                internalType: 'uint256',
                name: 'rate',
                type: 'uint256',
            },
            {
                internalType: 'address payable',
                name: 'wallet',
                type: 'address',
            },
            {
                internalType: 'contract IERC20',
                name: 'token',
                type: 'address',
            },
            {
                internalType: 'uint256',
                name: 'cap',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [],
        name: 'CrowdsaleFinalized',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: 'address',
                name: 'purchaser',
                type: 'address',
            },
            {
                indexed: true,
                internalType: 'address',
                name: 'beneficiary',
                type: 'address',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'value',
                type: 'uint256',
            },
            {
                indexed: false,
                internalType: 'uint256',
                name: 'amount',
                type: 'uint256',
            },
        ],
        name: 'TokensPurchased',
        type: 'event',
    },
    {
        payable: true,
        stateMutability: 'payable',
        type: 'fallback',
    },
    {
        constant: true,
        inputs: [],
        name: '_finalized',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: '_owner',
        outputs: [
            {
                internalType: 'address',
                name: '',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [
            {
                internalType: 'address',
                name: 'account',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                internalType: 'address',
                name: 'beneficiary',
                type: 'address',
            },
        ],
        name: 'buyTokens',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'cap',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'capReached',
        outputs: [
            {
                internalType: 'bool',
                name: '',
                type: 'bool',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [],
        name: 'finalize',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'rate',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'token',
        outputs: [
            {
                internalType: 'contract IERC20',
                name: '',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'wallet',
        outputs: [
            {
                internalType: 'address payable',
                name: '',
                type: 'address',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: true,
        inputs: [],
        name: 'weiRaised',
        outputs: [
            {
                internalType: 'uint256',
                name: '',
                type: 'uint256',
            },
        ],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            {
                internalType: 'address',
                name: 'beneficiary',
                type: 'address',
            },
        ],
        name: 'withdrawTokens',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
];

const address = '0x909ff1B6B79FeB3E21c732e32Aebf880FE794f42';
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const _Contract = new ethers.Contract(address, abi, signer);
coinButton.addEventListener('click', async function () {
    const amount = coinAmount.value.toString();
    const wei = ethers.utils.parseUnits(amount.toString(), 'ether');
    const tx = await _Contract.buyTokens(ethereum.selectedAddress, {
        value: wei,
    });
});
balanceButton.addEventListener('click', async function () {
    const tx = await _Contract.balanceOf(ethereum.selectedAddress);
    const balance = ethers.BigNumber.from(tx);
    const display = balance.div(ethers.BigNumber.from('10').pow(18));
    balanceLabel.innerHTML = display.toString();
});
withdrawButton.addEventListener('click', async function () {
    const tx = await _Contract.withdrawTokens(ethereum.selectedAddress);
});
coinAmount.addEventListener('input', function () {
    if (!coinAmount.value) {
        youGet.innerHTML = 0;
        return;
    }
    const inputNumber = coinAmount.value;
    const actualGet = inputNumber * 250000;
    youGet.innerHTML = actualGet.toString();
});
async function setDisabledWithdraw() {
    const tx = await _Contract._finalized();
    if (tx && connected) withdrawButton.disabled = false;
    console.log(tx);
}
async function getWeiRaised() {
    const tx = await _Contract.weiRaised();
    const wei = ethers.BigNumber.from(tx);
    const raise = wei.div(ethers.BigNumber.from('10').pow(18));
    console.log(raise.toString());
    raisedAmount.innerHTML = raise.toString();
}
getWeiRaised();
