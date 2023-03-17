
import type { Signer } from 'ethers'
import type { WalletType } from '../data/wallets'
import type { WalletConnection, Provider, WalletconnectTopic } from './walletConnection'

export type AccountConnection = {
	id: string,
	walletType: WalletType,
	walletconnectTopic?: WalletconnectTopic,
	autoconnect?: boolean,
	state?: AccountConnectionState,
}

export type AccountConnectionState = {
	walletConnection?: WalletConnection
	signer?: Signer

	address?: string
	chainId?: number
	walletconnectTopic?: WalletconnectTopic,
}


type SerializedAccountConnection = {
	id?: string,
	walletType: WalletType,
	state?: Omit<AccountConnectionState, 'walletConnection' | 'signer'>,
	autoconnect?: boolean,
}


export const createAccountConnection = ({
	id = crypto.randomUUID(),
	walletType,
	state = {},
	autoconnect = false,
}: SerializedAccountConnection) => ({
	id,
	walletType,
	state,
	autoconnect,
	// toJSON(){
	// 	return serializeAccountConnection(this)
	// }
}) as AccountConnection

export const serializeAccountConnection = ({
	id,
	walletType,
	state: {
		address,
		chainId,
		walletconnectTopic,
	} = {},
	autoconnect,
}: AccountConnection) => ({
	id,
	walletType,
	state: {
		address,
		chainId,
		walletconnectTopic,
	},
	autoconnect,
}) as SerializedAccountConnection


import { localStorageWritable } from '../utils/localStorageWritable'

export const accountConnections = localStorageWritable(
	'accountConnections',
	[] as SerializedAccountConnection[],
	accountConnectionsJson => accountConnectionsJson.map(createAccountConnection),
	accountConnections => accountConnections.map(serializeAccountConnection)
)


import { BrowserProvider } from 'ethers'

const getSigner = (provider: Provider) =>
	new BrowserProvider(provider).getSigner() // Object.assign(signer, { address: accounts[0] }),


import { readable } from 'svelte/store'
import type { Result } from '../utils/apolloRequestStore'

export const getAccountConnectionState = ({
	walletConnection,
	isInitiatedByUser = true,
}: {
	walletConnection: WalletConnection,
	isInitiatedByUser?: boolean
}) =>
	readable<Result<AccountConnectionState>>(
		{loading: true},
		set => void (async () => {
			const { accounts, chainId, walletconnectTopic } = await walletConnection.connect(isInitiatedByUser)

			const accountConnectionState: AccountConnectionState = {
				walletConnection,
				signer: walletConnection.provider && getSigner(walletConnection.provider),

				address: accounts?.[0],
				chainId,
				walletconnectTopic,
			}

			set({
				loading: false,
				data: accountConnectionState
			})

			if(walletConnection.subscribe){
				const stores = walletConnection.subscribe()

				stores.accounts.subscribe(accounts => set({
					loading: false,
					data: {
						...accountConnectionState,
						address: accounts[0]
					}
				}))

				stores.chainId.subscribe(chainId => set({
					loading: false,
					data: {
						...accountConnectionState,
						chainId
					}
				}))
			}
		})()
		.catch(error => {
			set({
				loading: false,
				error
			})
		})
	)
