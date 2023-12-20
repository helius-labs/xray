import { isValidPublicKey } from "../index";

import type { Connection } from "@solana/web3.js";

import { PublicKey } from "@solana/web3.js";

import { TldParser } from "@onsol/tldparser";
import { browser } from "$app/environment";

import getJupiterTokens from "$lib/util/get-tokens";

export interface SearchResult {
    url: string;
    address: string;
    type: SearchResultType;
    valid: boolean;
    search: string;
}

type SearchResultType =
    | "token"
    | "account"
    | "transaction"
    | "bonfida-domain"
    | "ans-domain"
    | null;

const searchDefaults: SearchResult = {
    address: "",
    search: "",
    type: null,
    url: `/`,
    valid: false,
};

export const search = async (
    query: string,
    connection: Connection
): Promise<SearchResult> => {
    const ans = new TldParser(connection);
    // If it's long, assume it's a tx.
    // They will present with an error on the tx page if it's not.
    const probablyTransactionSignature = query.length > 50;
    const probablyBonfidaName = query.length > 4 && query.slice(-4) === ".sol";
    const probablyAnsDomain = query.length > 4 && query.includes(".");
    let network;
    let params;
    if (browser) {
        params = new URLSearchParams(window.location.search);
        network = params.get("network");
    } else {
        // handle server-side logic, or set a default value
        network = "mainnet";
    }

    // For token symbols
    const tokenSymbols = await getJupiterTokens();

    if (isValidPublicKey(query)) {
        const pubkey = new PublicKey(query);
        const account = await connection.getParsedAccountInfo(pubkey);
        // TODO Property 'program' does not exist on type 'Buffer | ParsedAccountData'.
        // @ts-ignore
        const program = account?.value?.data?.program;
        // @ts-ignore
        const parsedType = account?.value?.data?.parsed?.type;

        /*
         * spl-token      -> spl token
         * spl-token-2022 -> token 2022
         * null           -> compressed nft
         */
        const probablyToken =
            program === "spl-token" ||
            program === "spl-token-2022" ||
            account?.value === null;

        let addressType!: "token" | "account";
        if (probablyToken) {
            addressType = parsedType === "account" ? "account" : "token";
        }
        addressType ??= "account";

        return {
            address: query,
            search: query,
            type: addressType,
            url: `/${addressType}/${query}`,
            valid: true,
        };
    } else if (probablyTransactionSignature) {
        return {
            address: query,
            search: query,
            type: "transaction",
            url: `/tx/${query}`,
            valid: true,
        };
    } else if (probablyBonfidaName) {
        try {
            const resonse = await fetch(
                `https://sns-sdk-proxy.bonfida.workers.dev/resolve/${query?.toLowerCase()}`
            );

            const { result = "" } = await resonse.json();

            return {
                address: result,
                search: query,
                type: "bonfida-domain",
                url: `/account/${result}`,
                valid: true,
            };
        } catch (error) {
            return searchDefaults;
        }
    } else if (probablyAnsDomain) {
        const owner = await ans.getOwnerFromDomainTld(query);

        if (!owner) {
            return searchDefaults;
        }

        return {
            address: owner.toBase58(),
            search: query,
            type: "ans-domain",
            url: `/account/${owner}`,
            valid: true,
        };
    } else if (Object.keys(tokenSymbols).find((key) => key === query)) {
        return {
            address: tokenSymbols[query],
            search: query,
            type: "token",
            url: `/token/${tokenSymbols[query]}`,
            valid: true,
        };
    }

    return searchDefaults;
};
