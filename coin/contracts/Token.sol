// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract Token is Initializable, ERC20Upgradeable {
    uint8 public constant _decimals = 18;
    uint256 public _total_supply;
    address public _owner;
    string public _version;

    event VersionChanged(string new_version);

    modifier ownerOnly {
        require(msg.sender == _owner, "Action not permitted");
        _;
    }

    function initialize(
        string memory name,
        string memory symbol,
        string memory version,
        uint256 total_coins
    ) public virtual initializer {
        __ERC20_init(name, symbol);
        _total_supply = total_coins * (10**_decimals);
        _owner = 0x4cC8310479aCd5C8b6E6693A49B028Ec97899F38;
        _mint(_owner, _total_supply);
        _version = version;
    }

    function updateVersionText(string memory version) public ownerOnly {
        _version = version;
        emit VersionChanged(_version);
    }

    function decimals() public view virtual override returns (uint8) {
        return _decimals;
    }
}
