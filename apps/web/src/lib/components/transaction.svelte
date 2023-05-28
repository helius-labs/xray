<script lang="ts">
    import type {
        ProtonActionType,
        ProtonTransaction,
    } from "@helius-labs/xray";

    import { ProtonCustomActionLabelTypes } from "@helius-labs/xray";

    import { fade, fly } from "svelte/transition";

    import { transactionActionsMetadata } from "$lib/types";

    import formatDate from "$lib/util/format-date";

    export let transaction: ProtonTransaction;

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

    const formatSource = (str: string) =>
        str
            .split("_")
            .map(
                (word: string) =>
                    word.slice(0, 1) + word.slice(1, word.length).toLowerCase()
            )
            .join(" ");
</script>

<div>
    <a
        href="/tx/{transaction.signature}"
        class="gradient relative block w-full rounded-lg bg-black bg-opacity-70 pb-1 text-left shadow-lg transition ease-in-out hover:border-white hover:bg-opacity-90"
    >
        <div
            class="pointer-events-none relative grid grid-cols-12 gap-3 rounded-lg"
        >
            <div class="relative">
                <div
                    class="center absolute -left-5 top-3 z-10 mb-4 rounded-full bg-black bg-opacity-90 p-2 shadow"
                >
                    <div class="opacity-70">
                        <Icon
                            id={metadata.icon}
                            size="md"
                        />
                    </div>
                    {#if transaction.type.includes("COMPRESSED")}
                        <div
                            class="center absolute left-8 -top-5 z-10 rounded bg-black bg-opacity-90 p-[1px] text-[10px]  text-[#FFD700] shadow"
                            in:fade={{
                                delay: 500,
                                duration: 500,
                            }}
                        >
                            COMPRESSED
                        </div>
                    {/if}
                </div>
            </div>
            <div class="pointer-events-none col-span-12 mb-2 px-3 pl-6">
                <div class="flex justify-between">
                    <div>
                        <h3 class="text-xl font-semibold">
                            {metadata.label}
                        </h3>
                        <div class="flex text-xs">
                            {#if transaction.source !== "UNKNOWN" && transaction.source !== "SOLANA_PROGRAM_LIBRARY"}
                                <div class="mr-2 rounded">
                                    {formatSource(transaction.source)}
                                </div>
                            {/if}
                            <div class="mr-2 rounded">
                                <a
                                    data-sveltekit-reload
                                    href="/tx/{transaction.signature}"
                                    class="link-neutral pointer-events-auto border border-x-0 border-t-0 border-dotted text-xs hover:link-success"
                                >
                                    {transaction.signature
                                        ? shortenString(
                                              transaction.signature,
                                              4
                                          )
                                        : "Unknown"}
                                </a>
                            </div>
                        </div>
                    </div>
                    <h3 class="ml-2 mt-1 text-xs opacity-70">
                        {formatDate(transaction.timestamp)}
                    </h3>
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
                                y: -40,
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
                                                class="max-height-10 aspect-square w-full rounded-full bg-secondary"
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
                                {:else}
                                    <div
                                        class="my-2 w-full rounded-lg text-left"
                                        in:fade={{
                                            duration: 500,
                                        }}
                                    >
                                        <div
                                            class="pointer-events-none relative grid grid-cols-12 items-center gap-3 rounded-lg p-1"
                                        >
                                            <div
                                                class="col-span-2 flex items-center p-1 md:col-span-1"
                                            >
                                                <a
                                                    data-sveltekit-reload
                                                    href="/token/{metadata.address}"
                                                    class="pointer-events-auto mx-2 w-full transition-transform hover:scale-125"
                                                >
                                                    {#if metadata?.image}
                                                        <!-- background so that if it doesn't load you dont' get ugly no image icons -->
                                                        <div
                                                            style="background-image: url('{metadata.image}')"
                                                            class="aspect-square w-8 rounded-lg bg-cover"
                                                        />
                                                    {:else}
                                                        <div
                                                            class="flex aspect-square w-8 items-center justify-center rounded-lg bg-secondary opacity-70"
                                                        >
                                                            <Icon
                                                                id="image"
                                                                size="md"
                                                            />
                                                        </div>
                                                    {/if}
                                                </a>
                                            </div>

                                            <div
                                                class="pointer-events-none col-span-10 flex items-center justify-between md:col-span-11"
                                            >
                                                <div>
                                                    <h4
                                                        class="text-lg font-semibold md:text-sm"
                                                    >
                                                        {metadata?.name ||
                                                            "Unknown"}
                                                    </h4>
                                                    {#if Object.keys(ProtonCustomActionLabelTypes).includes(action.actionType)}
                                                        <h3
                                                            class="flex text-xs"
                                                        >
                                                            <p
                                                                class="link-neutral"
                                                            >
                                                                {transactionActionsMetadata[
                                                                    action
                                                                        ?.actionType
                                                                ].label}
                                                            </p>
                                                        </h3>
                                                    {:else if !action?.actionType?.includes("NFT")}
                                                        <div class="flex">
                                                            {#if action?.actionType?.includes("SENT") && action.to}
                                                                <p
                                                                    class="mr-1 text-xs text-neutral"
                                                                >
                                                                    Sent to
                                                                </p>

                                                                <h3
                                                                    class="text-xs"
                                                                >
                                                                    <a
                                                                        data-sveltekit-reload
                                                                        href="/account/{action.to}"
                                                                        class="link-neutral pointer-events-auto border border-x-0 border-t-0 border-dotted hover:link-success"
                                                                    >
                                                                        {shortenString(
                                                                            action.to
                                                                        )}
                                                                    </a>
                                                                </h3>
                                                            {:else if action?.actionType?.includes("RECEIVED") && action.from}
                                                                <p
                                                                    class="mr-1 text-xs text-neutral"
                                                                >
                                                                    Received
                                                                    from
                                                                </p>

                                                                <h3
                                                                    class="text-xs"
                                                                >
                                                                    <a
                                                                        href="/account/{action.from}"
                                                                        class="link-neutral pointer-events-auto border border-x-0 border-t-0 border-dotted hover:link-success"
                                                                    >
                                                                        {shortenString(
                                                                            action.from
                                                                        )}
                                                                    </a>
                                                                </h3>
                                                            {:else}
                                                                {#if action.from}
                                                                    <h3
                                                                        class="mr-1 text-xs"
                                                                    >
                                                                        <a
                                                                            data-sveltekit-reload
                                                                            href="/account/{action.from}"
                                                                            class="link-neutral pointer-events-auto border border-x-0 border-t-0 border-dotted hover:link-success"
                                                                        >
                                                                            {shortenString(
                                                                                action.from
                                                                            )}
                                                                        </a>
                                                                    </h3>
                                                                {/if}

                                                                <div
                                                                    class="mr-1"
                                                                >
                                                                    <Icon
                                                                        id="arrowRight"
                                                                    />
                                                                </div>

                                                                {#if action.to}
                                                                    <h3
                                                                        class="text-xs"
                                                                    >
                                                                        <a
                                                                            data-sveltekit-reload
                                                                            href="/account/{action.to}"
                                                                            class="link pointer-events-auto border border-x-0 border-t-0 border-dotted hover:link-success"
                                                                        >
                                                                            {shortenString(
                                                                                action.to
                                                                            )}
                                                                        </a>
                                                                    </h3>
                                                                {/if}
                                                            {/if}
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
    </a>
</div>
