// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ScoreBoard {
    struct Entry {
        uint256 score;
        uint256 timestamp;
        bytes32 hash;
    }

    // videoId => user => Entry
    mapping(uint256 => mapping(address => Entry)) public scores;

    // videoId => list of addresses who submitted scores
    mapping(uint256 => address[]) public leaders;

    // videoId => user => bool (used to check if user already in leaders)
    mapping(uint256 => mapping(address => bool)) private hasSubmitted;

    event NewHighScore(address indexed user, uint256 indexed videoId, uint256 score);

    function submitScore(uint256 videoId, uint256 score, bytes32 hash) external {
        require(score > 0, "Score must be positive");
        Entry storage prev = scores[videoId][msg.sender];
        bool firstSubmission = prev.score == 0;
        if (firstSubmission || score > prev.score) {
            scores[videoId][msg.sender] = Entry({
                score: score,
                timestamp: block.timestamp,
                hash: hash
            });
            if (!hasSubmitted[videoId][msg.sender]) {
                leaders[videoId].push(msg.sender);
                hasSubmitted[videoId][msg.sender] = true;
            }
            emit NewHighScore(msg.sender, videoId, score);
        }
        // else: do nothing (score not higher)
    }

    function getScore(uint256 videoId, address user) external view returns (Entry memory) {
        return scores[videoId][user];
    }

    function getTop(uint256 videoId, uint256 limit) external view returns (address[] memory addrs, uint256[] memory scoresOut) {
        address[] memory all = leaders[videoId];
        uint256 n = all.length;
        if (limit > n) limit = n;
        // Bubble sort (O(n^2)), safe for small n
        address[] memory sorted = new address[](n);
        uint256[] memory sortedScores = new uint256[](n);
        for (uint256 i = 0; i < n; i++) {
            sorted[i] = all[i];
            sortedScores[i] = scores[videoId][all[i]].score;
        }
        for (uint256 i = 0; i < n; i++) {
            for (uint256 j = i + 1; j < n; j++) {
                if (sortedScores[j] > sortedScores[i]) {
                    // swap scores
                    uint256 tmpScore = sortedScores[i];
                    sortedScores[i] = sortedScores[j];
                    sortedScores[j] = tmpScore;
                    // swap addresses
                    address tmpAddr = sorted[i];
                    sorted[i] = sorted[j];
                    sorted[j] = tmpAddr;
                }
            }
        }
        addrs = new address[](limit);
        scoresOut = new uint256[](limit);
        for (uint256 i = 0; i < limit; i++) {
            addrs[i] = sorted[i];
            scoresOut[i] = sortedScores[i];
        }
    }
}