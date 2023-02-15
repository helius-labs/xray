<script lang="ts">
    import type { UITokenMetadata } from "$lib/types";
    import {
        state,
        type QueryStore
    } from "svelte-snacks";

    export let token;

    const address = token?.mint || "unknown";

    const solanaToken:QueryStore = state([ "solanaToken", address ], address);

    const tokenRegistry = state("solanaTokenRegistry");

    const metadata:UITokenMetadata = {
        address,
        attributes  : [],
        description : "",
        image       : "",
        name        : "",
    };
        
    $: tokenDetails = $tokenRegistry.data.get ? $tokenRegistry.data.get(address) : {};

    $: if(tokenDetails) {
        metadata.name = tokenDetails?.symbol;
        metadata.image = tokenDetails?.logoURI;
    } else {
        metadata.name = $solanaToken.data?.offChainData?.name;
        metadata.image = $solanaToken.data?.offChainData?.image;
        metadata.description = $solanaToken.data?.offChainData?.description;
        metadata.attributes = $solanaToken.data?.offChainData?.attributes;
    }

    $: console.log("This is your token", metadata);
</script>

<slot {metadata}></slot>
