import type { Writable } from "svelte/store";

export type FormatterFunction = (data: any) => any;
export type LoadFunction = (args: any) => Promise<any>;

export interface QueryOptions {
    loader: (args: any) => Promise<any>;
    mutator?: (existingValue: any, args: any) => Promise<any>;
    id?: string;
    formatter?: FormatterFunction;
    refreshInterval?: number;
    retryLimit?: number;
    fetchOnFirstSubscription?: boolean;
}

export interface Query {
    id: string | string[];
    nextFetch: number;
    lastFetch: number;
    timesRetired: number;
    hasFetched: boolean;
    hasMutated: boolean;
    isLoading: boolean;
    isMutating: boolean;
    isSuccess: boolean;
    isError: boolean;
    error: string;
    data: any;
    load: () => any;
    mutate: (args: any) => any;
    formatter?: FormatterFunction;
}

export type QueryStore = Writable<Query>;

export type QueryMap = Map<string, QueryStore>;

export interface StateConfig {
    disable?: boolean;
    queries?: Record<string, QueryOptions>;
}

export interface StateContext {
    config: StateConfig;
    queries: QueryMap;
}

export const defaultQuery: Query = {
    data: {},
    error: "",
    formatter: () => null,
    hasFetched: false,
    hasMutated: false,
    id: "",
    isError: false,
    isLoading: false,
    isMutating: false,
    isSuccess: false,
    lastFetch: 0,
    load: () => null,
    mutate: (args: any) => args,
    nextFetch: 0,
    timesRetired: 0,
};
