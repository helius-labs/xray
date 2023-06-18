import type { Router } from "$lib/trpc/router";

import type { QueryClient } from "@tanstack/svelte-query";

import { createTRPCClient, type TRPCClientInit } from "trpc-sveltekit";

import { svelteQueryWrapper } from "trpc-svelte-query-adapter";

let browserClient: ReturnType<typeof svelteQueryWrapper<Router>>;

export function trpc(init?: TRPCClientInit) {
    const isBrowser = typeof window !== "undefined";
    if (isBrowser && browserClient) return browserClient;
    const client = createTRPCClient<Router>({ init });
    // @ts-ignore
    if (isBrowser) browserClient = client;
    return client;
}

export function trpcWithQuery(
    init?: TRPCClientInit,
    queryClient?: QueryClient
) {
    const isBrowser = typeof window !== "undefined";

    if (isBrowser && browserClient) return browserClient;

    const trpc = createTRPCClient<Router>({ init });

    const client = svelteQueryWrapper<Router>({
        client: trpc,
        queryClient,
    });

    if (isBrowser) browserClient = client;

    return client;
}
