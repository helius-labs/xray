<script lang="ts">
    import { onMount } from "svelte";
    import type { UITokenMetadata } from "$lib/types";
    import { state, type QueryStore } from "svelte-snacks";

    export let search: string = "";

    const solanaToken: QueryStore = state(["solanaToken", search], search);

    const tokenRegistry = state("solanaTokenRegistry");

    const metadata: UITokenMetadata = {
        address: "",
        attributes: [],
        collectionKey: "",
        creators: [],
        description: "",
        image: "",
        name: "",
    };

    let isReady = false;

    $: tokenDetails = $tokenRegistry.data.get
        ? $tokenRegistry.data.get(search)
        : {};

    $: if (isReady) {
        if (tokenDetails) {
            metadata.name = tokenDetails?.symbol;
            metadata.image = tokenDetails?.logoURI;
        } else {
            metadata.address = $solanaToken.data?.account;
            metadata.name = $solanaToken.data?.offChainMetadata?.metadata?.name;
            metadata.image =
                $solanaToken.data?.offChainMetadata?.metadata?.image;
            metadata.description =
                $solanaToken.data?.offChainMetadata?.metadata?.description;
            metadata.attributes =
                $solanaToken.data?.offChainMetadata?.metadata?.attributes;
            metadata.creators =
                $solanaToken.data?.onChainMetadata?.metadata?.data?.creators;
            metadata.collectionKey =
                $solanaToken.data?.onChainMetadata?.metadata?.collection?.key;
        }
    }

    onMount(() => {
        isReady = true;
    });
</script>

<slot
    {metadata}
    token={$solanaToken}
/>
