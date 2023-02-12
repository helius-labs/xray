import type { Writable } from "svelte/store";

export type FormatterFunction = (data: any) => any;
export type LoadFunction = (args:any) => Promise<any>;

export interface QueryOptions {
    loader: LoadFunction,
    id?: string,
    formatter?: FormatterFunction,
    refreshInterval?: number,
    retryLimit?: number,
    fetchOnFirstSubscription?: boolean,
}

export interface Query {
    id: string | string[],
    nextFetch: number,
    lastFetch: number,
    timesRetired: number,
    hasFetched: boolean,
    isLoading: boolean,
    isSuccess: boolean,
    isError: boolean,
    error: string,
    data: any,
    load: () => any,
    formatter?: FormatterFunction,
}

export type QueryStore = Writable<Query>;

export type QueryMap = Map<string, QueryStore>;

export interface StateConfig {
    disable?: boolean,
    queries?: Record<string, QueryOptions>,
}

export interface StateContext {
    config: StateConfig,
    queries: QueryMap,
}

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
    load         : () => null,
    formatter    : null,
};
