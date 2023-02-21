import type { Handle } from "@sveltejs/kit";

import { createTRPCHandle } from "trpc-sveltekit";

import { createContext } from "$lib/trpc/context";
import { router } from "$lib/trpc/router";

// TODO: figure our a good duration
// Can we have a dynamic duraction based on the route?
const ONE_DAY_IN_SECONDS = 60 * 60 * 24;

export const handle: Handle = createTRPCHandle({
    router,
    createContext,
    responseMeta({ type, errors }) {
        if (type === "query" && errors.length === 0) {
            return {
                headers: {
                    "cache-control": `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
                },
            };
        }
        return {};
    },
});
