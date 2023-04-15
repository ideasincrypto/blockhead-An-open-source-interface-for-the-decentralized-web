import type { Ethereum } from '../data/networks/types'

import type { BrandedString } from '../utils/branded'

export type LensName = BrandedString<`${string}.${'lens' | 'test'}`>

export enum LensInstance {
	Polygon = 'Polygon',
	PolygonMumbai = 'PolygonMumbai',
	SandboxPolygonMumbai = 'SandboxPolygonMumbai',
}


import { Client, cacheExchange, fetchExchange, gql } from '@urql/svelte'

const clients: Partial<Record<LensInstance, Client>> = {}

export const getClient = ({
	instance = LensInstance.Polygon
}: {
	instance?: LensInstance
}) => clients[instance] ||= (
	new Client({
		url: {
			[LensInstance.Polygon]: 'https://api.lens.dev',
			[LensInstance.PolygonMumbai]: 'https://api-mumbai.lens.dev',
			[LensInstance.SandboxPolygonMumbai]: 'https://api-sandbox-mumbai.lens.dev',
		}[instance],
		exchanges: [
			cacheExchange,
			fetchExchange,
		],
	})
)


export const getProfile = async ({
	instance,
	lensName,
}: {
	instance?: LensInstance,
	lensName: LensName,
}) => (
	await getClient({ instance }).query(gql`
		query Profile($handle: Handle!) {
			profile(request: { handle: $handle }) {
				id
				name
				bio
				attributes {
					displayType
					traitType
					key
					value
				}
				followNftAddress
				metadata
				isDefault
				picture {
					... on NftImage {
						contractAddress
						tokenId
						uri
						verified
					}
					... on MediaSet {
						original {
							url
							mimeType
						}
					}
					__typename
				}
				handle
				coverPicture {
					... on NftImage {
						contractAddress
						tokenId
						uri
						verified
					}
					... on MediaSet {
						original {
							url
							mimeType
						}
					}
					__typename
				}
				ownedBy
				dispatcher {
					address
					canUseRelay
				}
				stats {
					totalFollowers
					totalFollowing
					totalPosts
					totalComments
					totalMirrors
					totalPublications
					totalCollects
				}
				followModule {
					... on FeeFollowModuleSettings {
						type
						amount {
							asset {
								symbol
								name
								decimals
								address
							}
							value
						}
						recipient
					}
					... on ProfileFollowModuleSettings {
						type
					}
					... on RevertFollowModuleSettings {
						type
					}
				}
			}
		}
	`, {
		handle: lensName
	})
)

export const generateChallenge = async ({
	instance,
	address,
}: {
	instance?: LensInstance,
	address: Ethereum.Address,
}) => (
	await getClient({ instance }).query(gql`
		query Challenge($address: EthereumAddress!) {
			challenge(request: { address: $address }) {
				text
			}
		}
	`, {
		address
	})
)


export const authenticate = async ({
	instance,
	address,
	signature,
}: {
	instance?: LensInstance,
	address: Ethereum.Address,
	signature: string,
}) => (
	await getClient({ instance }).mutation(gql`
		mutation Authenticate(
			$address: EthereumAddress!
			$signature: Signature!
		) {
			authenticate(request: {
				address: $address,
				signature: $signature
			}) {
				accessToken
				refreshToken
			}
		}
	`, {
		address,
		signature,
	})
)
