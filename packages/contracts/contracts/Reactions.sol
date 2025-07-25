// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Reactions is ERC1155, Ownable {
    constructor() ERC1155("") {}

    // Each reaction is: keccak256(videoId, emojiId)
    function react(uint256 videoId, uint256 emojiId, address to) external {
        uint256 id = uint256(keccak256(abi.encodePacked(videoId, emojiId)));
        _mint(to, id, 1, "");
    }

    // Soulbound: disables transfers except mint/burn
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        // Only allow mint (from == 0) and burn (to == 0)
        if (from != address(0) && to != address(0)) {
            revert("Soulbound");
        }
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}