import { writable } from "svelte/store";
import { fetchJson } from "$lib/util/fetch";
import type { TokenInfo, TokenList } from "@solana/spl-token-registry";

import type { FetchModel, Dict } from "$lib/types";

const tokens = writable<FetchModel<Dict<TokenInfo>>>();

const updateTokensMap = async () => {
    try {
        tokens.set({
            data: new Map(),
            isLoading: true,
        });

        // Get whole list
        const tokenResponse = await fetchJson<TokenList>("/api/token-list");

        // Filter + contruct map
        const data = tokenResponse.tokens.reduce<Dict<TokenInfo>>(
            (map, token) => {
                // Not Mainnet
                if (token.chainId !== 101) return map;

                map.set(token.address, token);

                return map;
            },
            new Map()
        );

        tokens.set({
            data,
            hasFetched: true,
            isLoading: false,
        });
    } catch (error: any) {
        tokens.set({
            data: new Map(),
            error: error.message,
            hasFetched: true,
            isLoading: false,
        });
    }
};

export { tokens, updateTokensMap };
