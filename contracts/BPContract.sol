pragma solidity 0.8.11;

// SPDX-License-Identifier: MIT

abstract contract BPContract{
    function protect( address sender, address receiver, uint256 amount ) external virtual;
}