<script lang="ts">
    import type {
        ProtonActionType,
        ProtonTransaction,
    } from "@helius-labs/xray-proton";

    import { page } from "$app/stores";

    import { fade, fly } from "svelte/transition";

    import { transactionActionsMetadata } from "$lib/types";

    import formatDate from "$lib/util/format-date";

    export let transaction: ProtonTransaction;
    export let copyButtons = false;
    export let moreDetails = false;

    import CopyButton from "$lib/components/copy-button.svelte";
    import Icon from "$lib/components/icon.svelte";
    import IntersectionObserver from "svelte-intersection-observer";
    import shortenString from "../util/shorten-string";
    import TokenProvider from "./providers/token-provider.svelte";

    let element: HTMLDivElement;
    let intersecting = false;

    const supported = Object.keys(transactionActionsMetadata).includes(
        transaction.type
    );

    // TODO: Make this work without casting
    // but, if it exists then it will be a ProtonActionType
    const metadata = supported
        ? transactionActionsMetadata[transaction.type as ProtonActionType]
        : transactionActionsMetadata["UNKNOWN"];
</script>

<div>
    <button
        on:click|self={() =>
            (window.location.href = `/${transaction.signature}/tx`)}
        class="gradient relative block w-full rounded-lg border border-transparent bg-black pb-1 text-left hover:border-primary"
    >
        <div class="relative grid grid-cols-12 gap-3 rounded-lg">
            <div class="relative">
                <div
                    class="center absolute -left-5 top-3 z-10 mb-4 rounded-full border bg-black p-2"
                >
                    <div class="opacity-50">
                        <Icon
                            id={metadata.icon}
                            size="md"
                        />
                    </div>
                </div>
            </div>
            <div class="col-span-12 px-3 pl-6">
                <div class="flex items-center justify-between">
                    <div>
                        <h3 class="text-xl font-semibold">
                            {metadata.label}
                        </h3>
                        <a
                            href="/{transaction.signature}/tx"
                            class="link-neutral border border-x-0 border-t-0 border-dotted text-xs hover:link-success"
                        >
                            {transaction.signature
                                ? shortenString(transaction.signature, 8)
                                : "Unknown"}
                        </a>
                    </div>
                    <h3 class="ml-2 mt-1 text-xs opacity-50">
                        {formatDate(transaction.timestamp)}
                    </h3>
                </div>
                <div class="flex items-center justify-end">
                    {#if copyButtons}
                        <!-- Prevent default so copy button doesn't trigger link -->
                        <div
                            class="flex"
                            on:click|preventDefault
                            on:keydown|preventDefault
                        >
                            <CopyButton
                                success="Copied Address"
                                text={$page.url.href}
                            />
                            <CopyButton
                                icon="share"
                                success="Copied Link"
                                text={$page.url.href}
                            />
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        {#each transaction.actions as action, idx}
            {@const address = action?.actionType?.includes("SENT")
                ? action.sent || ""
                : action?.actionType?.includes("RECEIVED")
                ? action.received || ""
                : action.sent || action.received || ""}

            {#if action.actionType !== "UNKNOWN"}
                <IntersectionObserver
                    once={true}
                    rootMargin="100px"
                    {element}
                    bind:intersecting
                >
                    <div bind:this={element} />

                    {#if intersecting}
                        <div
                            class="ml-3"
                            in:fly={{
                                delay: idx * 50,
                                duration: 500,
                                y: 20,
                            }}
                        >
                            <TokenProvider
                                {address}
                                let:metadata
                                let:tokenIsLoading
                            >
                                {#if tokenIsLoading}
                                    <div
                                        class="grid animate-pulse grid-cols-12 items-center gap-3 rounded-lg"
                                    >
                                        <div
                                            class="col-span-2 p-1 md:col-span-1"
                                        >
                                            <div
                                                class="aspect-square w-full rounded-full bg-secondary"
                                            />
                                        </div>
                                        <div
                                            class="col-span-10 flex items-center justify-between md:col-span-11"
                                        >
                                            <div>
                                                <div
                                                    class="mb-2 h-3 w-32 animate-pulse rounded-full bg-secondary"
                                                />
                                                <div
                                                    class="h-2 w-20 animate-pulse rounded-full bg-secondary"
                                                />
                                            </div>
                                            <div
                                                class="h-2 w-5 animate-pulse rounded-full bg-secondary"
                                            />
                                        </div>
                                    </div>
                                {:else if metadata?.image}
                                    <div
                                        class="my-2 w-full rounded-lg text-left"
                                        in:fade={{
                                            duration: 500,
                                        }}
                                    >
                                        <div
                                            class="relative grid grid-cols-12 items-center gap-3 rounded-lg p-1"
                                        >
                                            <div
                                                class="col-span-2 p-1 md:col-span-1"
                                            >
                                                <button
                                                    on:click={() =>
                                                        (window.location.href = `/${metadata.address}/token`)}
                                                    class="w-full transition-transform hover:scale-125"
                                                >
                                                    <!-- background so that if it doesn't load you dont' get ugly no image icons -->
                                                    <div
                                                        style="background-image: url('{metadata.image}')"
                                                        class="aspect-square w-full rounded-lg bg-cover"
                                                    />
                                                </button>
                                            </div>

                                            <div
                                                class="col-span-10 flex items-center justify-between md:col-span-11"
                                            >
                                                <div>
                                                    <h4
                                                        class="text-lg font-semibold md:text-sm"
                                                    >
                                                        {metadata?.name ||
                                                            "Unknown"}
                                                    </h4>

                                                    {#if !action?.actionType?.includes("NFT")}
                                                        <div class="flex">
                                                            <h3
                                                                class="mr-2 text-xs"
                                                            >
                                                                <button
                                                                    on:click|self={() =>
                                                                        (window.location.href = `/${action.from}/wallet`)}
                                                                    class="link-neutral border border-x-0 border-t-0 border-dotted hover:link-success"
                                                                >
                                                                    {shortenString(
                                                                        action.from
                                                                    )}
                                                                </button>
                                                            </h3>
                                                            <Icon
                                                                id="arrowRight"
                                                            />
                                                            <h3
                                                                class="ml-2 text-xs"
                                                            >
                                                                <button
                                                                    on:click|self={() =>
                                                                        (window.location.href = `/${action.to}/wallet`)}
                                                                    class="link-neutral border border-x-0 border-t-0 border-dotted hover:link-success"
                                                                >
                                                                    {shortenString(
                                                                        action.to
                                                                    )}
                                                                </button>
                                                            </h3>
                                                        </div>
                                                    {/if}
                                                </div>
                                                <div class="mr-2">
                                                    <div
                                                        class="absolute top-1/2 -left-3 h-0.5 w-3 -translate-y-1/2 rounded-full bg-secondary"
                                                    />
                                                    {#if action?.actionType?.includes("RECEIVED") || action?.actionType?.includes("NFT_SELL") || action?.actionType?.includes("AIRDROP")}
                                                        <h3
                                                            class="text-bold text-success"
                                                        >
                                                            + {action.amount.toLocaleString()}
                                                        </h3>
                                                    {:else if action?.actionType?.includes("SENT") || action?.actionType?.includes("NFT_BUY")}
                                                        <h3
                                                            class="text-bold text-error"
                                                        >
                                                            - {action.amount.toLocaleString()}
                                                        </h3>
                                                    {:else if action?.actionType?.includes("BURN")}
                                                        <h3
                                                            class="text-bold text-warning"
                                                        >
                                                            - {action.amount.toLocaleString()}
                                                        </h3>
                                                    {:else if action?.amount}
                                                        <h3 class="text-bold">
                                                            {action.amount.toLocaleString()}
                                                        </h3>
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                {/if}
                            </TokenProvider>
                        </div>
                    {/if}
                </IntersectionObserver>
            {/if}
        {/each}
    </button>
</div>
