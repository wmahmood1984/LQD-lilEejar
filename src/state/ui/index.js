import React, { useState, useEffect } from "react";
import Web3 from 'web3'
import {abi,contractAddress, chainId} from "../../config.js"

// const abi = [
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "quantity",
// 				"type": "uint256"
// 			},
// 			{
// 				"components": [
// 					{
// 						"internalType": "string",
// 						"name": "uri",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "name",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "bGround",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Head",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Hairs",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Hands",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Shirt",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Pants",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Shoes",
// 						"type": "string"
// 					}
// 				],
// 				"internalType": "struct ERC721.Trait",
// 				"name": "t1",
// 				"type": "tuple"
// 			},
// 			{
// 				"components": [
// 					{
// 						"internalType": "string",
// 						"name": "uri",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "name",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "bGround",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Head",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Hairs",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Hands",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Shirt",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Pants",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Shoes",
// 						"type": "string"
// 					}
// 				],
// 				"internalType": "struct ERC721.Trait",
// 				"name": "t2",
// 				"type": "tuple"
// 			},
// 			{
// 				"components": [
// 					{
// 						"internalType": "string",
// 						"name": "uri",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "name",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "bGround",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Head",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Hairs",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Hands",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Shirt",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Pants",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Shoes",
// 						"type": "string"
// 					}
// 				],
// 				"internalType": "struct ERC721.Trait",
// 				"name": "t3",
// 				"type": "tuple"
// 			}
// 		],
// 		"name": "_safeMint",
// 		"outputs": [],
// 		"stateMutability": "payable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "add",
// 				"type": "address"
// 			}
// 		],
// 		"name": "addSingleWhiteList",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address[]",
// 				"name": "List",
// 				"type": "address[]"
// 			}
// 		],
// 		"name": "addWhiteList",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "approve",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "_token",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "tokenOwner",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "constructor"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "approved",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Approval",
// 		"type": "event"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "operator",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": false,
// 				"internalType": "bool",
// 				"name": "approved",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "ApprovalForAll",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint8",
// 				"name": "number",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "boolian",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "ChangeCondition",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint8",
// 				"name": "level",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "quantity",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ChangePrices",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint8",
// 				"name": "level",
// 				"type": "uint8"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "quantity",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ChangeReward",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_Id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "claimReward",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "add",
// 				"type": "address"
// 			}
// 		],
// 		"name": "DelSingleWhiteList",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address[]",
// 				"name": "List",
// 				"type": "address[]"
// 			}
// 		],
// 		"name": "DelWhiteList",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "string",
// 						"name": "uri",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "name",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "bGround",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Head",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Hairs",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Hands",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Shirt",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Pants",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Shoes",
// 						"type": "string"
// 					}
// 				],
// 				"internalType": "struct ERC721.Trait",
// 				"name": "t2",
// 				"type": "tuple"
// 			}
// 		],
// 		"name": "kidnapping",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "luck",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "string",
// 				"name": "uri",
// 				"type": "string"
// 			}
// 		],
// 		"name": "powerUp",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "randomSequence",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "safeTransferFrom",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "bytes",
// 				"name": "_data",
// 				"type": "bytes"
// 			}
// 		],
// 		"name": "safeTransferFrom",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "operator",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "bool",
// 				"name": "approved",
// 				"type": "bool"
// 			}
// 		],
// 		"name": "setApprovalForAll",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_Id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "staking",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"anonymous": false,
// 		"inputs": [
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"indexed": true,
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Transfer",
// 		"type": "event"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "from",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "to",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "transferFrom",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_Id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "unStaking",
// 		"outputs": [],
// 		"stateMutability": "nonpayable",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "Array",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			}
// 		],
// 		"name": "balanceOf",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "BusinessMenReward",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_Id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "CalculateReward",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ClaimedReward",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "condition1",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "condition2",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "condition3",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "condition4",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "ContracOwner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getApproved",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getArray",
// 		"outputs": [
// 			{
// 				"internalType": "uint256[]",
// 				"name": "",
// 				"type": "uint256[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getNFTObjArray",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "address",
// 						"name": "owner",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "id",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "class",
// 						"type": "uint256"
// 					},
// 					{
// 						"components": [
// 							{
// 								"internalType": "string",
// 								"name": "uri",
// 								"type": "string"
// 							},
// 							{
// 								"internalType": "string",
// 								"name": "name",
// 								"type": "string"
// 							},
// 							{
// 								"internalType": "string",
// 								"name": "bGround",
// 								"type": "string"
// 							},
// 							{
// 								"internalType": "string",
// 								"name": "Head",
// 								"type": "string"
// 							},
// 							{
// 								"internalType": "string",
// 								"name": "Hairs",
// 								"type": "string"
// 							},
// 							{
// 								"internalType": "string",
// 								"name": "Hands",
// 								"type": "string"
// 							},
// 							{
// 								"internalType": "string",
// 								"name": "Shirt",
// 								"type": "string"
// 							},
// 							{
// 								"internalType": "string",
// 								"name": "Pants",
// 								"type": "string"
// 							},
// 							{
// 								"internalType": "string",
// 								"name": "Shoes",
// 								"type": "string"
// 							}
// 						],
// 						"internalType": "struct ERC721.Trait",
// 						"name": "traits",
// 						"type": "tuple"
// 					}
// 				],
// 				"internalType": "struct ERC721.NFTObj[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "_Id",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "getReward",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getRewardLoop",
// 		"outputs": [
// 			{
// 				"internalType": "uint256[]",
// 				"name": "",
// 				"type": "uint256[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "getStakingArray",
// 		"outputs": [
// 			{
// 				"components": [
// 					{
// 						"internalType": "address",
// 						"name": "staker",
// 						"type": "address"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "IdStaked",
// 						"type": "uint256"
// 					},
// 					{
// 						"internalType": "uint256",
// 						"name": "TimeStamp",
// 						"type": "uint256"
// 					}
// 				],
// 				"internalType": "struct ERC721.stakObj[]",
// 				"name": "",
// 				"type": "tuple[]"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "address",
// 				"name": "operator",
// 				"type": "address"
// 			}
// 		],
// 		"name": "isApprovedForAll",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "LaborReward",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "mintingPriceGen0",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "mintingPriceGen1",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "mintingPriceGen2",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "mintingPriceGen3",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "mintingPriceWhite",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "name",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "NFTObjArray",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "owner",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "id",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "class",
// 				"type": "uint256"
// 			},
// 			{
// 				"components": [
// 					{
// 						"internalType": "string",
// 						"name": "uri",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "name",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "bGround",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Head",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Hairs",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Hands",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Shirt",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Pants",
// 						"type": "string"
// 					},
// 					{
// 						"internalType": "string",
// 						"name": "Shoes",
// 						"type": "string"
// 					}
// 				],
// 				"internalType": "struct ERC721.Trait",
// 				"name": "traits",
// 				"type": "tuple"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "OfficerReward",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "ownerOf",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "num",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "random",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "random10",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "StakingMapping",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "staker",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "IdStaked",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "TimeStamp",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "StakingMappingIdWise",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "staker",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "IdStaked",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "TimeStamp",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "stakObjArray",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "staker",
// 				"type": "address"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "IdStaked",
// 				"type": "uint256"
// 			},
// 			{
// 				"internalType": "uint256",
// 				"name": "TimeStamp",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "bytes4",
// 				"name": "interfaceId",
// 				"type": "bytes4"
// 			}
// 		],
// 		"name": "supportsInterface",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "symbol",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "token",
// 		"outputs": [
// 			{
// 				"internalType": "contract IERC20",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "tokenIdCounter",
// 		"outputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "",
// 				"type": "uint256"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "TokenOwner",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "uint256",
// 				"name": "tokenId",
// 				"type": "uint256"
// 			}
// 		],
// 		"name": "tokenURI",
// 		"outputs": [
// 			{
// 				"internalType": "string",
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [],
// 		"name": "TreasuryAddress",
// 		"outputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	},
// 	{
// 		"inputs": [
// 			{
// 				"internalType": "address",
// 				"name": "",
// 				"type": "address"
// 			}
// 		],
// 		"name": "WhiteList",
// 		"outputs": [
// 			{
// 				"internalType": "bool",
// 				"name": "",
// 				"type": "bool"
// 			}
// 		],
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]

