import { json } from "@sveltejs/kit";

import {
    ASSET,
    HELIUS_API_ENDPOINT,
    HELIUS_RPC_ENDPOINT,
    SOL,
} from "$lib/next/constants";

import { assetFromDas } from "$lib/next/state/util/asset-from-das";
import { assetFromTokenMetadata } from "$lib/next/state/util/asset-from-token-metadata";

import { HELIUS_API_KEY } from "$env/static/private";

import tFetch from "$lib/util/tfetch";

const fetchTokenMetadata = async (id: string) => {
    const metadataUrl = HELIUS_API_ENDPOINT(
        "v0/token-metadata",
        HELIUS_API_KEY
    );

    const [tokenMetdata] = await tFetch(metadataUrl, {
        includeOffChain: true,
        mintAccounts: [id],
    });

    const metadata = assetFromTokenMetadata(tokenMetdata);

    return metadata;
};

const fetchDasAsset = async (id: string) => {
    const rpcUrl = HELIUS_RPC_ENDPOINT(HELIUS_API_KEY);

    // Fetch from DAS
    const { result = {} } = await tFetch<{
        result: any;
    }>(rpcUrl, {
        id: "my-id",
        jsonrpc: "2.0",
        method: "getAsset",
        params: {
            id,
        },
    });

    JSON.sti

    if (!result?.content?.files.length) {
        const uri = result?.content?.json_uri;

        if (uri) {
            const jsonUri = await fetch(uri);

            result.content.metadata = await jsonUri.json();
        }
    }

    return assetFromDas(result);
};

// Consume a search, return what to do with it
export async function GET({ params }) {
    const { token: id } = params;

    let asset: any = {};

    try {
        if (id === SOL) {
            return json(
                ASSET({
                    id: SOL,
                    image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
                    name: "Solana",
                    symbol: "SOL",
                })
            );
        }

        // Try DAS first
        const das = await fetchDasAsset(id);

        if (das.image) {
            return json(das);
        }

        // Use old endpoint to fill in other token details
        const tokenMetadata = await fetchTokenMetadata(id);

        if (!tokenMetadata.image) {
            throw new Error(`Asset not found ${asset?.id}`);
        }

        return json(tokenMetadata);
    } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err);

        return new Response(JSON.stringify({ error: String(err) }), {
            status: 500,
        });
    }
}
