const contracts = {
  31337: [
    {
      name: "default_network",
      chainId: "31337",
      contracts: {
        Balloons: {
          address: "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "deployer",
                  type: "address",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Approval",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "value",
                  type: "uint256",
                },
              ],
              name: "Transfer",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "owner",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
              ],
              name: "allowance",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "approve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "account",
                  type: "address",
                },
              ],
              name: "balanceOf",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "decimals",
              outputs: [
                {
                  internalType: "uint8",
                  name: "",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "subtractedValue",
                  type: "uint256",
                },
              ],
              name: "decreaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "spender",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "addedValue",
                  type: "uint256",
                },
              ],
              name: "increaseAllowance",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "name",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "symbol",
              outputs: [
                {
                  internalType: "string",
                  name: "",
                  type: "string",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "totalSupply",
              outputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transfer",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              name: "transferFrom",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
        P2PEscrowConsumer: {
          address: "0xc6e7DF5E7b4f2A278906862b61205850344D4e7d",
          abi: [
            {
              inputs: [
                {
                  internalType: "address",
                  name: "_router",
                  type: "address",
                },
                {
                  internalType: "bytes32",
                  name: "_donId",
                  type: "bytes32",
                },
              ],
              stateMutability: "nonpayable",
              type: "constructor",
            },
            {
              inputs: [],
              name: "EmptyArgs",
              type: "error",
            },
            {
              inputs: [],
              name: "EmptySecrets",
              type: "error",
            },
            {
              inputs: [],
              name: "EmptySource",
              type: "error",
            },
            {
              inputs: [],
              name: "Escrow__BuyerCannotBeSameAsSeller",
              type: "error",
            },
            {
              inputs: [],
              name: "Escrow__DepositAmountMustBeGreaterThanZero",
              type: "error",
            },
            {
              inputs: [],
              name: "Escrow__IsAlreadyActive",
              type: "error",
            },
            {
              inputs: [],
              name: "Escrow__IsZeroAddress",
              type: "error",
            },
            {
              inputs: [],
              name: "Escrow__StatusShoudBeCustody",
              type: "error",
            },
            {
              inputs: [],
              name: "Escrow__TransferFailed",
              type: "error",
            },
            {
              inputs: [],
              name: "Escrow__WithdrawalHasAlreadyBeenExecuted",
              type: "error",
            },
            {
              inputs: [],
              name: "NoInlineSecrets",
              type: "error",
            },
            {
              inputs: [],
              name: "OnlyRouterCanFulfill",
              type: "error",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
              ],
              name: "UnexpectedRequestID",
              type: "error",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "orderId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "createdAt",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "orderId",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address payable",
                          name: "wallet",
                          type: "address",
                        },
                        {
                          internalType: "string",
                          name: "userUniqueId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "linkId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "accountId",
                          type: "string",
                        },
                      ],
                      internalType: "struct P2PEscrowConsumer.Actor",
                      name: "maker",
                      type: "tuple",
                    },
                    {
                      components: [
                        {
                          internalType: "address payable",
                          name: "wallet",
                          type: "address",
                        },
                        {
                          internalType: "string",
                          name: "userUniqueId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "linkId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "accountId",
                          type: "string",
                        },
                      ],
                      internalType: "struct P2PEscrowConsumer.Actor",
                      name: "taker",
                      type: "tuple",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountToBuy",
                      type: "uint256",
                    },
                    {
                      internalType: "contract IERC20",
                      name: "currency",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "startedAt",
                      type: "uint256",
                    },
                    {
                      internalType: "enum P2PEscrowConsumer.EscrowStatus",
                      name: "status",
                      type: "uint8",
                    },
                  ],
                  indexed: false,
                  internalType: "struct P2PEscrowConsumer.Escrow",
                  name: "escrow",
                  type: "tuple",
                },
              ],
              name: "EscrowAccepted",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "orderId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "createdAt",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "orderId",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address payable",
                          name: "wallet",
                          type: "address",
                        },
                        {
                          internalType: "string",
                          name: "userUniqueId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "linkId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "accountId",
                          type: "string",
                        },
                      ],
                      internalType: "struct P2PEscrowConsumer.Actor",
                      name: "maker",
                      type: "tuple",
                    },
                    {
                      components: [
                        {
                          internalType: "address payable",
                          name: "wallet",
                          type: "address",
                        },
                        {
                          internalType: "string",
                          name: "userUniqueId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "linkId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "accountId",
                          type: "string",
                        },
                      ],
                      internalType: "struct P2PEscrowConsumer.Actor",
                      name: "taker",
                      type: "tuple",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountToBuy",
                      type: "uint256",
                    },
                    {
                      internalType: "contract IERC20",
                      name: "currency",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "startedAt",
                      type: "uint256",
                    },
                    {
                      internalType: "enum P2PEscrowConsumer.EscrowStatus",
                      name: "status",
                      type: "uint8",
                    },
                  ],
                  indexed: false,
                  internalType: "struct P2PEscrowConsumer.Escrow",
                  name: "escrow",
                  type: "tuple",
                },
              ],
              name: "EscrowDeposited",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "uint256",
                  name: "orderId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "createdAt",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "orderId",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address payable",
                          name: "wallet",
                          type: "address",
                        },
                        {
                          internalType: "string",
                          name: "userUniqueId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "linkId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "accountId",
                          type: "string",
                        },
                      ],
                      internalType: "struct P2PEscrowConsumer.Actor",
                      name: "maker",
                      type: "tuple",
                    },
                    {
                      components: [
                        {
                          internalType: "address payable",
                          name: "wallet",
                          type: "address",
                        },
                        {
                          internalType: "string",
                          name: "userUniqueId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "linkId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "accountId",
                          type: "string",
                        },
                      ],
                      internalType: "struct P2PEscrowConsumer.Actor",
                      name: "taker",
                      type: "tuple",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountToBuy",
                      type: "uint256",
                    },
                    {
                      internalType: "contract IERC20",
                      name: "currency",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "startedAt",
                      type: "uint256",
                    },
                    {
                      internalType: "enum P2PEscrowConsumer.EscrowStatus",
                      name: "status",
                      type: "uint8",
                    },
                  ],
                  indexed: false,
                  internalType: "struct P2PEscrowConsumer.Escrow",
                  name: "escrow",
                  type: "tuple",
                },
              ],
              name: "EscrowReleased",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [],
              name: "NoPendingRequest",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "OwnershipTransferRequested",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "address",
                  name: "from",
                  type: "address",
                },
                {
                  indexed: true,
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "OwnershipTransferred",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "response",
                  type: "bytes",
                },
              ],
              name: "RequestFailed",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "id",
                  type: "bytes32",
                },
              ],
              name: "RequestFulfilled",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "id",
                  type: "bytes32",
                },
              ],
              name: "RequestSent",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: false,
                  internalType: "uint256",
                  name: "orderId",
                  type: "uint256",
                },
                {
                  indexed: false,
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
              ],
              name: "RequestedResult",
              type: "event",
            },
            {
              anonymous: false,
              inputs: [
                {
                  indexed: true,
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
                {
                  indexed: false,
                  internalType: "bytes",
                  name: "response",
                  type: "bytes",
                },
              ],
              name: "ResultReceived",
              type: "event",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_orderId",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_takerLinkId",
                  type: "string",
                },
                {
                  internalType: "string",
                  name: "_takerAccountId",
                  type: "string",
                },
              ],
              name: "accept",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "acceptOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              name: "checkUpkeep",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
                {
                  internalType: "bytes",
                  name: "",
                  type: "bytes",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "orderId",
                  type: "uint256",
                },
              ],
              name: "deletePendingRequest",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "_orderId",
                  type: "uint256",
                },
                {
                  internalType: "string",
                  name: "_makerUniqueId",
                  type: "string",
                },
                {
                  internalType: "uint256",
                  name: "_amount",
                  type: "uint256",
                },
              ],
              name: "deposit",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "donId",
              outputs: [
                {
                  internalType: "bytes32",
                  name: "",
                  type: "bytes32",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "",
                  type: "uint256",
                },
              ],
              name: "escrows",
              outputs: [
                {
                  internalType: "uint256",
                  name: "createdAt",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "orderId",
                  type: "uint256",
                },
                {
                  components: [
                    {
                      internalType: "address payable",
                      name: "wallet",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "userUniqueId",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "linkId",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "accountId",
                      type: "string",
                    },
                  ],
                  internalType: "struct P2PEscrowConsumer.Actor",
                  name: "maker",
                  type: "tuple",
                },
                {
                  components: [
                    {
                      internalType: "address payable",
                      name: "wallet",
                      type: "address",
                    },
                    {
                      internalType: "string",
                      name: "userUniqueId",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "linkId",
                      type: "string",
                    },
                    {
                      internalType: "string",
                      name: "accountId",
                      type: "string",
                    },
                  ],
                  internalType: "struct P2PEscrowConsumer.Actor",
                  name: "taker",
                  type: "tuple",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
                {
                  internalType: "uint256",
                  name: "amountToBuy",
                  type: "uint256",
                },
                {
                  internalType: "contract IERC20",
                  name: "currency",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "startedAt",
                  type: "uint256",
                },
                {
                  internalType: "enum P2PEscrowConsumer.EscrowStatus",
                  name: "status",
                  type: "uint8",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [],
              name: "getActiveEscrows",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "createdAt",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "orderId",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address payable",
                          name: "wallet",
                          type: "address",
                        },
                        {
                          internalType: "string",
                          name: "userUniqueId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "linkId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "accountId",
                          type: "string",
                        },
                      ],
                      internalType: "struct P2PEscrowConsumer.Actor",
                      name: "maker",
                      type: "tuple",
                    },
                    {
                      components: [
                        {
                          internalType: "address payable",
                          name: "wallet",
                          type: "address",
                        },
                        {
                          internalType: "string",
                          name: "userUniqueId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "linkId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "accountId",
                          type: "string",
                        },
                      ],
                      internalType: "struct P2PEscrowConsumer.Actor",
                      name: "taker",
                      type: "tuple",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountToBuy",
                      type: "uint256",
                    },
                    {
                      internalType: "contract IERC20",
                      name: "currency",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "startedAt",
                      type: "uint256",
                    },
                    {
                      internalType: "enum P2PEscrowConsumer.EscrowStatus",
                      name: "status",
                      type: "uint8",
                    },
                  ],
                  internalType: "struct P2PEscrowConsumer.Escrow[]",
                  name: "",
                  type: "tuple[]",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "orderId",
                  type: "uint256",
                },
              ],
              name: "getEscrow",
              outputs: [
                {
                  components: [
                    {
                      internalType: "uint256",
                      name: "createdAt",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "orderId",
                      type: "uint256",
                    },
                    {
                      components: [
                        {
                          internalType: "address payable",
                          name: "wallet",
                          type: "address",
                        },
                        {
                          internalType: "string",
                          name: "userUniqueId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "linkId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "accountId",
                          type: "string",
                        },
                      ],
                      internalType: "struct P2PEscrowConsumer.Actor",
                      name: "maker",
                      type: "tuple",
                    },
                    {
                      components: [
                        {
                          internalType: "address payable",
                          name: "wallet",
                          type: "address",
                        },
                        {
                          internalType: "string",
                          name: "userUniqueId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "linkId",
                          type: "string",
                        },
                        {
                          internalType: "string",
                          name: "accountId",
                          type: "string",
                        },
                      ],
                      internalType: "struct P2PEscrowConsumer.Actor",
                      name: "taker",
                      type: "tuple",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amountToBuy",
                      type: "uint256",
                    },
                    {
                      internalType: "contract IERC20",
                      name: "currency",
                      type: "address",
                    },
                    {
                      internalType: "uint256",
                      name: "startedAt",
                      type: "uint256",
                    },
                    {
                      internalType: "enum P2PEscrowConsumer.EscrowStatus",
                      name: "status",
                      type: "uint8",
                    },
                  ],
                  internalType: "struct P2PEscrowConsumer.Escrow",
                  name: "",
                  type: "tuple",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes32",
                  name: "requestId",
                  type: "bytes32",
                },
                {
                  internalType: "bytes",
                  name: "response",
                  type: "bytes",
                },
                {
                  internalType: "bytes",
                  name: "err",
                  type: "bytes",
                },
              ],
              name: "handleOracleFulfillment",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [],
              name: "owner",
              outputs: [
                {
                  internalType: "address",
                  name: "",
                  type: "address",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "bytes",
                  name: "data",
                  type: "bytes",
                },
              ],
              name: "performUpkeep",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "uint256",
                  name: "orderId",
                  type: "uint256",
                },
              ],
              name: "readyToResolve",
              outputs: [
                {
                  internalType: "bool",
                  name: "",
                  type: "bool",
                },
              ],
              stateMutability: "view",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "address",
                  name: "to",
                  type: "address",
                },
              ],
              name: "transferOwnership",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
            {
              inputs: [
                {
                  internalType: "string",
                  name: "_source",
                  type: "string",
                },
                {
                  internalType: "bytes",
                  name: "_encryptedSecretsUrls",
                  type: "bytes",
                },
                {
                  internalType: "uint64",
                  name: "_subscriptionId",
                  type: "uint64",
                },
                {
                  internalType: "uint32",
                  name: "_gasLimit",
                  type: "uint32",
                },
              ],
              name: "updateRequest",
              outputs: [],
              stateMutability: "nonpayable",
              type: "function",
            },
          ],
        },
      },
    },
  ],
} as const;

export default contracts;
