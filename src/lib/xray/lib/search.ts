import { isValidPublicKey } from "../index";

import type { Connection } from "@solana/web3.js";

import { PublicKey } from "@solana/web3.js";

import { TldParser } from "@onsol/tldparser";
import { browser } from "$app/environment";

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
    | "backpack-username"
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
    const isMainnetValue = network !== "devnet";
    const probablyBackpackName = query.startsWith("@") && query.length > 1;
    if (isValidPublicKey(query)) {
        const pubkey = new PublicKey(query);
        const account = await connection.getParsedAccountInfo(pubkey);

        // TODO Property 'program' does not exist on type 'Buffer | ParsedAccountData'.
        /*
         * spl-token      -> spl token
         * spl-token-2022 -> token 2022
         * null           -> compressed nft
         */
        const isToken =
            // @ts-ignore
            account?.value?.data?.program === "spl-token" ||
            // @ts-ignore
            account?.value?.data?.program === "spl-token-2022" ||
            account?.value === null;

        const addressType = isToken ? "token" : "account";

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
    } else if (probablyBackpackName) {
        const username = query?.slice(1)?.toLowerCase();

        const url = `https://backpack-api.xnfts.dev/users/primarySolPubkey/${username}`;

        const response = await fetch(url);

        const { publicKey = "" } = await response.json();

        if (!publicKey) {
            return searchDefaults;
        }

        return {
            address: query || "",
            search: query,
            type: "backpack-username",
            url: `/account/${publicKey}`,
            valid: true,
        };
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
    }

    return searchDefaults;
};
