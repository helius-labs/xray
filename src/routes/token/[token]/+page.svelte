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
        max-height: 65vh;
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

    const address = $page.params.token;

    let mimeType: string | null = null;
    let loadingMimeType: boolean = true;

    metadataStore.subscribe((value) => {
        if (value && value.image) {
            loadingMimeType = true;
            getMimeType(value.image)
                // eslint-disable-next-line promise/always-return
                .then((type) => {
                    mimeType = type;
                    loadingMimeType = false;
                })
                .catch(() => {
                    loadingMimeType = false;
                });
        }
    });
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
                {#if loadingMimeType}
                    <div>Loading...</div>
                {:else if mimeType && mimeType.startsWith("video")}
                    <!-- Video tag -->
                    <video
                        class="m-auto my-3 h-auto w-full rounded-md object-contain"
                        controls
                        autoplay
                        loop
                        muted
                        in:fade={{ delay: 600, duration: 1000 }}
                        src={metadata.image}
                    />
                {:else}
                    <!-- Image tag -->
                    <img
                        class="img m-auto my-3 h-auto w-full rounded-md object-contain"
                        alt="token symbol"
                        src={metadata.image}
                        in:fade={{ delay: 600, duration: 1000 }}
                    />
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
                                href="/account/{metadata.owner}"
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
                                    href="/account/{metadata.owner}"
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
                                href="/account/{metadata.tree}/concurrent-merkle-tree"
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
