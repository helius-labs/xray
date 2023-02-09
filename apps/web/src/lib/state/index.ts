import {
    getContext,
} from "svelte";

import type {
    QueryStore,
} from "./types";

export * from "./types";

export {
    default as queries,
} from "./queries";

export const appName = `[xray-query]`;

export {
    default as QueryProvider,
} from "./provider.svelte";

export default (id:string):QueryStore => getContext(`${appName}::${id}`);
