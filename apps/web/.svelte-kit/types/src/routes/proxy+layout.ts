// @ts-nocheck
import type { LayoutLoad } from "./$types";

import { browser } from "$app/environment";
import { QueryClient } from "@tanstack/svelte-query";

export const ssr = false;

export const load = async () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                enabled: browser,
            },
        },
    });

    return { queryClient };
};
;null as any as LayoutLoad;