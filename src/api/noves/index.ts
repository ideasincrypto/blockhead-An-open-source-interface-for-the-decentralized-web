import type { Ethereum } from '$/data/networks/types'
import * as publicEnv from '$env/static/public'

const request = async <T>(
	endpoint: string,
	params?: Record<string, string | number | boolean | undefined>,
	method: 'GET' | 'POST' = 'GET',
	body?: object,
) => {
	const response = await fetch(
		`https://translate.noves.fi/${endpoint}${
			params
				? `?${`${new URLSearchParams(
					Object.entries(params)
						.filter(([, value]) => value !== undefined)
						.map(([key, value]) => [key, String(value)])
				)}`}`
				: ''
		}`,
		{
			method,
			headers: {
				'Content-Type': 'application/json',
				'apiKey': publicEnv.PUBLIC_NOVES_API_KEY,
			},
			...body && {
				body: JSON.stringify(body),
			},
		}
	)

	if(!response.ok)
		throw await response.json()

	return await response.json() as T
}

/**
 * Noves API
 * {@link https://docs.noves.fi}
 */
export namespace Noves {
	type int32 = number
	type int64 = number

	type PaginatedResponse<T> = {
		items: T[]
		pageNumber: int32
		pageSize: int32
		hasNextPage: boolean
		nextPageUrl?: string
	}

	/**
	 * Translate API
	 * {@link https://docs.noves.fi/reference/introduction}
	 */
	export namespace Translate {
		/**
		 * EVM
		 * {@link https://docs.noves.fi/reference/get_evm-chains}
		 */
		export namespace Evm {
			type Token = {
				symbol: string
				name: string
				decimals: int32
				address: Ethereum.ContractAddress
			}
		
			type Protocol = (
				| 'Disperse.app'
				| 'ENS'
				| 'Ethereum Name Service'
				| 'Safe'
				| 'Uniswap V2'
			)

			type AssetTransfer = Erc20TokenTransfer | NftTransfer

			type Erc20TokenTransfer = {
				action: string
				token: Token
				amount: `${number}`
				from: {
					name: string | null
					address: string | null
				}
				to: {
					name: string | null
					address: string | null
				}
			}

			type NftTransfer = {
				action: string
				amount: `${number}`
				nft: {
					name: string
					id: string
					symbol: string
					address: string
				}
				from: {
					name: string | null
					address: string | null
				}
				to: {
					name: string | null
					address: string | null
				}
			}
		
			type Transaction = {
				txTypeVersion: int32
				chain: string | null
				accountAddress: string | null
				classificationData: {
					type: string // 'unverifiedContract' | 'unclassified'
					source: {
						type: string | null // 'human'
					}
					description: string
					protocol?: {
						name: Protocol | null
					}
					sent?: AssetTransfer[]
					received?: AssetTransfer[]
				}
				rawTransactionData: {
					transactionHash: string | null
					fromAddress: string | null
					toAddress: string | null
					blockNumber: int64
					gas: number
					gasPrice: number
					transactionFee: {
						amount: `${number}`
						token: Token
					}
					timestamp: number
				}
			}

			/**
			 * /evm/chains
			 * 
			 * Returns a list with the names of the EVM blockchains currently supported by this API. Use the provided chain names when calling other endpoints.
			 * 
			 * {@link https://docs.noves.fi/reference/get_evm-chains}
			 */
			export const getChains = async () => (
				await request<
					{
						name: string | null
						ecosystem: 'evm' // string | null
						evmChainId: int64 | null
					}[]
				>(
					'evm/chains',
				)
			)

