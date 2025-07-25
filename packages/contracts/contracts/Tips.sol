// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Tips {
    event Tip(address indexed from, address indexed to, uint256 amount);

    function tip(address payable to) external payable {
        require(msg.value > 0, "No value sent");
        to.transfer(msg.value);
        emit Tip(msg.sender, to, msg.value);
    }
}