const tokenAbi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "swapTokensForEth",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapV2Pair",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "uniswapV2Router",
		"outputs": [
			{
				"internalType": "contract IUniswapV2Router02",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
]

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
var web3;
var RonContract
var address
var WhiteList
var balance2
var ContractAddress
var tokenContract
export const initWeb3 = createAsyncThunk(
    "InitWeb3",
    async(a,thunkApi)=>{
    

        try {
            if(Web3.givenProvider){ 
                web3 = new Web3(Web3.givenProvider);
				const networkId = await web3.eth.net.getId()
                await Web3.givenProvider.enable()
                if(networkId==chainId){
					const tokenAddres = "0x2E1ED9AD6AcB92Ee65aDD2fCF1f2cAE2179a031F"
				var contract = new web3.eth.Contract(abi, contractAddress);
				tokenContract = new web3.eth.Contract(tokenAbi,tokenAddres)
				RonContract = contract;
                const addresses = await web3.eth.getAccounts()
                address = addresses[0];
				var ethBalance = await web3.eth.getBalance(address)
				
                thunkApi.dispatch(balance({
                    contract: RonContract,
                    address: address,
					tokenContract,
				}))
				}
				//	ContractAddress = "0xC5EC3AD0dFe996EfcE6B2Aad575F74aA47421880"
				

				
				return {
                    web3,
                    contract,
                    address,
					ContractAddress,
					ethBalance,
					networkId,
                                                       }
            }else {console.log("error in loading web3")
					return {web3:null,contract:null,address:null,SeekGoldAddress:null}}
        } catch (error) {
            console.log("Error", error)
        }

    }
)




export const balance = createAsyncThunk("balance",
    async ({contract,address,tokenContract})=>{

		
        try {
            const balance1 = await tokenContract.methods.balanceOf(address).call()
			const balanceNFT = await contract.methods.balanceOf(address).call()
			balance2 = await contract.methods.balanceOf(address).call()
			WhiteList = await contract.methods.WhiteList(address).call()
			const NFTArray = await contract.methods.getNFTObjArray().call()
			const stakArray = await contract.methods.getStakingArray().call()
			const claimed = await contract.methods.getClaimedgArray().call()
			const eligibility = await contract.methods.powerUpEligible().call({from : address})
			const approvalAllowance = await tokenContract.methods.allowance(address,contractAddress).call({from : address})
			const tokenUri = null //await contract.methods.tokenURI(0).call()





             return {WhiteList, balance1,NFTArray,stakArray,claimed,eligibility, approvalAllowance,tokenUri,balanceNFT}

        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )



	


	export const CalculateReward = createAsyncThunk("balance",
    async ({contract,address,tokenContract})=>{

		
        try {
            const balance1 = await tokenContract.methods.balanceOf(address).call()
			balance2 = await contract.methods.balanceOf(address).call()
			WhiteList = await contract.methods.WhiteList(address).call()
			const NFTArray = await contract.methods.getNFTObjArray().call()
			const stakArray = await contract.methods.getStakingArray().call()
			const price = 0
			


             return {balance1,price,NFTArray,stakArray}

        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )



	export const CalculateReward2 = createAsyncThunk("CalculateReward",
    async ({id})=>{

		
        try {
              const result = await RonContract.methods.CalculateReward(id).call()
			
			console.log("result",result)

             return result

        } catch (error) {
            console.log("Error in ArrayThunk",error)
        }
    }
    )


	export const MintA = createAsyncThunk("Mint",
    async ({qty,AvaReq,tokenApproval,classes,traits,ImgUri,series})=>{

		
        try {
			
			var price = WhiteList == false ? 20000 : 10000
			var tQ = balance2 <= 10? 0 : balance2 <= 15? web3.utils.toWei("50","ether") : balance2 <= 20? web3.utils.toWei("100","ether") : web3.utils.toWei("200","ether")
			
			const result = await RonContract.methods._safeMint(qty,tokenApproval*10000,classes,traits,ImgUri,series).send({from:address, value: AvaReq*10000})
		//	.on("confirmation", async function (response) {window.location.reload();})

        } catch (error) {
            console.log("Error in Mint Function",error)
        }
    }
    )


	export const Power = createAsyncThunk("Mint",
    async ({id,url,ImgUri})=>{

		
        try {
			console.log("id",id)
			console.log("url in redux",url)
			const result = await RonContract.methods.powerUp(id,url,ImgUri).send({from:address})
			//.on("confirmation", async function (response) {window.location.reload();})

        } catch (error) {
            console.log("Error in Power Function",error)
        }
    }
    )


	export const Staking = createAsyncThunk("Staking",
    async ({id})=>{

		
        try {
			
			
			const result = await RonContract.methods.staking(id).send({from:address})
			//.on("confirmation", async function (response) {window.location.reload();})

        } catch (error) {
            console.log("Error in Staking Function",error)
        }
    }
    )


	export const ApprovalA = createAsyncThunk("Approval",
    async ({qty})=>{

		
        try {
			
			
			const result = await tokenContract.methods.approve(contractAddress,web3.utils.toWei(qty.toString(),"ether")).send({from:address})
			.on("confirmation", async function (response) {window.location.reload();})

        } catch (error) {
            console.log("Error in Approval Function",error)
        }
    }
    )



	export const Claiming = createAsyncThunk("Staking",
    async ({id})=>{

		
        try {
		   console.log("id received",id)
			
			const result = await RonContract.methods.claimReward(id).send({from:address})
			//.on("confirmation", async function (response) {window.location.reload();})

        } catch (error) {
            console.log("Error in Claiming Function",error)
        }
    }
    )







const adoptSlice = createSlice({
    name: "AdopSlice",
    initialState: {
        web3: null,
		ethBalance: null,
        address : null,
        balance: null,
		Price: null,
		Active: null,
        toggle: false,
		remaining: null,
		NFTArray: null,
		stakArray: null,
		ContractAddress:null,
		Reward: null,
		claimed:null,
		eligibility: null,
		approvalAllowance: null,
		tokenUri: null,
		networkId:null,
		Pending : false,
		balanceNFT: null,
		WhiteList:false,




    },
    reducers: {
        toggle : (state,actions)=>{
            state.toggle = !state.toggle;
        },
		setAccount: (state,actions)=>{
			state.address = actions.payload
		}
    },
    extraReducers: {
        [initWeb3.fulfilled] : (state,action)=>{
            state.web3 = action.payload.web3;
            state.address = action.payload.address;
			state.ethBalance = action.payload.ethBalance;
			state.ContractAddress = action.payload.ContractAddress
			state.networkId = action.payload.networkId



         },

         [balance.fulfilled] : (state,action)=>{
            state.balance = action.payload.balance1
			state.Price = action.payload.price
			state.NFTArray = action.payload.NFTArray
			state.stakArray = action.payload.stakArray
			state.Reward = action.payload.Reward
			state.claimed = action.payload.claimed
			state.eligibility = action.payload.eligibility
			state.approvalAllowance = action.payload.approvalAllowance
			state.tokenUri = action.payload.tokenUri
			state.balanceNFT = action.payload.balanceNFT
			state.WhiteList = action.payload.WhiteList
		},


		

       
        [MintA.pending] : (state,action)=>{
			
			state.Pending = !state.Pending 
            state.toggle = !state.toggle;
			state.error = null;
        },
        [MintA.fulfilled] : (state,action)=>{
			state.Pending = !state.Pending 
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


		   
        [Staking.pending] : (state,action)=>{
			
			state.Pending = !state.Pending 
            state.toggle = !state.toggle;
			state.error = null;
        },
        [Staking.fulfilled] : (state,action)=>{
			state.Pending = !state.Pending 
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


				   
        [Claiming.pending] : (state,action)=>{
			
			state.Pending = !state.Pending 
            state.toggle = !state.toggle;
			state.error = null;
        },
        [Claiming.fulfilled] : (state,action)=>{
			state.Pending = !state.Pending 
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


						   
        [Power.pending] : (state,action)=>{
			
			state.Pending = !state.Pending 
            state.toggle = !state.toggle;
			state.error = null;
        },
        [Power.fulfilled] : (state,action)=>{
			state.Pending = !state.Pending 
            state.toggle = !state.toggle;
			state.error = action.payload;

        },


		[ApprovalA.pending] : (state,action)=>{
			
			state.Pending = !state.Pending 
            state.toggle = !state.toggle;
			state.error = null;
        },
        [ApprovalA.fulfilled] : (state,action)=>{
			state.Pending = !state.Pending 
            state.toggle = !state.toggle;
			state.error = action.payload;

        },



       
//
    }
})

export const adopreducer = adoptSlice.reducer;
export const { toggle } = adoptSlice.actions
