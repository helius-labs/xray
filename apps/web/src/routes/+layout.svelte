<script lang="ts">
    import "../app.postcss";
    
    import { browser } from "$app/environment";
    
    import { setContext } from "svelte";

    import { createQueryContext } from "@helius-labs/xray-query";
    
    createQueryContext({
        setContext,
        browser,
    });
    
    // TODO: How to get the local storage persistor working in svelte.
    // import {
    //     QueryClient,
    //     QueryClientProvider,
    //     createWebStoragePersistor,
    //     persistQueryClient
    // } from "@sveltestack/svelte-query";

    import Nav from "$lib/components/nav.svelte";

// Create a client
    // const queryClient = new QueryClient({
    //     defaultOptions : {
    //         queries : {
    //             // 24 hours
    //             cacheTime            : 1000 * 60 * 60 * 24,
    //             enabled              : browser,
    //             refetchOnWindowFocus : false,
    //         },
    //     },
    // });

</script>
<!--
<QueryClientProvider client={queryClient}>
    <Nav />

    <main class="min-h-screen">
        <slot />
    </main>
</QueryClientProvider> -->

