import type { Router } from "$lib/trpc/router";
import type { QueryClient } from "@tanstack/svelte-query";

import { createTRPCClient, type TRPCClientInit } from "trpc-sveltekit";

import { httpBatchLink } from "@trpc/client";

import { svelteQueryWrapper } from "trpc-svelte-query-adapter";

let browserClient: ReturnType<typeof svelteQueryWrapper<Router>>;

export function trpcWithQuery(
    init?: TRPCClientInit,
    queryClient?: QueryClient
) {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser && browserClient) return browserClient;

    const client = svelteQueryWrapper<Router>({
        client: createTRPCClient<Router>({ init }),
        queryClient,
    });

    if (isBrowser) browserClient = client;

    return client;
}
