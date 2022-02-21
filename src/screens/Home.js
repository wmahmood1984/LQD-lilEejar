import React, { useState, useEffect,useRef,useCallback } from "react";
import Dialog from "@mui/material/Dialog";
import { useDispatch, useSelector } from 'react-redux';
import { Claiming, initWeb3,Mint, Power, Staking } from "../state/ui";
import Timer from "../Timer";
import Web3 from 'web3'
import data from "../Assets/Summary"
import GIF from "../Assets/sideImg.gif"
import { FormControlLabel } from "@mui/material";
import ipfs from '../ipfs'
import { create } from 'ipfs-http-client'
import { saveAs } from 'file-saver';
import {abi,contractAddress} from "../config.js"


import mergeImages from  'merge-images'
const { Canvas, Image, createCanvas, loadImage } = require('canvas');
const fs = require("fs");
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

const convertBase64ToFile = (base64String, fileName) => {
	let arr = base64String.split(',');
	let mime = arr[0].match(/:(.*?);/)[1];
	let bstr = atob(arr[1]);
	let n = bstr.length;
	let uint8Array = new Uint8Array(n);
	while (n--) {
	   uint8Array[n] = bstr.charCodeAt(n);
	}
	let file = new File([uint8Array], fileName, { type: mime });
	return file;
}

const useStateCallbackWrapper = (initilValue, callBack) => {
	
	const [state, setState] = useState(initilValue);
	useEffect(() => callBack(state), [state]);
	return [state, setState];
  };


  const callBack = async state => {
	const client = create('https://ipfs.infura.io:5001/api/v0')
	
	console.log("state",state)
	var lComb = await  mergeImages([state.BG,state.head,state.Hair,state.G,state.pant,state.hand,state.shirt,state.shoes ], {
		Canvas: Canvas,
		Image: Image
	  })
	  
	//   .then((res,err)=>
	// 	downloadBase64Data(res,"Waqas")
	// 	 )
	var file2 =  await convertBase64ToFile(lComb,"Waqas")
	try {
		const added2 = await client.add(file2)
		var url = `https://ipfs.infura.io/ipfs/${added2.path}`
		//setIMG2(url)
		
		 console.log("url",url)
		//window.open(`${url}`)
	  } catch (error) {
		console.log('Error uploading file: ', error)
	  }

	  if(Web3.givenProvider && state.status==true){ 
	var	web3 = new Web3(Web3.givenProvider);
	const addresses = await web3.eth.getAccounts()
	var address = addresses[0];
	  var contract = new web3.eth.Contract(abi, contractAddress);
	  const result = await contract.methods.powerUp(state.id,url).send({from:address})
	  .on("confirmation", async function (response) {window.location.reload();})
	
	}
  };

  const useStateCallbackWrapper2 = (initilValue, callBack) => {
	
	const [state, setState] = useState(initilValue);
	useEffect(() => callBack2(state), [state]);
	return [state, setState];
  };


  const callBack2 = async state => {
	const client = create('https://ipfs.infura.io:5001/api/v0')
	
	console.log("state",state)
	var bComb = await  mergeImages([state.BG,state.head,state.BF,state.G,state.pant,state.hand,state.shirt,state.shoes ], {
		Canvas: Canvas,
		Image: Image
	  })
	  
	//   .then((res,err)=>
	// 	downloadBase64Data(res,"Waqas")
	// 	 )
	var file2 =  await convertBase64ToFile(bComb,"Waqas")
	try {
		const added2 = await client.add(file2)
		var url = `https://ipfs.infura.io/ipfs/${added2.path}`
		//setIMG2(url)
		
		 console.log("url",url)
		//window.open(`${url}`)
	  } catch (error) {
		console.log('Error uploading file: ', error)
	  }

	  if(Web3.givenProvider && state.status==true){ 
	var	web3 = new Web3(Web3.givenProvider);
	const addresses = await web3.eth.getAccounts()
	var address = addresses[0];
	  var contract = new web3.eth.Contract(abi, contractAddress);
	  const result = await contract.methods.powerUp(state.id,url).send({from:address})
	  .on("confirmation", async function (response) {window.location.reload();})
	
	}
  };


  const useStateCallbackWrapper3 = (initilValue, callBack) => {
	
	const [state, setState] = useState(initilValue);
	useEffect(() => callBack3(state), [state]);
	return [state, setState];
  };


  const callBack3 = async state => {
	const client = create('https://ipfs.infura.io:5001/api/v0')
	
	console.log("state",state)
	var oComb = await  mergeImages([state.BG,state.head,state.Hair,state.G,state.pant,state.hand,state.shirt,state.Obj,state.shoes ], {
		Canvas: Canvas,
		Image: Image
	  })
	  
	//   .then((res,err)=>
	// 	downloadBase64Data(res,"Waqas")
	// 	 )
	var file2 =  await convertBase64ToFile(oComb,"Waqas")
	try {
		const added2 = await client.add(file2)
		var url = `https://ipfs.infura.io/ipfs/${added2.path}`
		//setIMG2(url)
		
		 console.log("url",url)
		//window.open(`${url}`)
	  } catch (error) {
		console.log('Error uploading file: ', error)
	  }

	  if(Web3.givenProvider && state.status==true){ 
	var	web3 = new Web3(Web3.givenProvider);
	const addresses = await web3.eth.getAccounts()
	var address = addresses[0];
	  var contract = new web3.eth.Contract(abi, contractAddress);
	  const result = await contract.methods.powerUp(state.id,url).send({from:address})
	  .on("confirmation", async function (response) {window.location.reload();})
	
	}
  };





  
  
 
  







