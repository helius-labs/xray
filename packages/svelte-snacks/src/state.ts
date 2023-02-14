/* eslint-disable max-statements */
import { getContext } from "svelte";

import {
    defaultQuery,
    type Query,
    type QueryOptions,
    type QueryStore,
    type StateContext,
} from "./types";

import { contextKey } from "./config";

import { get, writable, type Writable } from "svelte/store";

export * from "./types";

const context = (): StateContext => get(getContext(contextKey));

export const state = (idInput: string | string[], args?: any): QueryStore => {
    const contextValue = context();

    if (!contextValue) {
        throw new Error(
            `No context found. Did you forget to wrap your app in <SnackProvider>?`
        );
    }

    const { config = {}, queries = new Map() } = context();

    let name = idInput;
    let id = idInput;

    if (typeof idInput !== `string`) {
        name = idInput[0];
        id = idInput.join(`-`);
    }

    // TODO
    // @ts-ignore
    const hasConfig = config.queries ? config.queries[name] : null;
    const hasStore = queries.has(id);

    // If disabled, get out, return defaults, don't fetch anything.
    if (config.disable) {
        return writable(defaultQuery);
    }

    if (!hasConfig) {
        // eslint-disable-next-line no-console
        console.log(id, `ERROR`, {
            args,
            value: get(queries.get(id)),
        });

        return writable(defaultQuery);
    }

    if (hasStore) {
        return queries.get(id) as QueryStore;
    }

    // TODO: this is to make ts happy but existense of config.queries[id] is already checked above
    const queryOptions = config.queries
        ? config.queries[name]
        : ({} as QueryOptions);

    const loadQuery = async (store: any) => {
        // Is loading
        store.update((existing: Query) => ({
            ...existing,
            hasFetched: false,
            isLoading: true,
            isSuccess: false,
        }));

        try {
            let data = await queryOptions.loader(args);

            if (queryOptions.formatter) {
                data = await queryOptions.formatter(data);
            }

            // Is success
            store.update((existing: Query) => ({
                ...existing,
                data,
                hasFetched: true,
                isLoading: false,
                isSuccess: true,
                lastFetch: Date.now(),
            }));
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`ERROR`, id, args);

            // Is error
            store.update((existing: Query) => ({
                ...existing,
                error: String(error),
                hasFetched: true,
                isError: true,
                isLoading: false,
            }));
        }
    };

    const newQueryStore: Writable<Query> = writable<Query>(
        defaultQuery,
        (set) => {
            loadQuery(newQueryStore);

            set({
                ...get(newQueryStore),
                id,
                load: () => loadQuery(newQueryStore),
            });

            queries.set(id, newQueryStore);

            return () => {
                // eslint-disable-next-line no-console
                console.log(id, `UNSUBSCRIBED`);
            };
        }
    );

    queries.set(id, newQueryStore);

    return newQueryStore;
};
