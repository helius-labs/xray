<script lang="ts">
    import {
        type QueryStore,
        type Query,
        appName,
        defaultQuery,
    } from "$lib/state";

    import {
        writable
    } from "svelte/store";

    import {
        setContext,
    } from "svelte";

    import queries from "./queries";

    // eslint-disable-next-line no-console
    console.log(appName, `Initializing`);

    Object.entries(queries).forEach(([ id, {
        loader = () => new Promise((r) => r({})),
        formatter = null,
        fetchOnFirstSubscription = false,
    }]) => {
        // eslint-disable-next-line no-console
        console.log(appName, `Registering query ${id}`);

        if(!loader) {
            // eslint-disable-next-line no-console
            console.warn(appName, `No loader provided for query ${id}`);

            return;
        }

        const queryStore:QueryStore = writable<Query>({
            ...defaultQuery,

            id,

            load : (...args:any) => loader(args)
                .then(async (data:any) => {
                    let formatted = data;
                    
                    if(formatter) {
                        formatted = await formatter(data);
                    }

                    queryStore.set({
                        ...defaultQuery,
                        isLoading  : false,
                        isSuccess  : true,
                        hasFetched : true,
                        data       : formatted,
                    });
                })
                .catch((error:any) => queryStore.set({
                    ...defaultQuery,
                    isLoading  : false,
                    isError    : true,
                    isSuccess  : false,
                    hasFetched : true,
                    error      : String(error),
                })),
        },  (set) => {
            if(fetchOnFirstSubscription) {
                loader()
                    .then(async (data:any) => {
                        let formatted = data;
    
                        if(formatter) {
                            formatted = await formatter(data);
                        }
    
                        set({
                            ...defaultQuery,
                            isLoading : false,
                            data      : formatted,
                        });
                    })
                    .catch((error:any) => set({
                        ...defaultQuery,
                        isLoading : false,
                        isError   : true,
                        error     : String(error),
                    }));
            }
        });

        setContext(`${appName}::${id}`, queryStore);
    });
</script>

<slot></slot>
