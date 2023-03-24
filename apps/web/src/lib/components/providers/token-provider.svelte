<script lang="ts">
    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    import IntersectionObserver from "svelte-intersection-observer";

    export let address: string;

    let intersecting = false;

    const client = trpcWithQuery($page);

    const tokenMetadata = client.token.createQuery([address], {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
    
    $: metadata = {...$tokenMetadata?.data?.metadata};

    let element: HTMLDivElement;

    $: tokenIsLoading = !$tokenMetadata?.data?.isSOL && $tokenMetadata.isLoading;
    $: tokenFailed = $tokenMetadata.isError;

    // This could be better
    $: isNFT = $tokenMetadata?.data?.isNFT ? true : false;
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