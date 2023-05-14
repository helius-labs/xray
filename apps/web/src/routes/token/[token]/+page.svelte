<style>
    .nav::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 100%;
        width: 100vw;
        transform: translate(-50%, 0);
        background-color: black;
    }

    .img {
        max-height: 25vh;
    }
</style>

<script lang="ts">
    import { page } from "$app/stores";
    import shortenString from "$lib/util/shorten-string";
    import basisPointsToPercentage from "$lib/util/percentage";
    import { cubicOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";

    import Collapse from "$lib/components/collapse.svelte";
    import JSON from "$lib/components/json.svelte";
    import Transactions from "$lib/components/transactions.svelte";

    import PageLoader from "./_loader.svelte";

    import CopyButton from "$lib/components/copy-button.svelte";
    import TokenProvider from "$lib/components/providers/token-provider.svelte";

    const address = $page.params.token;
</script>

<TokenProvider
    {address}
    let:metadata
    let:tokenIsLoading
>
    {#if tokenIsLoading}
        <div class="content">
            <PageLoader />
        </div>
    {:else}
        <div class="nav content sticky top-14 z-30 bg-base-100 py-2 px-3">
            <div
                class="relative flex  flex-wrap items-center justify-between bg-base-100"
            >
                <div>
                    <h3 class="m-0 text-xl font-bold md:text-3xl">
                        {metadata.name}
                    </h3>
                </div>

                <div>
                    <div class="my-2">
                        <CopyButton text={$page.params.search} />
                        <CopyButton
                            text={$page.url.href}
                            icon="link"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div class="content px-3">
            <div
                class="flex flex-col items-center justify-center"
                in:fade={{ delay: 100, duration: 800 }}
            >
                <img
                    class="img m-auto my-3 h-auto w-full rounded-md object-contain"
                    alt="token symbol"
                    src={metadata.image}
                    in:fade={{ delay: 600, duration: 1000 }}
                />
            </div>

            {#if metadata.description}
                <div class="mt-3">
                    <div
                        class="mt-3"
                        in:fly={{
                            delay: 100,
                            easing: cubicOut,
                            y: 50,
                        }}
                    >
                        <Collapse
                            sectionTitle="Description"
                            iconId="person"
                            showDetails={true}
                        >
                            <p>{metadata.description}</p>
                        </Collapse>
                    </div>
                    {#if metadata.collectionKey}
                        <TokenProvider
                            address={metadata.collectionKey}
                            let:metadata
                        >
                            {#if metadata.name}
                                <div
                                    class="mt-3"
                                    in:fly={{
                                        delay: 200,
                                        easing: cubicOut,
                                        y: 50,
                                    }}
                                >
                                    <Collapse
                                        sectionTitle="Collection"
                                        iconId="collection"
                                        showDetails={true}
                                    >
                                        <p>
                                            {metadata.name
                                                ? metadata.name
                                                : "Unknown"}
                                        </p>
                                    </Collapse>
                                </div>
                            {/if}
                        </TokenProvider>
                    {/if}
                </div>
            {/if}
            {#if metadata.attributes && metadata.attributes.length}
                <div
                    class="mt-3"
                    in:fly={{
                        delay: 300,
                        easing: cubicOut,
                        y: 50,
                    }}
                >
                    <Collapse
                        sectionTitle="Properties"
                        iconId="attributes"
                        showDetails
                    >
                        <div class="flex flex-wrap gap-2">
                            {#each metadata.attributes as attribute, idx}
                                <div class="card p-0">
                                    <h4
                                        class="text-sm font-medium uppercase text-gray-500"
                                    >
                                        {attribute.trait_type ||
                                            attribute.traitType}
                                    </h4>
                                    <p class="text-sm">
                                        {attribute.value}
                                    </p>
                                </div>
                            {/each}
                        </div>
                    </Collapse>
                </div>
            {/if}

            {#if metadata.sellerFeeBasisPoints}
                <div
                    class="mt-3"
                    in:fly={{
                        delay: 300,
                        easing: cubicOut,
                        y: 50,
                    }}
                >
                    <Collapse
                        sectionTitle="Creator Royalties"
                        sectionAditionalInfo={basisPointsToPercentage(
                            metadata.sellerFeeBasisPoints
                        )}
                        iconId="percentage"
                    >
                        <p>
                            {metadata.name ?? "The"} creator(s) currently expect to take {basisPointsToPercentage(
                                metadata.sellerFeeBasisPoints
                            )} of every secondary sale on this piece.
                        </p>
                    </Collapse>
                </div>
            {/if}

            {#if metadata.creators && metadata.creators.length > 0}
                <div class="mt-3" in:fly={{
                    delay: 300,
                    easing: cubicOut,
                    y: 50,
                }}>
                    <Collapse
                        sectionTitle="Creators"
                        sectionAditionalInfo={metadata.creators.length}
                        iconId="creator"
                    >
                        <div class="flex flex-wrap gap-2">
                            {#each metadata.creators as creator, idx}
                                <a
                                    class="card p-0"
                                    href="/account/{creator.address}"
                                >
                                    <header
                                        class="flex items-center justify-between gap-6 text-sm font-medium text-gray-500"
                                    >
                                        <h4>
                                            CREATOR {idx + 1}
                                        </h4>
                                        <abbr
                                            title={`Creator ${
                                                idx + 1
                                            } royalties percentage`}
                                        >
                                            <h4>
                                                {creator.share}%
                                            </h4>
                                        </abbr>
                                    </header>
                                    <p class="text-sm">
                                        {shortenString(creator.address)}
                                    </p>
                                </a>
                            {/each}
                        </div>
                    </Collapse>
                </div>
            {/if}
            <div class="mt-3 pl-2 md:pl-0">
                <Transactions account={address} />
            </div>
            <div class="mt-3">
                <JSON
                    data={metadata}
                    label="token"
                />
            </div>
        </div>
    {/if}
</TokenProvider>