			/**
			 * /evm/{chain}/tx/{txHash}
			 * 
			 * Returns all of the available transaction information for the chain and transaction hash requested, from the perspective of the wallet passed in as the viewAsWalletHash parameter.
			 * 
			 * {@link https://docs.noves.fi/reference/get_evm-chain-tx-txhash}
			 */
			export const getTransaction = async ({
				txHash,
				chain = 'eth',
				viewAsAccountAddress,
				v5Format = false,
			}: {
				// Path Params
				/** Hash of the transaction. */
				txHash: Ethereum.TransactionId
				/** Name of the chain. */
				chain: string

				// Query Params
				/** Results are returned with the view/perspective of this wallet address. */
				viewAsAccountAddress?: Ethereum.Address
				/** If true, the response will be in the v5 transaction format. Optional. */
				v5Format?: boolean
			}) => (
				await request<
					Transaction
				>(
					`evm/${chain}/tx/${txHash}`,
					{
						viewAsAccountAddress,
						v5Format,
					},
				)
			)

			/**
			 * /evm/{chain}/txs/{accountAddress}
			 * 
			 * Returns a list of the available transaction information for the chain and wallet requested, from the perspective of the wallet passed in as the viewAsWalletHash parameter.
			 * Provide either a block range or a timestamp range, not both.
			 * **Note**: For pagination, use the `nextPageUrl` link that will be returned as part of the output.
			 * 
			 * {@link https://docs.noves.fi/reference/get_evm-chain-txs-address}
			 */
			export const getTransactions = async ({
				accountAddress,
				chain = 'eth',
				viewAsAccountAddress,
				startTimestamp,
				endTimestamp,
				startBlock,
				endBlock,
				sort = 'desc',
				pageSize = 10,
				liveData = false,
				v5Format = false,
			}: {
				// Path Params
				/** Hash address of the Wallet. */
				accountAddress: Ethereum.Address
				/** Name of the chain. */
				chain: string

				// Query Params
				/** Results are returned with the view/perspective of this wallet address. Optional. */
				viewAsAccountAddress?: Ethereum.Address
				/** Start timestamp to filter by. Optional. */
				startTimestamp?: int64
				/** End timestamp to filter by. Optional. */
				endTimestamp?: int64
				/** Start block to filter by. Optional. */
				startBlock?: int64
				/** End block to filter by. Optional. */
				endBlock?: int64
				/** The order of the transactions to sort by timestamp. desc | asc. Optional */
				sort?: 'desc' | 'asc'
				/** Number of transactions to return per page. Optional. */
				pageSize?: int32
				/** Enables retrieval of recent data - defined as transactions that have been confirmed in the last 5 minutes. Optional. */
				liveData?: boolean
				/** If true, the response will be in the v5 transaction format. Optional. */
				v5Format?: boolean
			}) => (
				await request<
					PaginatedResponse<Transaction>
				>(
					`evm/${chain}/txs/${accountAddress}`,
					{
						viewAsAccountAddress,
						startTimestamp,
						endTimestamp,
						startBlock,
						endBlock,
						sort,
						pageSize,
						liveData,
						v5Format,
					},
				)
			)

			/**
			 * /evm/{chain}/history/{accountAddress}
			 * 
			 * Returns a list of the available transaction hashes for the chain and wallet requested. Max number of 100 results per request. If the wallet is not found, returns 404.
			 * 
			 * Provide either a block range or a timestamp range, not both.
			 * 
			 * **Note**: For pagination, use the `nextPageUrl` link that will be returned as part of the output.
			 * 
			 * {@link https://docs.noves.fi/reference/get_evm-chain-history-accountaddress}
			 */
			export const getTransactionHistory = async ({
				accountAddress,
				chain = 'eth',
				startTimestamp,
				endTimestamp,
				startBlock,
				endBlock,
				sort = 'desc',
				pageSize = 100,
				liveData = false
			}: {
				// Path Params
				/** Hash address of the Wallet. */
				accountAddress: Ethereum.Address
				/** Name of the chain. */
				chain: string

				// Query Params
				/** Start timestamp to filter by. Optional. */
				startTimestamp?: int64
				/** End timestamp to filter by. Optional. */
				endTimestamp?: int64
				/** Start block to filter by. Optional. */
				startBlock?: int64
				/** End block to filter by. Optional. */
				endBlock?: int64
				/** The order of the transactions to sort by timestamp. desc | asc. Optional */
				sort?: 'desc' | 'asc'
				/** Number of transactions to return per page. Optional. */
				pageSize?: int32
				/** Enables retrieval of recent data - defined as transactions that have been confirmed in the last 5 minutes. Optional. */
				liveData?: boolean
			}) => (
				await request<
					PaginatedResponse<{
						transactionHash: string
						blockNumber: `${bigint}`
						timestamp: number
					}>
				>(
					`evm/${chain}/history/${accountAddress}`,
					{
						startTimestamp,
						endTimestamp,
						startBlock,
						endBlock,
						sort,
						pageSize,
						liveData
					}
				)
			)

