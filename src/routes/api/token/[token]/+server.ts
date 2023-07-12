import { json } from "@sveltejs/kit";

import type { Asset } from "$lib/next/types";

import {
  ASSET,
  HELIUS_API_ENDPOINT,
  HELIUS_RPC_ENDPOINT,
  SOL,
} from "$lib/next/constants";

import { assetFromDas } from "$lib/next/state/util/asset-from-das";
import { assetFromTokenMetadata } from "$lib/next/state/util/asset-from-token-metadata";

const {
  HELIUS_API_KEY,
} = process.env;

const fetchTokenMetadata = async (id:string) => {
  const metadataUrl = HELIUS_API_ENDPOINT("v0/token-metadata", HELIUS_API_KEY);

  const tokenMetadataReponse = await fetch(metadataUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      mintAccounts: [ id ],
      includeOffChain: true,
    }),
  });

  const [ tokenMetdata ] = await tokenMetadataReponse.json();

  const metadata = assetFromTokenMetadata(tokenMetdata);
    
  return metadata;
}

const fetchDasAsset = async (id:string) => {
    const rpcUrl = HELIUS_RPC_ENDPOINT(HELIUS_API_KEY);

    // Fetch from DAS
    const dasResponse = await fetch(rpcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 'my-id',
        method: 'getAsset',
        params: {
          id,
        },
      }),
    });

    const { result = {}} = await dasResponse.json();

    const das = JSON.parse(JSON.stringify(result));

    if(!das?.content?.files.length) {
      const uri = das?.content?.json_uri;
      
      if(uri) {
        const jsonUri = await fetch(uri);

        das.content.metadata = await jsonUri.json();
      }
    }

    return assetFromDas(das);
}

// Consume a search, return what to do with it
export async function GET<Asset>({ params }) {
    const { token : id } = params;

    let asset:any = {};

    try {
        if(id === SOL) {
          return json(ASSET({
            id: SOL,
            name: "Solana",
            symbol: "SOL",
            image: "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/solana/info/logo.png",
          }));
        }

        // Try DAS first
        const das = await fetchDasAsset(id);

        if(das.image) {
          return json(das);
        }

        // Use old endpoint to fill in other token details
        const tokenMetadata = await fetchTokenMetadata(id);

        if(!tokenMetadata.image) {
          throw new Error(`Asset not found ${asset?.id}`);
        }

        return json(tokenMetadata);
    } catch (err) {
      console.log(err)
        return new Response(err.message, { status: 500 });
    }
}
