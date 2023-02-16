<script lang="ts">
    import type { UITokenMetadata } from "$lib/types";
    import { state, type QueryStore } from "svelte-snacks";

    export let search:string;
    
    const solanaToken: QueryStore = state(["solanaToken", search], search);
    
    const tokenRegistry = state("solanaTokenRegistry");

    const metadata: UITokenMetadata = {
        address : "",
        attributes: [],
        collectionKey: "",
        creators: [],
        description: "",
        image: "",
        name: "",
    };

    $: tokenDetails = $tokenRegistry.data.get
        ? $tokenRegistry.data.get(search)
        : {};

    $: if (tokenDetails) {
        metadata.name = tokenDetails?.symbol;
        metadata.image = tokenDetails?.logoURI;
    } else {
        metadata.address = $solanaToken.data?.account;
        metadata.name = $solanaToken.data?.offChainMetadata?.metadata?.name;
        metadata.image = $solanaToken.data?.offChainMetadata?.metadata?.image;
        metadata.description = $solanaToken.data?.offChainMetadata?.metadata?.description;
        metadata.attributes = $solanaToken.data?.offChainMetadata?.metadata?.attributes;
        metadata.creators = $solanaToken.data?.onChainMetadata?.metadata?.data?.creators;
        metadata.collectionKey = $solanaToken.data?.onChainMetadata?.metadata?.collection?.key;
    }

    $: console.log("This is token", $solanaToken);
    $: console.log("This is attributes", $solanaToken.data);
    $: console.log("This is it's METADATA", metadata);
</script>

<slot {metadata} token={$solanaToken} />
