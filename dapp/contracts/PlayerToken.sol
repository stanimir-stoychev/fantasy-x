// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;
pragma abicoder v2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract PlayerToken is ERC721 {
    struct Player {
        address owner;
        uint256 id;
        uint256 rank;
    }

    Player[] public players;
    mapping(uint256 => bool) playerExists;

    constructor() ERC721("PlayerToken", "PT") {
    }

    function mint(uint256 _id, uint256 _rank) public {
        require(!playerExists[_id]);
        Player memory playerObject = Player({ owner: msg.sender, id: _id, rank: _rank });
        players.push(playerObject);
        _mint(msg.sender, players.length);
        playerExists[_id] = true;
    }

    function getPlayers() public view returns (Player[] memory) {
        return players;
    }
}