			type TokenBalance = {
				token: Token
				balance: string
				balanceUsd?: string
			}

			/**
			 * /evm/{chain}/tokens/balancesOf/{accountAddress}
			 * 
			 * Returns the token balances that the account address had as of a given block.
			 * If no block is passed, defaults to current block.
			 * The list of tokens to check is passed in the JSON payload.
			 * 
			 * {@link https://docs.noves.fi/reference/post_evm-chain-tokens-balancesof-address}
			 */
			export const getTokenBalances = async ({
				chain = 'eth',
				accountAddress,
				blockNumber,
				tokenAddresses,
			}: {
				// Path Params
				/** Name of the chain. */
				chain: string
				/** Hash address of the Wallet. */
				accountAddress: Ethereum.Address
				// Query Params
				/** Retrieve balances as of this block. Optional. */
				blockNumber?: int64
				// Body Params
				tokenAddresses: Ethereum.ContractAddress[]
			}) => (
				await request<TokenBalance[]>(
					`evm/${chain}/tokens/balancesOf/${accountAddress}`,
					{
						blockNumber
					},
					'POST',
					tokenAddresses,
				)
			)

			/**
			 * /evm/{chain}/raw/tx/{txHash}
			 * 
			 * Returns the raw transaction data.
			 * 
			 * {@link https://docs.noves.fi/reference/get_evm-chain-raw-tx-txhash}
			 */
			export const getRawTransaction = async ({
				txHash,
				chain = 'eth'
			}: {
				// Path Params
				/** Hash of the transaction */
				txHash: Ethereum.TransactionId
				/** Name of the chain */
				chain: string
			}) => (
				await request<
					{
						network: 'eth'
						rawTx: {
							transactionHash: string
							hash: string
							transactionIndex: number
							type: number
							blockHash: string
							blockNumber: number
							from: string
							to: string
							gas: number
							gasPrice: number
							value: number
							input: string
							nonce: number
							r: string
							s: string
							v: string
							networkEnum: number
							contractAddress: string
							timestamp: number
							gasUsed: number
							transactionFee: number
						}
						rawTraces: {
							action: {
								from: string
								callType: string
								gas: string
								input: string
								to: string
								value: string
							}
							blockHash: string
							blockNumber: number
							result: {
								gasUsed: string
								output: string
							}
							subtraces: number
							traceAddress: number[]
							transactionHash: string
							transactionPosition: number
							type: string
						}[]
						eventLogs: {
							decodedName: string
							decodedSignature: string
							logIndex: number
							address: string
							params: {
								name: string
								type: string
								value: string | number
							}[]
							raw: {
								eventSignature: string
								topics: string[]
								data: string
							}
							error?: string
						}[]
						internalTxs: any[]
						txReceipt: {
							status: number
							effectiveGasPrice: number
							gasUsed: number
							cumulativeGasUsed: number
						}
						decodedInput: {
							functionName: string
							parameters: {
								parameter: {
									name: string
									type: string
									order: number
									internalType: null
									serpentSignature: null
									structTypeName: null
									indexed: boolean
								}
								dataIndexStart: number
								result: string
							}[]
						}
					}
				>(
					`evm/${chain}/raw/tx/${txHash}`
				)
			)

