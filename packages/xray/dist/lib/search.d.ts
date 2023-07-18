import { Connection } from "@solana/web3.js";
export interface SearchResult {
    url: string;
    address: string;
    type: SearchResultType;
    valid: boolean;
    search: string;
}
type SearchResultType = "token" | "account" | "transaction" | "bonfida-domain" | "ans-domain" | "backpack-username" | null;
export declare const search: (query: string, connection: Connection) => Promise<SearchResult>;
export {};
