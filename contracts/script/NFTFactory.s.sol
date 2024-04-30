// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";

import {NFTFactory} from "../src/NFTFactory.sol";

contract NFTFactoryScript is Script {
    function setUp() public {}

    function run() public {
        vm.broadcast();

        NFTFactory c = new NFTFactory();
        c.deployNFT(
            "Nathan",
            "N",
            "ipfs://QmbveAod8raJyhDJYJd3E4pAiXdMcVQn4GC3bejqesdobd/",
            1024
        );
        console.log("Counter address:", address(c));
    }
}