			/**
			 * /evm/{chain}/describeTx/{txHash}
			 * 
			 * Returns a minimalistic version of the /tx endpoint with only description and type.
			 * Useful for displaying transaction info in UIs.
			 * 
			 * {@link https://docs.noves.fi/reference/get_evm-chain-describetx-txhash}
			 */
			export const describeTransaction = async ({
				txHash,
				chain = 'eth',
				viewAsAccountAddress
			}: {
				// Path Params
				/** Hash of the transaction. */
				txHash: Ethereum.TransactionId
				/** Name of the chain. */
				chain: string

				// Query Params
				/** Results are returned with the view/perspective of this wallet address. */
				viewAsAccountAddress?: string
			}) => (
				await request<
					Pick<
						Transaction['classificationData'],
						| 'type'
						| 'description'
					>
				>(
					`evm/${chain}/describeTx/${txHash}`,
					{
						viewAsAccountAddress,
					},
				)
			)
		}

		/**
		 * UTXO
		 * {@link https://docs.noves.fi/reference/get_utxo-chains}
		 */
		export namespace Utxo {
			/**
			 * /utxo/chains
			 * 
			 * Returns a list with the names of the UTXO blockchains currently supported by this API. Use the provided chain names when calling other endpoints.
			 * 
			* {@link https://docs.noves.fi/reference/get_utxo-chains}
			 */
			export const getChains = async () => (
				await request<
					{
						name: string
						ecosystem: 'utxo'
					}[]
				>(
					'utxo/chains',
				)
			)

			/**
			 * /utxo/{chain}/txs/{accountAddress}
			 * 
			 * Returns a list of translated transactions for the given account address. The list is sorted by block height, with the most recent transactions appearing first.
			 * 
			 * {@link https://docs.noves.fi/reference/get_utxo-chain-txs-accountaddress}
			 */
			export const getTransactions = async ({
				accountAddress = '3Q9St1xqncesXHAs7eZ9ScE7jYWhdMtkXL',
				chain = 'btc',
				startBlock,
				endBlock,
				startTimestamp,
				endTimestamp,
				pageSize = 10,
			}: {
				// Path Params
				/** Address of the account to fetch transactions for */
				accountAddress?: string
				/** Name of the chain */
				chain?: string

				// Query Params
				startBlock?: int64
				endBlock?: int64
				startTimestamp?: int64
				endTimestamp?: int64
				pageSize?: int32
			}) => (
				await request<
					PaginatedResponse<{
						txTypeVersion: int32
						chain: string | null
						accountAddress: string | null
						classificationData: string
						rawTransactionData: {
							transactionHash: string | null
							fromAddress: string | null
							toAddress: string | null
							blockNumber: int64
							gas: number
							gasPrice: number
							transactionFee: number
							timestamp: number
						}
					}>
				>(
					`utxo/${chain}/txs/${accountAddress}`,
					{
						startBlock,
						endBlock,
						startTimestamp,
						endTimestamp,
						pageSize,
					},
				)
			)

			/**
			 * /utxo/btc/txs/addresses/{xpub}
			 * 
			 * Utility endpoint for Bitcoin. Returns a list of derived addresses for the given xpub address.
			 * 
			 * {@link https://docs.noves.fi/reference/get_uxto-btc-addresses-xpub}
			 */
			export const getDerivedAddresses = async ({
				xpub
			}: {
				// Path Params
				/** Xpub address to derive BTC addresses from */
				xpub: string
			}) => (
				await request<
					string[]
				>(
					`utxo/btc/txs/addresses/${xpub}`,
				)
			)
		}

		/**
		 * Solana
		 * {@link https://docs.noves.fi/reference/get_svm-chains}
		 */
		export namespace Solana {
			/**
			 * /svm/chains
			 * 
			 * Returns a list with the names of the SVM blockchains currently supported by this API.
			 * Use the provided chain names when calling other endpoints.
			 * 
			 * {@link https://docs.noves.fi/reference/get_svm-chains}
			 */
			export const getChains = async () => (
				await request<
					{
						name: string | null
						ecosystem: 'svm' // string | null
					}[]
				>('svm/chains')
			)