const Home = () => {

  const [sec, setSec] = useState(true);
  const [sec1, setSec1] = useState(false);
  const [numb, setNumb] = useState(99);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [_reward,setReward] = useState([])
  const [img1,setIMG2] = useState()
  const [fileUrl, updateFileUrl] = useState(``)
  



  //Initial Stage BusinessMan

  const[bAURA,setbAURA] = useState(data.BMAN.AURA.baura0)
  const[bBG,setbBG] = useState(data.BMAN.BG.bBG0)
  const[bBF,setbBF] = useState(data.BMAN.BF.bBFC)
  const[bG,setbG] = useState(data.BMAN.Glasses.bG1)
  const[bHND,setbHND] = useState(data.BMAN.Hands.bHN)
  const[bHD,setbHD] = useState(data.BMAN.Head.bHD)
  const[bPT,setbPT] = useState(data.BMAN.Pants.bP1)
  const[bST,setbST] = useState(data.BMAN.Shirt.bST1)
  const[bSS,setbSS] = useState(data.BMAN.Shoes.bSS1)
  const[sta2,setSta2] = useState(false)

var  bMANinit = {
	id: 0,
	 aura : data.BMAN.AURA.baura0,
	 BG: data.BMAN.BG.bBG0,
	 G: data.BMAN.Glasses.bG1,
	 BF: data.BMAN.BF.bBFC,
	 hand : data.BMAN.Hands.bHN,
	 head: data.BMAN.Head.bHD,
	 pant : data.BMAN.Pants.bP1,
	 shirt: data.BMAN.Shirt.bST1,
	 shoes:data.BMAN.Shoes.bSS1,
	 status: sta2,
 }

//  const[bMAN,setbMan] = useState(bMANinit)
const [bMAN, setbMan] = useStateCallbackWrapper2(bMANinit, callBack2);

   //Initial Stage Labor


   const[lBG,setlBG] = useState(data.LAB.BG.lBG1)
   const[lG,setlG] = useState(data.LAB.Glasses.lG1)
   const[lHR,setlHR] = useState(data.LAB.Hairs.lHR1)
   const[lHND,setlHND] = useState(data.LAB.Hand.lHN1)
   const[lHD,setlHD] = useState(data.LAB.Head.lHD1)
   const[lPT,setlPT] = useState(data.LAB.Pants.lPT1)
   const[lST,setlST] = useState(data.LAB.Shirt.lST1)
   const[lSS,setlSS] = useState(data.LAB.Shoes.lSH1)
   const[sta1,setSTa] = useState(false)

 var  lAbinit = {
	id: 0,
	BG: data.LAB.BG.lBG1,
	G : data.LAB.Glasses.lG1,
	Hair : data.LAB.Hairs.lHR1,
	hand : data.LAB.Hand.lHN1,
	head: data.LAB.Head.lHD1,
	pant : data.LAB.Pants.lPT1,
	shirt: data.LAB.Shirt.lST1,
	shoes:data.LAB.Shoes.lSH1,
	status: sta1
}
//   const[lAb,setlAb] = useState(lAbinit)
   const [lAb, setlAb] = useStateCallbackWrapper(lAbinit, callBack);


      //Initial Stage Officer


	  const[oBG,setoBG] = useState(data.OFF.BG.oBG1)
	  const[oG,setoG] = useState(data.OFF.Glasses.oG1)
	  const[oHR,setoHR] = useState(data.OFF.Hairs.oHR1)
	  const[oHND,setoHND] = useState(data.OFF.Hand.oHN1)
	  const[oHD,setoHD] = useState(data.OFF.Head.oHD1)
	  const[oOB,setoOB] = useState(data.OFF.Obj.oOBJ1)
	  const[oPT,setoPT] = useState(data.OFF.Pants.oPT1)
	  const[oST,setoST] = useState(data.OFF.Shirt.oST1)
	  const[oSS,setoSS] = useState(data.OFF.Shoes.oSH0)
	  const[sta3,setSTa3] = useState(false)

	  var oFFinit = {
		id:0,
		BG: data.OFF.BG.oBG1,
		G : data.OFF.Glasses.oG1,
		Hair : data.OFF.Hairs.oHR1,
		hand : data.OFF.Hand.oHN1,
		head: data.OFF.Head.oHD1,
		Obj: data.OFF.Obj.oOBJ1,
		pant : data.OFF.Pants.oPT1,
		shirt: data.OFF.Shirt.oST1,
		shoes:data.OFF.Shoes.oSH1,
		status: sta3
	}
//	const[oFF,setoFF] = useState(oFFinit)
const [oFF, setoFF] = useStateCallbackWrapper3(oFFinit, callBack3);



  
  const toggle = useSelector((state)=>{
    return state.adoptReducer.toggle;
  });



 
  const address = useSelector((state)=>{
    return state.adoptReducer.address;
  });

  const claimed = useSelector((state)=>{
    return state.adoptReducer.claimed;
  });



  const NFTArray = useSelector((state)=>{
     return state.adoptReducer.NFTArray  });


  var array = NFTArray && NFTArray.filter(tr=>tr.owner == address)
  
  const stakeArray = useSelector((state)=>{

    return state.adoptReducer.stakArray});


 var Sarray = stakeArray && stakeArray.filter(tr=>tr.staker == address)



 const Reward = useSelector((state)=>{

  return state.adoptReducer.Reward/1000000000000000000});


  // const web3 = useSelector((state)=>{

  //   return state.adoptReducer.web3});
 




const dispatch = useDispatch()
useEffect(() => {
dispatch(initWeb3())


async function getData(){
	try {
		if(Web3.givenProvider){ 
			var web3 = new Web3(Web3.givenProvider); 
	var ContractAddress = "0x788EAEFAb35B240228C581Fef27581DcF13b10a4"
	var contract = new web3.eth.Contract(abi, ContractAddress);
	const result =  await contract.methods.getStakingArray().call()
	setReward([])
	result.map(async(v,i)=>{
		var abc = await getReward(v.IdStaked)
	//_reward.push(abc)
	 setReward(oldArray => [...oldArray, abc]);
	})	 
	
	}
	} catch (error) {
		console.log("Error", error)
	}
}

getData();
  


 
}, [toggle])




//async function master(){



  async function getReward(id){
    try {
      if(Web3.givenProvider){ 
          var web3 = new Web3(Web3.givenProvider); 
  var ContractAddress = "0x788EAEFAb35B240228C581Fef27581DcF13b10a4"
  var contract = new web3.eth.Contract(abi, ContractAddress);
  const result =  await contract.methods.CalculateReward(id).call()
   return result    
  
  }
  } catch (error) {
      console.log("Error", error)
  }
  }
// //}






const handleClickOpen = () => {
    setOpen(true);
  };

  setTimeout(() => {
    setOpen2(false);
  }, 3000);

  const handleClose = () => {
    setOpen(false);
    setOpen1(false);
    setOpen2(false);
  };

  window.ethereum.on('accountsChanged',async (accounts)=>{window.location.reload() })

  

	//  const downloadBase64Data = async (base64String, fileName) => {
	// 	let file = convertBase64ToFile(base64String, fileName);
	// 	//saveAs(file, fileName);
	// 	return file
	 
	// }
	
	const convertBase64ToFile = (base64String, fileName) => {
		let arr = base64String.split(',');
		let mime = arr[0].match(/:(.*?);/)[1];
		let bstr = atob(arr[1]);
		let n = bstr.length;
		let uint8Array = new Uint8Array(n);
		while (n--) {
		   uint8Array[n] = bstr.charCodeAt(n);
		}
		let file = new File([uint8Array], fileName, { type: mime });
		return file;
	}


const client = create('https://ipfs.infura.io:5001/api/v0')



const MintA = async ()=>{

	var t1 = ["","BusinessMan","BGBman","bMAN.head","abc","bMAN.hand","bMAN.shirt","bMAN.pant","bMAN.shoes"];
	var t2 = ["","Worker ","lAb.BG","lAb.head","abc","lAb.hand","lAb.shirt","lAb.pant","lAb.shoes"];
	var t3 = ["","Officer ","oFF.BG","oFF.head","abc","oFF.hand","oFF.shirt","oFF.pant","oFF.shoes"]
	var bComb = await  mergeImages([bMAN.BG,bMAN.head,bMAN.BF,bMAN.G,bMAN.pant,bMAN.hand,bMAN.shirt,bMAN.shoes ], {
		Canvas: Canvas,
		Image: Image
	  })
	  
	//   .then((res,err)=>
	// 	downloadBase64Data(res,"Waqas")
	// 	 )
	var file =  await convertBase64ToFile(bComb,"Waqas")
	try {
		const added = await client.add(file)
		t1[0] = await `https://ipfs.infura.io/ipfs/${added.path}`
		//setIMG2(url)
		
//		 console.log("url",url1)
		//window.open(`${url1}`)
	  } catch (error) {
		console.log('Error uploading file: ', error)
	  } 

	  var lComb = await  mergeImages([lAb.BG,lAb.head,lAb.Hair,lAb.G,lAb.pant,lAb.hand,lAb.shirt,lAb.shoes ], {
		Canvas: Canvas,
		Image: Image
	  })
	  
	//   .then((res,err)=>
	// 	downloadBase64Data(res,"Waqas")
	// 	 )
	var file2 =  await convertBase64ToFile(lComb,"Waqas")
	try {
		const added2 = await client.add(file2)
		t2[0] = await `https://ipfs.infura.io/ipfs/${added2.path}`
		//setIMG2(url)
		
//		 console.log("url",url2)
		//window.open(`${url2}`)
	  } catch (error) {
		console.log('Error uploading file: ', error)
	  }


	  var oComb = await  mergeImages([oFF.BG,oFF.head,oFF.Hair,oFF.G,oFF.pant,oFF.hand,oFF.shirt,oFF.Obj,oFF.shoes ], {
		Canvas: Canvas,
		Image: Image
	  })
	  
	//   .then((res,err)=>
	// 	downloadBase64Data(res,"Waqas")
	// 	 )
	var file3 =  await convertBase64ToFile(oComb,"Waqas")
	try {
		const added3 = await client.add(file3)
		t3[0] = await `https://ipfs.infura.io/ipfs/${added3.path}`
		//setIMG2(url)
		
//		 console.log("url",url3)
		//window.open(`${url3}`)
	  } catch (error) {
		console.log('Error uploading file: ', error)
	  }
	  
	  dispatch(Mint({t1,t2,t3}))

	}





  const handleClaim = (stakeId)=>{

    dispatch(Claiming({id: stakeId}))
    
  }
  

  const handleStake = (id)=>{
    dispatch(Staking({id}))
  }
  async function handleConnect(e){
    e.preventDefault()
    console.log("button pressed")    
    window.ethereum.request({
      method: 'wallet_requestPermissions',
      params: [{
        eth_accounts: {},
      }]
    }); 
   }





const PowerUp = async (id)=>{

	console.log("array",NFTArray[id])
	var cClass = NFTArray[id].class
	if(cClass == "60"){
		setlAb({...lAb, id:id, shirt: data.LAB.Shirt.lST4, status:true})
	}

	if(cClass == "10"){
		setbMan({...bMAN, id:id, BG: data.BMAN.BG.bBG17, status:true})
	}

	if(cClass == "30"){
		setoFF({...oFF, id:id, BG: data.OFF.BG.oBG3, status:true})
	}

	
   }

 

  const MintB = () => {
    return (
      <div className="min-box flex aic jc flex-col">
        <div className="container flex flex-col aic jc">
          <div className="heading-mint cfff s22 font b6">MINT</div>
          <div className="desc-mint s12 cfff">
            Your Valuable LQD may now be recuite new Tenents Characters.
          </div>
          <div className="numb s24 font b6 cfff">
            <span className="numb1 c-y">34.427</span>/
            <span className="numb2">50.000</span>
          </div>
          <div className="lbl-minted s12 cfff">MINTED</div>
          <div className="boxes flex">
            <div className="mint-item flex flex-col aic jc">
              <div className="cfff b6 font">0</div>
              <div className="cfff b6 font s12">SLQD</div>
            </div>
            <div className="mint-item flex flex-col aic jc">
              <div className="cfff b6 font">20k</div>
              <div className="cfff b6 font s12">SLQD</div>
            </div>
            <div className="mint-item flex flex-col aic jc">
              <div className="cfff b6 font">40k</div>
              <div className="cfff b6 font s12">SLQD</div>
            </div>
            <div className="mint-item flex flex-col aic jc">
              <div className="cfff b6 font">80k</div>
              <div className="cfff b6 font s12">SLQD</div>
            </div>
          </div>
          <div className="action flex flex-col aic jc">
            <div className="inc-sec flex aic">
              <div
                className="btn btn-mins button font b6"
                onClick={(e) => {
                  setNumb(numb - 1);
                }}
              >
                -
              </div>
              <div className="inc-numb cfff font b6 s20">{numb}</div>
              <div
                className="btn btn-plus button font b6"
                onClick={(e) => {
                  setNumb(numb + 1);
                }}
              >
                +
              </div>
            </div>
            <div className="btn button mint-now">MINT NOW</div>
            <div className="lbl-price s24 cfff">
              Price: <span className="rs cfff font s24 b6">80000</span>$LQD
            </div>
          </div>
        </div>
        <div className="btn btn-connect button s20 font b6">CONNECT WALLET</div>
      </div>
    );
  };

  const MoneySaving = () => {
    return (
      <div className="money-saving flex flex-col aic jc">
        <div className="money-saving-heading s20 font cfff b6">
          MONEY SAVING VAULT
        </div>
        <div className="money-saving-blcok flex aic">
          <div className="money-card-l">
            <div className="card-top flex flex-col aic jc">
              <div className="money-saving-heading s18 font cfff b6">
                EARNED JOE
              </div>
              <div flex className="flex aic">
                <img className="img-joe" src="./images/joe.jpeg" />
                <div className="meta">
                  <div className="c-y s18 font b6">9999.999</div>
                  <div className="lbl-date cfff s12 font">APR: 2, 110.41%</div>
                  <div className="lbl-date cfff s12 font">
                    Your Stake: 170.000
                  </div>
                </div>
              </div>
            </div>
            <div className="card-bottom flex flex-col aic jc">
              <input type="text" className="txt"></input>
              <div className="lbl-avil cfff font s12">
                Available LQD: 120.00
              </div>
              <div className="btn-block flex aic jc">
                <div className="btn btn-unstack button font">UNSTAKE</div>
                <div className="btn btn-stack button font">STAKE</div>
              </div>
              <div className="money-saving-btm s20 font cfff b6">
                Stack LQD and eran JOE
              </div>
            </div>
          </div>
          <div className="money-card-r">
            <div className="card-top flex flex-col aic jc">
              <div className="money-saving-heading s18 font cfff b6">
                EARNED MIM
              </div>
              <div flex className="flex aic">
                <img className="img-joe" src="./images/MIM.jpeg" />
                <div className="meta">
                  <div className="c-y s18 font b6">9999.999</div>
                  <div className="lbl-date cfff s12 font">APR: 2, 110.41%</div>
                  <div className="lbl-date cfff s12 font">
                    Your Stake: 170.000
                  </div>
                </div>
              </div>
            </div>
            <div className="card-bottom flex flex-col aic jc">
              <input type="text" className="txt"></input>
              <div className="lbl-avil cfff font s12">
                Available LQD: 120.00
              </div>
              <div className="btn-block flex aic jc">
                <div className="btn btn-unstack button font">UNSTAKE</div>
                <div className="btn btn-stack button font">STAKE</div>
              </div>
              <div className="money-saving-btm s20 font cfff b6">
                Stack LQD and eran MIM
              </div>
            </div>
          </div>
        </div>
        <div className="btn-bottom flex aic jc">
          <button className="btn button">CONNECT WALLET</button>
        </div>
      </div>
    );
  };
 
  function CalculateReward(time,id)  {

  var claimeFiltered = claimed && claimed.filter(tr=>tr.id == id)
	var amounts = claimeFiltered.map(transaction => transaction.reward )
	var currentTimeinSeconds = new Date().getTime() / 1000
	var total = amounts.reduce((acc,item) => (acc+=Number(item)),0).toFixed(0)
	var timeInMinutes = (currentTimeinSeconds -  time)/(60);
	var rewardType = NFTArray[id].class == "60" ? 5 * 10**18 : NFTArray[id].class == "30"  ? 10 * 10**18 : 20 * 10**18 ;
	var _rewardSub = rewardType / 525600 * timeInMinutes; 
	var _reward = claimed && _rewardSub - total;
	return (_reward/1000000000000000000).toFixed(5);
}
console.log("array ", NFTArray && array)
  return (
    <div className="home flex">
      <div className="wrapWidth flex">
        <div className="left-side flex">
          <img className="img-gif" src= {GIF} />
        </div>
        <div className="right-side flex flex-col aic jc">
          <div className="top-cards flex aic">
            <div className="card-left flex flex-col">
              <div className="heading cfff s18 b4 font">TENANTS Staked</div>
              <div className="min-card-block flex aic">
               {
               
               stakeArray && Sarray.map((v,i)=>
               (<div className="min-card flex flex-col" key={v.id}>
                <div className="min-h s9 flex aic jc">{NFTArray && NFTArray[v.IdStaked].class   == "60"  ? "Worker": NFTArray[v.IdStaked].class=="30"? "Officer": "BusinessMan"}</div>
                <img src={NFTArray && NFTArray[v.IdStaked].traits.uri} className="min-img" />
                <div className="min-ht s9 flex aic jc">{v.class==60 ?"5$": v.class==30? "10$": "20$"}</div>
                <div className="min-ht s9 flex aic jc">Reward : {CalculateReward(v.TimeStamp,v.IdStaked)}</div>
                <button onClick={()=>{handleClaim(v.IdStaked)}}>claim</button>
                <Timer props={v.TimeStamp}/>
              </div>)
               
               )
               
               
                   
               }
              </div>
              <div className="progress-bar flex rel">
                <div className="bar abs"></div>
              </div>
              <div className="btn-block flex aic">
                

              </div>
              <button className="btn btn-c-all button font b3">
                CLAIM ALL AND UNSTAKE
              </button>
            </div>
            <div className="card-right flex flex-col">
              <div className="heading cfff s18 b4 font">TENANTS PAYING</div>
              <div className="min-card-block flex aic">
                {NFTArray && array.map((v,i)=>
                (<div className="min-card flex flex-col" key={v.id}>
                <div className="min-h s9 flex aic jc">{v.class==60 ?"Worker": v.class==30? "Officer": "BusinessMan"}</div>
                <img src={v.traits.uri} className="min-img" />
                <div className="min-ht s9 flex aic jc">{v.class==60 ?"5$": v.class==30? "10$": "20$"}</div>
                <button onClick={()=>{handleStake(v.id)}}>stake</button>
				        <button onClick={()=>{PowerUp(v.id)}}>Power Up</button>
              </div>))
                }
                
              </div>
              <div className="progress-bar flex rel">
                <div className="bar abs"></div>
              </div>
              <div className="btn-block flex aic">
                {/* <button className="btn btn-all button font b3">
                  SELECT ALL
                </button> */}
                
              </div>
            </div>
          </div>
          <div className="bottom-cards flex aic">
            <div className="card-left flex aic">
              <div className="left-side">
                <img src="./images/pcImg.png" className="min-img" />
              </div>
              <div className="right-side felx flex-co aic">
                <div className="heading cfff font b4">MINT TENANTS</div>
                <div className="desc cfff s12 font">
                  Advertise your proprety here
                  <br /> and take new tenants!!
                </div>
                <div className="btn-block flex flex-col">
                  <button
                    className="btn button c000 font b3"
                    onClick={() => {MintA();}}
                  >
                    <blink>MINT NOW!!</blink>
                  </button>
                  <button
                    className="btn button c000 font b3"
                    onClick={()=>{handleClickOpen()
                      
                    }}
                  >
                    VIEW MINTING
                  </button>
                </div>
              </div>
            </div>
            {/* Sec1 */}
            {sec ? (
              <div className="card-right flex flex-col">
                <div className="header-blck flex aic">
                  <div className="left flex">
                    <div className="flex aic jc">
                      <img className="img" src="./images/rent.jpeg" />
                      <div className="lbl cfff font b5">
                        RENTAL INCOME 
                        <br /> GENERATED : {Reward.toFixed(5)}
                      </div>
                    </div>
                  </div>
                  <div className="right flex flex-col">
                    <div
                      className={`btn1 ${sec ? "active" : ""}`}
                      onClick={(e) => {
                        setSec(!sec);
                        setSec1(false);
                      }}
                    ></div>
                    <div
                      className={`btn2 ${sec1 ? "active" : ""}`}
                      onClick={(e) => {
                        setSec1(!sec1);
                        setSec(false);
                      }}
                    ></div>
                  </div>
                </div>
                <div className="center flex aic">
                  <div className="le flex flex-col">
                    <div className="h1">BUILDING 1A</div>
                    <div className="item flex aic">
                      <div className="lbl cfff font s12">
                        TOTAL STAKED <br />
                        TENANTS 
                      </div>
                      <div className="numb b6 font s14">{Sarray && Sarray.length}</div>
                    </div>
                    <div className="item flex aic">
                      <div className="lbl cfff font s12">
                        TOTAL UNSTAKED <br />
                        TENANTS 
                      </div>
                      <div className="numb b6 font s14">{array && array.length}</div>
                    </div>
                  </div>
                  <div className="ri flex flex-col">
                    <div className="numb font s22 b5 ">15.000</div>
                    <div className="lbl b6 font cfff s12">UNCLIMD LIQU</div>
                    <div className="btn button">CLAIM REWARD</div>
                  </div>
                </div>
                <div className="btn-block flex aic">
                  <button
                    className="btn button c000 font b3"
                    onClick={(e) => {
                      handleConnect(e)
                    }}
                  >
                    CONENCT WALLET
                  </button>
                  <button
                    className="btn button c000 font b3"
                    onClick={(e) => {
                      setOpen1(true);
                      
                    }}
                  >
                    MONEY VALUT
                  </button>
                </div>
              </div>
            ) : (
              // Sec2
              <div className="card-right flex flex-col">
                <div className="header-blck flex aic">
                  <div className="left flex">
                    <div className="flex aic jc">
                      <img className="img" src="./images/Pw.jpeg" />
                      <div className="lbl cfff font b5">POWER UP LEVEL</div>
                    </div>
                  </div>
                  <div className="right flex flex-col">
                    <div
                      className={`btn1 ${sec ? "active" : ""}`}
                      onClick={(e) => {
                        setSec(!sec);
                        setSec1(false);
                      }}
                    ></div>
                    <div
                      className={`btn2 ${sec1 ? "active" : ""}`}
                      onClick={(e) => {
                        setSec1(!sec1);
                        setSec(false);
                      }}
                    ></div>
                  </div>
                </div>
                <div className="center-b flex aic jc">
                  <div className="left-s flex flex-col">
                    <div className="he flex aic">
                      <div className="lbl s12 font cfff">DAYS STAKED:</div>
                      <div className="numb s14 font b6">7</div>
                    </div>
                    <div className="levels  flex aic">
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb c-y">5</div>
                        <div className="numb-lbl c-y">LVL1</div>
                      </div>
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb">10</div>
                        <div className="numb-lbl">LVL2</div>
                      </div>
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb">15</div>
                        <div className="numb-lbl">LVL3</div>
                      </div>
                    </div>
                  </div>
                  <div className="right-s flex flex-col">
                    <div className="he flex aic">
                      <div className="lbl s12 font cfff">DAYS STAKED:</div>
                      <div className="numb s14 font b6">7</div>
                    </div>
                    <div className="levels  flex aic">
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb c-y">5</div>
                        <div className="numb-lbl c-y">LVL1</div>
                      </div>
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb">10</div>
                        <div className="numb-lbl">LVL2</div>
                      </div>
                      <div className="levl-item flex flex-col aic jc">
                        <div className="numb">15</div>
                        <div className="numb-lbl">LVL3</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="btn-block flex aic jc">
                  <button className="btn button c000 font b3">
                    POWER UP CALCULATOR
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Mint />
      </Dialog>

      <Dialog
        open={open1}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <MoneySaving />
      </Dialog>

      <Dialog
        open={open2}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className="nft-gif flex aic jc">
          <img className="img-nft" src="./images/NFT.gif" />
        </div>
      </Dialog>
    </div>
  );
};

export default Home;
