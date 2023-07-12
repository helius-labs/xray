import type { Asset, Balance } from "$lib/next/types";

export const ASSET = (asset?: Asset) => ({
    animationUrl: "",
    assetHash: "",
    attributes: [],
    burnt: false,
    collectionKey: "",
    compressed: false,
    creatorHash: "",
    creators: [],
    dataHash: "",
    delegate: "",
    description: "",
    files: {
        htmlFiles: [],
        images: [],
        videos: [],
    },
    frozen: false,
    htmlFile: "",
    id: "",
    image: "",
    jsonUri: "",
    leadId: 0,
    mutable: false,
    name: "",
    owner: "",
    seq: 0,
    symbol: "",
    tree: "",
    type: null,
    ...asset,
});

export const BALANCE = (balance?: Balance) => ({
    amount: 0,
    exchangeRate: {
        USD: null,
    },
    mint: "",
    ...balance,
});

export const SOL = "So11111111111111111111111111111111111111112";
export const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export const HELIUS_API_ENDPOINT = (endpoint:string, apiKey:string) => "https://api.helius.xyz/" + endpoint + "/?api-key=" + apiKey;
export const HELIUS_RPC_ENDPOINT = (apiKey:string) => "https://mainnet.helius-rpc.com/?api-key=" + apiKey;