			/**
			 * /svm/{chain}/tx/{signature}
			 * 
			 * Returns a single transaction.
			 * 
			 * {@link https://docs.noves.fi/reference/get_svm-chain-tx-signature}
			 */
			export const getTransaction = async ({
				signature,
				chain = 'solana',
			}: {
				// Path Params
				signature: string
				chain: string
			}) => (
				await request<
					{
						txTypeVersion: int32
						chain: string | null
						accountAddress: string | null
						classificationData: string
						rawTransactionData: {
							transactionHash: string | null
							fromAddress: string | null
							toAddress: string | null
							blockNumber: int64
							gas: number
							gasPrice: number
							transactionFee: number
							timestamp: number
						}
					}
				>(
					`svm/${chain}/tx/${signature}`,
				)
			)

			/**
			 * /svm/{chain}/tx/{format}/{signature}
			 * 
			 * Returns a single transaction, in the format specified by the `format` parameter.
			 * 
			 * {@link https://docs.noves.fi/reference/get_svm-chain-tx-format-signature}
			 */
			export const getFormattedTransaction = async ({
				signature,
				chain = 'solana',
				format = 'v5',
			}: {
				// Path Params
				signature: string
				chain: string
				format: string
			}) => (
				await request<
					{
						txTypeVersion: int32
						chain: string | null
						accountAddress: string | null
						classificationData: string
						rawTransactionData: {
							transactionHash: string | null
							fromAddress: string | null
							toAddress: string | null
							blockNumber: int64
							gas: object
							gasPrice: object
							transactionFee: object
							timestamp: object
						}
					}
				>(
					`svm/${chain}/tx/${format}/${signature}`,
				)
			)

			/**
			 * /svm/{chain}/txs/{accountAddress}
			 * 
			 * Returns a list of the available transaction information for the chain and wallet requested.
			 * **Note**: For pagination, it is recommended to use the `nextPageUrl` link that will be returned as part of the output.
			 * 
			 * {@link https://docs.noves.fi/reference/get_svm-chain-txs-accountaddress}
			 */
			export const getTransactions = async ({
				chain = 'solana',
				accountAddress,
				pageSize = 10,
			}: {
				// Path Params
				accountAddress: string
				chain?: string
				// Query Params
				pageSize?: number
			}) => (
				await request<
					PaginatedResponse<{
						
					}>
				>(
					`svm/${chain}/txs/${accountAddress}`,
					{
						pageSize,
					},
				)
			)

			/**
			 * /svm/{chain}/txs/{format}/{accountAddress}
			 * 
			 * Returns a list of the available transaction information for the chain and wallet requested, in the format specified by the format parameter.
			 * **Note**: For pagination, it is recommended to use the `nextPageUrl` link that will be returned as part of the output.
			 * 
			 * {@link https://docs.noves.fi/reference/get_svm-chain-txs-format-accountaddress}
			 */
			export const getFormattedTransactions = async ({
				accountAddress,
				chain = 'solana',
				format = 'v5',
				pageSize = 10,
			}: {
				// Path Params
				accountAddress: string
				chain?: string
				format?: string
				// Query Params
				pageSize?: number
			}) => (
				await request<
					PaginatedResponse<{
						
					}>
				>(
					`svm/${chain}/txs/${format}/${accountAddress}`,
					{
						pageSize,
					},
				)
			)

			/**
			 * /svm/{chain}/splAccounts/{accountAddress}
			 * 
			 * Returns a list of the available SPL token account addresses for the chain and wallet requested.
			 * 
			 * {@link https://docs.noves.fi/reference/get_svm-chain-splaccounts-address}
			 */
			export const getSplAccounts = async ({
				accountAddress,
				chain = 'solana',
			}: {
				// Path Params
				/** The account address */
				accountAddress: string
				/** Name of the chain */
				chain?: string
			}) => (
				await request<
					PaginatedResponse<{
					}>
				>(
					`svm/${chain}/splAccounts/${accountAddress}`,
				)
			)
		}
	}
}
