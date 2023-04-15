import type { BrandedString } from '../utils/branded'

export type LensName = BrandedString<`${string}.${'lens' | 'test'}`>


import { Client, cacheExchange, fetchExchange, gql } from '@urql/svelte'

let client: Client

export const getClient = () => client ||= (
	new Client({
		url: 'https://api.lens.dev',
		exchanges: [
			cacheExchange,
			fetchExchange,
		],
	})
)


export const getProfile = async ({
	lensName,
}: {
	lensName: LensName,
}) => (
	await getClient().query(gql`
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
