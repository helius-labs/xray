<script lang="ts">
    import type { UITokenMetadata } from "$lib/types";
    import { SOL } from "@helius-labs/xray-proton";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    import IntersectionObserver from "svelte-intersection-observer";

    export let address: string;

    let intersecting = false;

    const client = trpcWithQuery($page);

    const token = client.token.createQuery([address], {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const metadata: UITokenMetadata = {
        address: "",
        attributes: [],
        collectionKey: "",
        creators: [],
        description: "",
        image: "",
        name: "",
    };

    const asset = client.asset.createQuery(address, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const price = client.price.createQuery(address, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    let element: HTMLDivElement;

    $: if (address === SOL) {
        metadata.name = "SOL";
        metadata.image = "/media/tokens/solana.png";
        metadata.address = SOL;
        metadata.price = $price?.data || 0;
    } else if ($asset?.data?.compressed) {
        const data = $asset?.data;
        metadata.address = data?.address || "";
        metadata.attributes = data?.attributes || [];
        metadata.creators = data?.creators || [];
        metadata.description = data?.description || "";
        metadata.collectionKey = data?.collectionKey || "";
        metadata.image = data?.image || "";
        metadata.name = data?.name || "";
    } else {
        // Kicks off the query
        const data = $token?.data?.length ? $token.data[0] : {};

        metadata.address = data?.account;
        metadata.attributes = data?.offChainMetadata?.metadata?.attributes;
        metadata.creators = data?.onChainMetadata?.metadata?.data?.creators;
        metadata.description = data?.offChainMetadata?.metadata?.description;
        metadata.collectionKey =
            data?.onChainMetadata?.metadata?.collection?.key;
        metadata.image =
            data?.offChainMetadata?.metadata?.image ||
            data?.onChainMetadata?.metadata?.data.image ||
            data?.legacyMetadata?.logoURI;
        metadata.name =
            data?.offChainMetadata?.metadata?.name ||
            data?.legacyMetadata?.name ||
            data?.onChainMetadata?.metadata?.data.name;
        metadata.price = $price?.data || 0;
    }

    $: tokenIsLoading = address !== SOL && $token.isLoading;
    $: tokenFailed = $token.isError;

    // This could be better
    $: isNFT = metadata?.attributes && metadata?.attributes?.length > 0;
</script>

<div>
    <IntersectionObserver
        once={true}
        {element}
        bind:intersecting
    >
        <div bind:this={element} />

        {#if intersecting}
            <slot
                {metadata}
                {tokenIsLoading}
                {tokenFailed}
                {isNFT}
            />
        {/if}
    </IntersectionObserver>
</div>
