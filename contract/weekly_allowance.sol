// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WeeklyAllowance {
    address[] public children;
    uint256 public weeklyAmount;
    uint256 public lastPaymentTime;

    // Constructor to initialize the contract with the recipients and weekly amount
    constructor(address[] memory _children, uint256 _weeklyAmount) {
        children = _children;
        weeklyAmount = _weeklyAmount;
        lastPaymentTime = block.timestamp; // Set the last payment time to the current block timestamp
    }

    // Modifier to check if a week has passed
    modifier oneWeekPassed() {
        require(block.timestamp >= lastPaymentTime + 1 weeks, "Weekly allowance not yet available");
        _;
    }

    // Function to release Ether to the children if a week has passed
    function releaseAllowance() external oneWeekPassed {
        uint256 totalAmount = weeklyAmount * children.length;
        require(address(this).balance >= totalAmount, "Insufficient contract balance");

        for (uint256 i = 0; i < children.length; i++) {
            payable(children[i]).transfer(weeklyAmount);
        }

        lastPaymentTime = block.timestamp; // Update last payment time
    }

    // Fallback function to allow children to withdraw Ether
    receive() external payable {}

    // Function to allow contract to receive funds
    function fundContract() external payable {}

    // Function to check the balance of the contract
    function contractBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
