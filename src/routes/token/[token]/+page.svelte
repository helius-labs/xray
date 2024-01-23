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
        max-height: 55vh;
    }
</style>

<script lang="ts">
    import { page } from "$app/stores";
    import basisPointsToPercentage from "$lib/util/percentage";
    import shortenString from "$lib/util/shorten-string";
    import { cubicOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";

    import Collapse from "$lib/components/collapse.svelte";
    import JSON from "$lib/components/json.svelte";
    import Transactions from "$lib/components/transactions.svelte";

    import PageLoader from "./_loader.svelte";

    import CopyButton from "$lib/components/copy-button.svelte";
    import TokenProvider from "$lib/components/providers/token-provider.svelte";

    import getMimeType from "$lib/util/get-mime-type";
    import { metadataStore } from "$lib/util/stores/metadata";
    import type { UITokenMetadata } from "$lib/types";

    import { formatKey, formatObject } from "$lib/util/format-object";

    const address = $page.params.token;
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";

    let metadata: UITokenMetadata;

    let mediaUrl: string | null = null;
    let mediaType: string | null = null;

    const setMedia = async (metadata: UITokenMetadata) => {
        if (metadata.image) {
            const mimeType = await getMimeType(metadata.image);
            if (mimeType && mimeType.startsWith("video/")) {
                mediaUrl = metadata.image;
                mediaType = "video";
                return;
            }

            if (metadata.video_uri) {
                mediaUrl = metadata.video_uri;
                mediaType = "video";
                return;
            }

            if (metadata.image) {
                mediaUrl = metadata.image;
                mediaType = "image";
            }
        }
    };

    metadataStore.subscribe((metadata) => {
        if (metadata) setMedia(metadata);
    });

    $: if (metadata) {
        metadataStore.set(metadata);
    }

    $: formattedMintExtensions = metadata?.mintExtensions
        ? formatObject(metadata.mintExtensions)
        : "";
</script>

<TokenProvider
    {address}
    bind:metadata
    let:tokenIsLoading
>
    {#if tokenIsLoading}
        <div class="content">
            <PageLoader />
        </div>
    {:else}
        <div class="nav content sticky top-14 z-30 bg-base-100 px-3 py-2">
            <div
                class="relative flex flex-wrap items-center justify-between bg-base-100"
            >
                <div>
                    <h3 class="m-0 text-xl font-bold md:text-3xl">
                        {metadata.name}
                    </h3>
                </div>

                <div>
                    <div class="flex items-center space-x-2">
                        {#if metadata.image}
                            <a
                                href={metadata.image}
                                target="_blank"
                                class="btn-sm btn border-0 bg-black"
                            >
                                View Media
                            </a>
                        {/if}
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
                {#if mediaType === "video"}
                    <!-- Video tag -->
                    <div class="relative">
                        <video
                            class="m-auto my-3 h-auto w-full rounded-md object-contain"
                            controls
                            autoplay
                            loop
                            muted
                            in:fade={{ delay: 600, duration: 1000 }}
                            src={mediaUrl}
                        />
                    </div>
                {:else if mediaType === "image"}
                    <!-- Image tag -->
                    <div class="relative">
                        <img
                            class="img m-auto my-3 h-auto w-full rounded-md object-contain"
                            alt="token symbol"
                            src={mediaUrl}
                            in:fade={{ delay: 600, duration: 1000 }}
                        />
                    </div>
                {:else}
                    <!--Loading-->
                    <div>Loading...</div>
                {/if}
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
                            {metadata.name ?? "The"} creator(s) currently expect
                            to take {basisPointsToPercentage(
                                metadata.sellerFeeBasisPoints
                            )} of every secondary sale on this piece.
                        </p>
                    </Collapse>
                </div>
            {/if}
            {#if metadata.owner}
                <div
                    class="mt-3"
                    in:fly={{ delay: 300, easing: cubicOut, y: 50 }}
                >
                    <Collapse
                        sectionTitle="Ownership"
                        iconId="key"
                    >
                        <div class="flex flex-wrap gap-2">
                            <a
                                class="card p-0"
                                href="/account/{metadata.owner}?network={isMainnetValue
                                    ? 'mainnet'
                                    : 'devnet'}"
                            >
                                <header
                                    class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                >
                                    <h4>Owner</h4>
                                </header>
                                <p class="text-sm">
                                    {shortenString(metadata.owner)}
                                </p>
                            </a>
                            <div class="card p-0">
                                <h4
                                    class="text-sm font-medium uppercase text-gray-500"
                                >
                                    Mutable
                                </h4>
                                <p class="text-sm">
                                    {metadata.mutable ? "true" : "false"}
                                </p>
                            </div>
                            <div class="card p-0">
                                <h4
                                    class="text-sm font-medium uppercase text-gray-500"
                                >
                                    Frozen
                                </h4>
                                <p class="text-sm">
                                    {metadata.frozen ? "true" : "false"}
                                </p>
                            </div>
                            {#if metadata.delegate}
                                <a
                                    class="card p-0"
                                    href="/account/{metadata.owner}?network={isMainnetValue
                                        ? 'mainnet'
                                        : 'devnet'}"
                                >
                                    <header
                                        class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                    >
                                        <h4>Delegate</h4>
                                    </header>
                                    <p class="text-sm">
                                        {shortenString(metadata.delegate)}
                                    </p>
                                </a>
                            {:else}
                                <div class="card p-0">
                                    <h4
                                        class="text-sm font-medium uppercase text-gray-500"
                                    >
                                        Delegate
                                    </h4>
                                    <p class="text-sm">false</p>
                                </div>
                            {/if}
                        </div>
                    </Collapse>
                </div>
            {/if}
            {#if metadata.creators && metadata.creators.length > 0}
                <div
                    class="mt-3"
                    in:fly={{
                        delay: 300,
                        easing: cubicOut,
                        y: 50,
                    }}
                >
                    <Collapse
                        sectionTitle="Creators"
                        sectionAditionalInfo={metadata.creators.length}
                        iconId="creator"
                    >
                        <div class="flex flex-wrap gap-2">
                            {#each metadata.creators as creator, idx}
                                <a
                                    class="card p-0"
                                    href="/account/{creator.address}?network={isMainnetValue
                                        ? 'mainnet'
                                        : 'devnet'}"
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
            {#if metadata.compressed}
                <div
                    class="mt-3"
                    in:fly={{
                        delay: 300,
                        easing: cubicOut,
                        y: 50,
                    }}
                >
                    <Collapse
                        sectionTitle="Compression"
                        iconId="tree"
                    >
                        <div class="flex flex-wrap gap-2">
                            <a
                                class="card p-0"
                                href="/account/{metadata.tree}/concurrent-merkle-tree?network={isMainnetValue
                                    ? 'mainnet'
                                    : 'devnet'}"
                            >
                                <header
                                    class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                >
                                    <h4>Tree ID</h4>
                                </header>
                                <p class="text-sm">
                                    {shortenString(metadata.tree)}
                                </p>
                            </a>
                            <div class="flex flex-wrap gap-2">
                                <div class="card p-0">
                                    <h4
                                        class="text-sm font-medium uppercase text-gray-500"
                                    >
                                        Sequence
                                    </h4>
                                    <p class="text-sm">
                                        {metadata.seq?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <div class="card p-0">
                                    <h4
                                        class="text-sm font-medium uppercase text-gray-500"
                                    >
                                        Leaf ID
                                    </h4>
                                    <p class="text-sm">
                                        {metadata.leafId?.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <div class="card p-0">
                                    <h4
                                        class="text-sm font-medium uppercase text-gray-500"
                                    >
                                        Data Hash
                                    </h4>
                                    <p class="text-sm">
                                        {metadata.dataHash}
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <div class="card p-0">
                                    <h4
                                        class="text-sm font-medium uppercase text-gray-500"
                                    >
                                        Asset Hash
                                    </h4>
                                    <p class="text-sm">
                                        {metadata.assetHash}
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-wrap gap-2">
                                <div class="card p-0">
                                    <h4
                                        class="text-sm font-medium uppercase text-gray-500"
                                    >
                                        Creator Hash
                                    </h4>
                                    <p class="text-sm">
                                        {metadata.creatorHash}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Collapse>
                </div>
            {/if}

            <div class="mb-6 mt-6">
                <Collapse
                    sectionTitle="JSON Metadata"
                    iconId="json"
                    showDetails={false}
                >
                    <JSON
                        data={metadata}
                        label="token"
                    />
                </Collapse>
            </div>

            {#if formattedMintExtensions}
                <div class="mb-6 mt-6">
                    <Collapse
                        sectionTitle="Mint Extensions"
                        iconId="codeFork"
                        showDetails={false}
                    >
                        <div
                            class="overflow-x-auto whitespace-pre-wrap text-sm"
                        >
                            {@html formattedMintExtensions}
                        </div>
                    </Collapse>
                </div>
            {/if}

            {#key metadata.compressed}
                <div class="mt-3 pl-2 md:pl-0">
                    <Transactions
                        account={address}
                        compressed={metadata.compressed}
                    />
                </div>
            {/key}
        </div>
    {/if}
</TokenProvider>
