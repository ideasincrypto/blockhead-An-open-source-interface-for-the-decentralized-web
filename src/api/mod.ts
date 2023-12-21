import type { Ethereum } from '../data/networks/types'
import type { FarcasterCastId } from './farcaster'


export type UrlMetadata = {
	image?: {
		url?: string;
		width?: number;
		height?: number;
	};
	"json-ld"?: Record<string, object[]>;
	description?: string;
	alt?: string;
	title?: string;
	publisher?: string;
	logo?: {
		url: string;
	};
	nft?: {
		owner?: Ethereum.Address;
		tokenId?: string;
		mediaUrl?: string;
		mintUrl?: string;
		mimeType?: string;
		collection: {
			id: string;
			name: string;
			chain: string;
			contractAddress: string;
			creatorAddress: string;
			itemCount: number;
			ownerCount: number;
			mintUrl?: string;
			description?: string;
			imageUrl?: string;
			openSeaUrl?: string;
			creator?: Ethereum.Address;
		};
	};
}


/**
 * Endpoint to get the Metadata for a list of cast hashes
 * @url https://docs.modprotocol.org/metadata-cache#endpoint-to-get-the-metadata-for-a-list-of-cast-hashes
 */
export const getMetadataForCastHashes = async <_FarcasterCastId extends FarcasterCastId = FarcasterCastId>(
	castIds: _FarcasterCastId[]
) => (
	await fetch('https://api.modprotocol.org/api/cast-embeds-metadata', {
		body: JSON.stringify(castIds),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then(response => response.json())
) as Record<_FarcasterCastId, UrlMetadata>


/**
 * Endpoint to get the Metadata for a list of urls
 * @url https://docs.modprotocol.org/metadata-cache#endpoint-to-get-the-metadata-for-a-list-of-urls
 */

export const getMetadataForUrls = async <Url extends string = string>(
	urls: Url[]
) => (
	await fetch('https://api.modprotocol.org/api/cast-embeds-metadata/by-url', {
		body: JSON.stringify(urls),
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
	})
		.then(response => response.json())
) as Record<Url, UrlMetadata>
