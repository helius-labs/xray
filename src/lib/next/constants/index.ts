import type {
    Asset,
    Balance,
    Transaction,
    TransactionAction,
} from "$lib/next/types";

import { Source } from "helius-sdk";

export const ASSET = (asset?: any): Asset => ({
    animationUrl: "",
    assetHash: "",
    attributes: [],
    authorities: [],
    burnt: false,
    collectionKey: "",
    compressed: false,
    creatorHash: "",
    creators: [],
    dataHash: "",
    delegate: "",
    description: "",
    enriched: false,
    files: {
        htmlFiles: [],
        images: [],
        videos: [],
    },
    frozen: false,
    grouping: [],
    htmlFile: "",
    id: "",
    image: "",
    interface: "",
    leafId: 0,
    mutable: false,
    name: "",
    owner: "",
    ownershipModel: "",
    royalty: null,
    seq: 0,
    symbol: "",
    thumbnail: "",
    tree: "",
    type: null,
    uri: "",

    ...asset,
});

export const BALANCE = (balance?: any): Balance => ({
    amount: 0,
    exchangeRate: {
        USD: null,
    },
    id: "",
    ...balance,
});

export const TRANSACTION = (transaction?: any): Transaction => ({
    accounts: [],
    actions: [],
    fee: 0,
    id: "",
    source: Source.UNKNOWN,
    timestamp: 0,
    type: "UNKNOWN",

    ...transaction,
});

export const TRANSACTION_ACTION = (action?: any) => ({
    actionType: "UNKNOWN",
    amount: 0,
    from: "",
    to: "",
    token: "",
    transferType: "native",

    ...action,
});

export const HELIUS_API_ENDPOINT = (endpoint: string, apiKey: string) =>
    "https://api.helius.xyz/" + endpoint + "/?api-key=" + apiKey;

export const HELIUS_RPC_ENDPOINT = (apiKey: string) =>
    "https://mainnet.helius-rpc.com/?api-key=" + apiKey;

// An amount sourced from gerMinimumBalanceForRentExemptMint + a little more.
// Used to filter out fees when parsing transactions. Adjust as needed.
export const MINIMUM_TRANSACTION_AMOUNT = 0.0021;

export const SOL = "So11111111111111111111111111111111111111112";

export const USDC = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export * from "./icons";
