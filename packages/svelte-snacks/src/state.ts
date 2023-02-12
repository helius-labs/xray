/* eslint-disable max-statements */
import { getContext } from "svelte";

import {
    type QueryStore,
    type StateContext,
    type QueryOptions,
    
    defaultQuery
} from "./types";

import {
    contextKey,
} from "./config";

import {
    writable,
    get
} from "svelte/store";

const context = ():StateContext => get(getContext(contextKey));

export const state = (idInput:string | string[], args?:any):QueryStore => {
    const contextValue = context();

    if(!contextValue) {
        throw new Error(`No context found. Did you forget to wrap your app in <SnackProvider>?`);
    }

    const {
        config = {},
        queries = new Map(),
    } = context();

    let name = idInput;
    let id = idInput;

    if(typeof idInput !== `string`) {
        name = idInput[0];
        id = idInput.join(`-`);
    }

    // TODO
    // @ts-ignore
    const hasConfig = config.queries ? config.queries[name] : null;
    const hasStore = queries.has(id);

    // If disabled, get out, return defaults, don't fetch anything.
    if(config.disable) {
        return writable(defaultQuery);
    }

    if(!hasConfig) {
        // eslint-disable-next-line no-console
        console.log(id, `ERROR`, {
            args,
            value : get(queries.get(id)),
        });
        
        return writable(defaultQuery);
    }

    if(hasStore) {
        return queries.get(id) as QueryStore;
    }

    // eslint-disable-next-line no-console
    console.log(id, `CREATING`);

    // TODO: this is to make ts happy but existense of config.queries[id] is already checked above
    // @ts-ignore
    const queryOptions = config.queries ? config.queries[name] : {} as QueryOptions;

    const newQueryStore:QueryStore = writable({
        ...defaultQuery,
        id,
        load : async () => {
            // eslint-disable-next-line no-console
            console.log(id, `LOADING`, {
                args,
                value : get(queries.get(id)),
            });

            // Is loading
            newQueryStore.update((existing) => ({
                ...existing,
                isLoading  : true,
                isSuccess  : false,
                hasFetched : false,
            }));

            try {
                let data = await queryOptions.loader(args);

                if(queryOptions.formatter) {
                    data = await queryOptions.formatter(data);
                }

                // eslint-disable-next-line no-console
                console.log(id, `SUCCESS`, {
                    args,
                    value    : get(queries.get(id)),
                    response : data,
                });

                // Is success
                newQueryStore.update((existing) => ({
                    ...existing,
                    isLoading  : false,
                    isSuccess  : true,
                    hasFetched : true,
                    lastFetch  : Date.now(),
                    data,
                }));
            } catch(error) {
                // eslint-disable-next-line no-console
                console.log(`ERROR`, id, args);

                // Is error
                newQueryStore.update((existing) => ({
                    ...existing,
                    isLoading  : false,
                    isError    : true,
                    hasFetched : true,
                    error      : String(error),
                }));
            }
        },
    });

    queries.set(id, newQueryStore);

    return newQueryStore;
};

