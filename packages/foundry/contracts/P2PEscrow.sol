//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// Useful for debugging. Remove when deploying to a live network.
import "forge-std/console.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract P2PEscrow {
    using SafeERC20 for IERC20;

    mapping(uint256 => Escrow) public escrows;

    event EscrowAccepted(uint256 indexed orderId, Escrow escrow);
    event EscrowDeposited(uint256 indexed orderId, Escrow escrow);
    event EscrowCompleted(uint256 indexed orderId, Escrow escrow);

    struct Escrow {
        uint256 created;
        address payable maker;
        address payable taker;
        uint256 bankId;
        uint256 amount;
        IERC20 currency;
        EscrowStatus status;
    }

    enum EscrowStatus {
        PENDING,
        ACTIVE,
        IN_CUSTODY,
        COMPLETED
    }
    
    // Errors
    error Escrow__DepositAmountMustBeGreaterThanZero();
    error Escrow__IsZeroAddress();
    error Escrow__WithdrawalHasAlreadyBeenExecuted();
    error Escrow__TransferFailed();
    error Escrow__IsAlreadyActive();
    error Escrow__BuyerCannotBeSameAsSeller();
    error Escrow__StatusShoudBeCustody();

    function deposit(uint256 _orderId, uint256 _bankId, uint256 _amount, IERC20 _currency) external {
        if (escrows[_orderId].status == EscrowStatus.ACTIVE) {
            revert Escrow__IsAlreadyActive();
        }

        if (_amount == 0) {
            revert Escrow__DepositAmountMustBeGreaterThanZero();
        }

        //transfer stablecoin to contract
        _currency.safeTransferFrom(msg.sender, address(this), _amount);

        escrows[_orderId] = Escrow(
            block.timestamp,
            payable(msg.sender),
            payable(address(0)),
            _bankId,
            _amount,
            _currency,
            EscrowStatus.IN_CUSTODY
        );

        emit EscrowDeposited(_orderId, escrows[_orderId]);
    }

    function accept(uint256 _orderId) external {
        if (escrows[_orderId].taker == msg.sender) {
            revert Escrow__BuyerCannotBeSameAsSeller();
        }

        if (escrows[_orderId].status != EscrowStatus.IN_CUSTODY) {
            revert Escrow__IsAlreadyActive();
        }

        escrows[_orderId].status = EscrowStatus.ACTIVE;

        escrows[_orderId].taker = payable(msg.sender);

        emit EscrowAccepted(_orderId, escrows[_orderId]);
    }

    modifier onlyMaker(uint256 _orderId) {
        require(msg.sender == escrows[_orderId].maker, "Only Maker can call this");
        _;
    }

    modifier onlyTaker(uint256 _orderId) {
        require(msg.sender == escrows[_orderId].taker, "Only Taker can call this");
        _;
    }

    // todo: the release will function automatically with the response from chainlink, so only the smart contract will release

    function release(uint256 _orderId, uint256 _amount) external onlyTaker(_orderId) {
        if (escrows[_orderId].amount == 0 && _amount > escrows[_orderId].amount) {
            revert Escrow__WithdrawalHasAlreadyBeenExecuted();
        }
        uint256 amount = escrows[_orderId].amount - _amount;

        if (amount == 0) {
            escrows[_orderId].status = EscrowStatus.COMPLETED;
        } else {
            escrows[_orderId].status = EscrowStatus.IN_CUSTODY;
        }
        escrows[_orderId].currency.safeTransfer(escrows[_orderId].taker, amount);
        emit EscrowCompleted(_orderId, escrows[_orderId]);
    }
}
