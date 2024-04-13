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
    import Collapse from "$lib/components/collapse.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";
    import JSON from "$lib/components/json.svelte";
    import NiftyAssetProvider from "$lib/components/providers/nifty-asset-provider.svelte";
    import type { UINiftyAsset } from "$lib/types";
    import getMimeType from "$lib/util/get-mime-type";
    import basisPointsToPercentage from "$lib/util/percentage";
    import { niftyAssetStore } from "$lib/util/stores/nifty-asset";
    import {
        ExtensionType,
        Standard,
        State,
        getExtension,
        type Attributes,
        type Blob,
        type Creators,
        type Grouping,
        type Links,
        type Manager,
        type Metadata,
        type Proxy,
        type Royalties,
        DelegateRole,
    } from "@nifty-oss/asset";
    import { cubicOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";
    import PageLoader from "./_loader.svelte";

    const address = $page.params.asset;
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
    const KNOWN_IMAGE_EXTENSIONS = [
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/svg+xml",
    ];

    let asset: UINiftyAsset;

    let mediaUrl: string | null = null;
    let mediaType: "image" | "video" | "onchain" | null = null;
    let mediaBlob: string | null = null;

    // extensions

    let attributes: Attributes | undefined = undefined;
    let blob: Blob | undefined = undefined;
    let creators: Creators | undefined = undefined;
    let grouping: Grouping | undefined = undefined;
    let links: Links | undefined = undefined;
    let manager: Manager | undefined = undefined;
    let metadata: Metadata | undefined = undefined;
    let proxy: Proxy | undefined = undefined;
    let royalties: Royalties | undefined = undefined;
    let hasExtensions = false;

    const setMedia = async (asset: UINiftyAsset) => {
        attributes = getExtension(asset, ExtensionType.Attributes);
        blob = getExtension(asset, ExtensionType.Blob);
        creators = getExtension(asset, ExtensionType.Creators);
        grouping = getExtension(asset, ExtensionType.Grouping);
        links = getExtension(asset, ExtensionType.Links);
        manager = getExtension(asset, ExtensionType.Manager);
        metadata = getExtension(asset, ExtensionType.Metadata);
        proxy = getExtension(asset, ExtensionType.Proxy);
        royalties = getExtension(asset, ExtensionType.Royalties);

        hasExtensions = !!(
            attributes ||
            blob ||
            creators ||
            grouping ||
            links ||
            manager ||
            metadata ||
            proxy ||
            royalties
        );

        if (blob && KNOWN_IMAGE_EXTENSIONS.includes(blob.contentType)) {
            mediaBlob = Buffer.from(blob.data).toString("base64");
            mediaType = "onchain";
        }

        if (asset.json && asset.json.image) {
            mediaUrl = asset.json.image;
            mediaType = "image";

            const mimeType = await getMimeType(asset.json.image);
            if (mimeType && mimeType.startsWith("video/")) {
                mediaType = "video";
            }
        }
    };

    niftyAssetStore.subscribe((asset) => {
        if (asset) setMedia(asset);
    });

    $: if (asset) {
        niftyAssetStore.set(asset);
    }
</script>

<NiftyAssetProvider
    {address}
    bind:asset
    let:loading
>
    {#if loading}
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
                        {asset.name}
                    </h3>
                </div>

                <div>
                    <div class="flex items-center space-x-2">
                        {#if asset.json && asset.json.image}
                            <a
                                href={asset.json.image}
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
            <div
                class="relative flex flex-wrap items-center justify-between bg-base-100"
            >
                <div class="flex items-center space-x-2">
                    <div class="badge badge-outline uppercase">
                        {asset.mutable ? "mutable" : "immutable"}
                    </div>
                    {#if mediaType === "onchain"}
                        <div class="badge badge-outline uppercase">
                            on-chain media
                        </div>
                    {/if}
                    {#if grouping}
                        <div class="badge badge-outline uppercase">group</div>
                    {/if}
                    {#if asset.standard !== Standard.NonFungible}
                        <div class="badge badge-outline uppercase">
                            {Standard[asset.standard]}
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        <div class="content px-3">
            {#if mediaType}
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
                                    alt="asset media"
                                    src={mediaUrl}
                                    in:fade={{ delay: 600, duration: 1000 }}
                                />
                            </div>
                        {:else if mediaType === "onchain"}
                            <!-- Image tag -->
                            <div class="relative">
                                <img
                                    class="img m-auto my-3 h-auto w-full rounded-md object-contain"
                                    src={`data:${blob?.contentType};base64,${mediaBlob}`}
                                    alt="on-chain asset media"
                                    in:fade={{ delay: 600, duration: 1000 }}
                                />
                            </div>
                        {:else}
                            <!--Loading-->
                            <div>Loading...</div>
                        {/if}
                    </div>
                </div>
            {/if}
            <!-- Details -->
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
                        sectionTitle="Details"
                        iconId="info"
                        showDetails={true}
                    >
                        <div class="grid gap-2">
                            <a
                                class="card p-0"
                                href="/account/{asset.authority}?network={isMainnetValue
                                    ? 'mainnet'
                                    : 'devnet'}"
                            >
                                <header
                                    class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                >
                                    <h4>Authority</h4>
                                </header>
                                <p class="text-sm">
                                    {asset.authority}
                                </p>
                            </a>
                            <a
                                class="card p-0"
                                href="/account/{asset.owner}?network={isMainnetValue
                                    ? 'mainnet'
                                    : 'devnet'}"
                            >
                                <header
                                    class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                >
                                    <h4>Owner</h4>
                                </header>
                                <p class="text-sm">
                                    {asset.owner}
                                </p>
                            </a>
                            {#if asset.group}
                                <a
                                    class="card p-0"
                                    href="/nifty-asset/{asset.group}?network={isMainnetValue
                                        ? 'mainnet'
                                        : 'devnet'}"
                                >
                                    <header
                                        class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                    >
                                        <h4>Group</h4>
                                    </header>
                                    <p class="text-sm">
                                        {asset.group}
                                    </p>
                                </a>
                            {:else}
                                <div class="card p-0">
                                    <header
                                        class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                    >
                                        <h4>Group</h4>
                                    </header>
                                    <p class="text-sm">None</p>
                                </div>
                            {/if}
                            {#if asset.delegate}
                                <a
                                    class="card p-0"
                                    href="/account/{asset.delegate}?network={isMainnetValue
                                        ? 'mainnet'
                                        : 'devnet'}"
                                >
                                    <header
                                        class="flex gap-2 text-sm font-medium uppercase text-gray-500"
                                    >
                                        <h4>Delegate</h4>
                                        {#each asset.delegate.roles as role}
                                            <div
                                                class="badge badge-outline uppercase"
                                            >
                                                {DelegateRole[role]}
                                            </div>
                                        {/each}
                                    </header>
                                    <p class="text-sm">
                                        {asset.delegate}
                                    </p>
                                </a>
                            {:else}
                                <div class="card p-0">
                                    <header
                                        class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                    >
                                        <h4>Delegate</h4>
                                    </header>
                                    <p class="text-sm">None</p>
                                </div>
                            {/if}
                            <div class="card p-0">
                                <h4
                                    class="text-sm font-medium uppercase text-gray-500"
                                >
                                    State
                                </h4>
                                <p class="text-sm">
                                    {asset.state === State.Locked
                                        ? "Locked"
                                        : "Unlocked"}
                                </p>
                            </div>
                        </div>
                    </Collapse>
                </div>
            </div>
            <!-- Description -->
            {#if asset.json || metadata}
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
                        >
                            <p>
                                {#if asset.json && asset.json.description && asset.json.description.length > 0}
                                    {asset.json.description}
                                {:else if metadata && metadata.description}
                                    {metadata.description}
                                {/if}
                            </p>
                        </Collapse>
                    </div>
                </div>
            {/if}
            <!-- Royalties -->
            {#if royalties}
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
                            Number(royalties.basisPoints)
                        )}
                        iconId="percentage"
                    >
                        <p>
                            {asset.name ?? "The"} creator(s) currently expect to
                            take {basisPointsToPercentage(
                                Number(royalties.basisPoints)
                            )} of every secondary sale on this piece.
                        </p>
                    </Collapse>
                </div>
                <!-- Royalties Rule Set -->
                {#if royalties.constraint.type !== "Empty"}
                    <div
                        class="mt-3"
                        in:fly={{
                            delay: 300,
                            easing: cubicOut,
                            y: 50,
                        }}
                    >
                        <Collapse
                            sectionTitle="Royalties Rule Set"
                            iconId="json"
                            showDetails={false}
                        >
                            <JSON
                                data={royalties.constraint}
                                label="token"
                            />
                        </Collapse>
                    </div>
                {/if}
            {/if}
            <!-- Creators -->
            {#if creators && creators.creators.length > 0}
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
                        sectionAditionalInfo={creators.creators.length}
                        iconId="creator"
                    >
                        <div class="grid gap-2">
                            {#each creators.creators as creator, idx}
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
                                        {creator.address}
                                    </p>
                                </a>
                            {/each}
                        </div>
                    </Collapse>
                </div>
            {/if}
            <!-- JSON Metadata -->
            {#if asset.json}
                <div class="mt-3">
                    <Collapse
                        sectionTitle="JSON Metadata"
                        iconId="json"
                        showDetails={false}
                    >
                        <JSON
                            data={asset.json}
                            label="token"
                        />
                    </Collapse>
                </div>
            {/if}
            <!-- Extensions -->
            {#if hasExtensions}
                <div class="mt-3">
                    <Collapse
                        sectionTitle="Extensions"
                        iconId="box"
                        showDetails={false}
                    >
                        <p>List of extensions attached to this asset.</p>
                        {#if attributes}
                            <div class="mt-3">
                                <Collapse
                                    sectionTitle="Attributes"
                                    iconId="attributes"
                                >
                                    <div class="flex flex-wrap gap-2">
                                        {#each attributes.traits as attribute, idx}
                                            <div class="card p-0">
                                                <h4
                                                    class="text-sm font-medium uppercase text-gray-500"
                                                >
                                                    {attribute.traitType}
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
                        {#if blob}
                            <div class="mt-3">
                                <Collapse
                                    sectionTitle="Blob"
                                    iconId="dots"
                                >
                                    <div class="grid gap-2">
                                        {#if mediaType !== "onchain" && mediaBlob}
                                            <div class="relative">
                                                <img
                                                    class="img m-auto my-3 rounded-md object-contain"
                                                    src={`data:${blob?.contentType};base64,${mediaBlob}`}
                                                    alt="on-chain asset media"
                                                    in:fade={{
                                                        delay: 600,
                                                        duration: 1000,
                                                    }}
                                                />
                                            </div>
                                        {/if}
                                        <div class="card p-0">
                                            <h4
                                                class="text-sm font-medium uppercase text-gray-500"
                                            >
                                                Content-Type
                                            </h4>
                                            <p class="text-sm">
                                                {blob.contentType}
                                            </p>
                                        </div>
                                        <div class="card p-0">
                                            <h4
                                                class="text-sm font-medium uppercase text-gray-500"
                                            >
                                                Data Size
                                            </h4>
                                            <p class="text-sm">
                                                {blob.data.length} bytes
                                            </p>
                                        </div>
                                    </div>
                                </Collapse>
                            </div>
                        {/if}
                        {#if creators}
                            <div class="mt-3">
                                <Collapse
                                    sectionTitle="Creators"
                                    sectionAditionalInfo={creators.creators
                                        .length}
                                    iconId="creator"
                                >
                                    <div class="grid gap-2">
                                        {#each creators.creators as creator, idx}
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
                                                    {creator.address}
                                                </p>
                                            </a>
                                        {/each}
                                    </div>
                                </Collapse>
                            </div>
                        {/if}
                        {#if grouping}
                            <div class="mt-3">
                                <Collapse
                                    sectionTitle="Grouping"
                                    iconId="collection"
                                >
                                    <div class="grid gap-2">
                                        <div class="card p-0">
                                            <h4
                                                class="text-sm font-medium uppercase text-gray-500"
                                            >
                                                Size
                                            </h4>
                                            <p class="text-sm">
                                                {grouping.size}
                                            </p>
                                        </div>
                                        <div class="card p-0">
                                            <h4
                                                class="text-sm font-medium uppercase text-gray-500"
                                            >
                                                Maximum Size
                                            </h4>
                                            <p class="text-sm">
                                                {grouping.maxSize}
                                            </p>
                                        </div>
                                        {#if grouping.delegate}
                                            <a
                                                class="card p-0"
                                                href="/account/{grouping.delegate}?network={isMainnetValue
                                                    ? 'mainnet'
                                                    : 'devnet'}"
                                            >
                                                <header
                                                    class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                                >
                                                    <h4>Delegate</h4>
                                                </header>
                                                <p class="text-sm">
                                                    {grouping.delegate}
                                                </p>
                                            </a>
                                        {:else}
                                            <div class="card p-0">
                                                <header
                                                    class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                                >
                                                    <h4>Delegate</h4>
                                                </header>
                                                <p class="text-sm">None</p>
                                            </div>
                                        {/if}
                                    </div>
                                </Collapse>
                            </div>
                        {/if}
                        {#if links}
                            <div class="mt-3">
                                <Collapse
                                    sectionTitle="Links"
                                    iconId="link"
                                >
                                    <div class="grid gap-2">
                                        {#each links.values as link}
                                            <a
                                                class="card p-0"
                                                href={link.uri}
                                            >
                                                <header
                                                    class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                                >
                                                    <h4>{link.name}</h4>
                                                </header>
                                                <p class="text-sm">
                                                    {link.uri}
                                                </p>
                                            </a>
                                        {/each}
                                    </div>
                                </Collapse>
                            </div>
                        {/if}
                        {#if manager}
                            <div class="mt-3">
                                <Collapse
                                    sectionTitle="Manager"
                                    iconId="person"
                                >
                                    <a
                                        class="card p-0"
                                        href="/account/{manager.delegate}?network={isMainnetValue
                                            ? 'mainnet'
                                            : 'devnet'}"
                                    >
                                        <header
                                            class="flex gap-2 text-sm font-medium uppercase text-gray-500"
                                        >
                                            <h4>Delegate</h4>
                                            {#each manager.delegate.roles as role}
                                                <div
                                                    class="badge badge-outline uppercase"
                                                >
                                                    {DelegateRole[role]}
                                                </div>
                                            {/each}
                                        </header>
                                        <p class="text-sm">
                                            {manager.delegate}
                                        </p>
                                    </a>
                                </Collapse>
                            </div>
                        {/if}
                        {#if metadata}
                            <div class="mt-3">
                                <Collapse
                                    sectionTitle="Metadata"
                                    iconId="list"
                                >
                                    <div class="grid gap-2">
                                        <div class="card p-0">
                                            <h4
                                                class="text-sm font-medium uppercase text-gray-500"
                                            >
                                                Symbol
                                            </h4>
                                            <p class="text-sm">
                                                {metadata.symbol.length > 0
                                                    ? metadata.symbol
                                                    : "None"}
                                            </p>
                                        </div>
                                        <div class="card p-0">
                                            <h4
                                                class="text-sm font-medium uppercase text-gray-500"
                                            >
                                                Description
                                            </h4>
                                            <p class="text-sm">
                                                {metadata.description.length > 0
                                                    ? metadata.description
                                                    : "None"}
                                            </p>
                                        </div>
                                        {#if metadata.uri.length > 0}
                                            <a
                                                class="card p-0"
                                                href={metadata.uri}
                                            >
                                                <header
                                                    class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                                >
                                                    <h4>URI</h4>
                                                </header>
                                                <p class="text-sm">
                                                    {metadata.uri}
                                                </p>
                                            </a>
                                        {:else}
                                            <div class="card p-0">
                                                <h4
                                                    class="text-sm font-medium uppercase text-gray-500"
                                                >
                                                    URI
                                                </h4>
                                                <p class="text-sm">None</p>
                                            </div>
                                        {/if}
                                    </div>
                                </Collapse>
                            </div>
                        {/if}
                        {#if proxy}
                            <div class="mt-3">
                                <Collapse
                                    sectionTitle="Proxy"
                                    iconId="network"
                                >
                                    <a
                                        class="card p-0"
                                        href="/account/{proxy.program}?network={isMainnetValue
                                            ? 'mainnet'
                                            : 'devnet'}"
                                    >
                                        <header
                                            class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                        >
                                            <h4>Program</h4>
                                        </header>
                                        <p class="text-sm">
                                            {proxy.program}
                                        </p>
                                    </a>
                                    <div class="card p-0">
                                        <header
                                            class="flex items-center justify-between gap-6 text-sm font-medium text-gray-500"
                                        >
                                            <h4>Seeds</h4>
                                            <CopyButton
                                                text={proxy.seeds.toString()}
                                                icon="link"
                                            />
                                        </header>
                                        <p class="text-sm">{proxy.seeds}</p>
                                    </div>
                                    <div class="card p-0">
                                        <header
                                            class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                        >
                                            <h4>Bump</h4>
                                        </header>
                                        <p class="text-sm">{proxy.bump}</p>
                                    </div>
                                    {#if proxy.authority}
                                        <a
                                            class="card p-0"
                                            href="/account/{proxy.authority}?network={isMainnetValue
                                                ? 'mainnet'
                                                : 'devnet'}"
                                        >
                                            <header
                                                class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                            >
                                                <h4>Authority</h4>
                                            </header>
                                            <p class="text-sm">
                                                {proxy.authority}
                                            </p>
                                        </a>
                                    {:else}
                                        <div class="card p-0">
                                            <header
                                                class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                            >
                                                <h4>Authority</h4>
                                            </header>
                                            <p class="text-sm">None</p>
                                        </div>
                                    {/if}
                                </Collapse>
                            </div>
                        {/if}
                        {#if royalties}
                            <div class="mt-3">
                                <Collapse
                                    sectionTitle="Royalties"
                                    iconId="percentage"
                                >
                                    <div class="card p-0">
                                        <header
                                            class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                        >
                                            <h4>Seller Fee</h4>
                                        </header>
                                        <p class="text-sm">
                                            {royalties.basisPoints}
                                        </p>
                                    </div>
                                    {#if royalties.constraint.type !== "Empty"}
                                        <JSON
                                            data={royalties.constraint}
                                            label="token"
                                        />
                                    {:else}
                                        <div class="card p-0">
                                            <header
                                                class="flex items-center justify-between gap-6 text-sm font-medium uppercase text-gray-500"
                                            >
                                                <h4>Constraint</h4>
                                            </header>
                                            <p class="text-sm">Empty</p>
                                        </div>
                                    {/if}
                                </Collapse>
                            </div>
                        {/if}
                    </Collapse>
                </div>
            {/if}
        </div>
    {/if}
</NiftyAssetProvider>
