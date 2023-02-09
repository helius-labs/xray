import type { Writable } from "svelte/store";

// eslint-disable-next-line no-unused-vars
export type FormatterFunction = (data: any) => any | Promise<any>;
export type LoadFunction = (...args:any) => Promise<any>;

export interface QueryOptions {
    loader: LoadFunction,
    id?: string,
    formatter?: FormatterFunction,
    refreshInterval?: number,
    retryLimit?: number,
    fetchOnFirstSubscription?: boolean,
}

export type Queries = Record<string, QueryOptions>;

export interface QueryProviderOptions {
    disable?: boolean,
    contextKey?: string,
}

export interface Query {
    id: string,
    nextFetch: number,
    lastFetch: number,
    timesRetired: number,
    hasFetched: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    error: string,
    data: any,
    load: LoadFunction | null,
    formatter?: FormatterFunction | null,
}

export type QueryStore = Writable<Query>;
export type QueryContext = Map<string, QueryStore>;

export const defaultQuery:Query = {
    id           : "",
    nextFetch    : 0,
    lastFetch    : 0,
    timesRetired : 0,
    hasFetched   : false,
    isLoading    : false,
    isError      : false,
    isSuccess    : false,
    error        : "",
    data         : {},
    load         : null,
    formatter    : null,
};
