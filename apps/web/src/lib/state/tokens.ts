import { writable } from "svelte/store";
import { fetchJson } from "$lib/util/fetch";

import type { TokenInfo } from "@solana/spl-token-registry";

import type { FetchModel, Dict } from "$lib/types";

const tokens = writable<FetchModel<Dict<TokenInfo>>>();

const updateTokensMap = async () => {
    try {
        tokens.set({
            data: new Map(),
            isLoading: true,
        });

        // Get whole list
        const tokenResponse = await fetchJson<Dict<TokenInfo>>(
            "/tokenlist.json"
        );

        tokens.set({
            data: new Map(tokenResponse),
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
