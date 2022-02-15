pragma solidity 0.8.11;

// SPDX-License-Identifier: MIT

interface IUniswapV2Factory {
    function createPair(address tokenA, address tokenB) external returns (address pair);
}