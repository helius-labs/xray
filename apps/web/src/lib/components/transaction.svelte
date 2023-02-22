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
    export let clickableTokens = false;
    export let clickableTransaction = true;
    export let copyButtons = false;
    export let ref = "";

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

    $: existingRef = $page.url.searchParams.get("ref") || "";

    $: combinedRef = ref + existingRef;

    $: console.log({ combinedRef });
</script>

<div>
    <a
        href="/{transaction.signature}/tx{combinedRef
            ? '?ref=' + combinedRef
            : ''}"
        class="block rounded-lg bg-black {clickableTransaction
            ? 'cursor-pointer border p-2 hover:border-white'
            : 'cursor-pointer-none'}"
    >
        <div
            class="grid grid-cols-12 gap-3 rounded-lg"
            class:pb-2={clickableTokens}
        >
            <div class="center col-span-1 opacity-50">
                <Icon
                    id={metadata.icon}
                    size="md"
                />
            </div>
            <div class="col-span-11">
                <div class="flex justify-between">
                    <h3 class="text-xl font-semibold">
                        {metadata.label}
                    </h3>
                    <h3 class="ml-2 mt-1 text-xs opacity-50">
                        {formatDate(transaction.timestamp)}
                    </h3>
                </div>
                <div class="flex items-center justify-between">
                    <div class="text-xs opacity-50">
                        {transaction.signature
                            ? shortenString(transaction.signature, 8)
                            : "Unknown"}
                    </div>

                    {#if copyButtons}
                        <!-- Prevent default so copy button doesn't trigger link -->
                        <div
                            class="flex"
                            on:click|preventDefault
                            on:keydown|preventDefault
                        >
                            <CopyButton success="copied ID" />
                            <CopyButton
                                icon="share"
                                success="copied link"
                            />
                        </div>
                    {/if}
                </div>
            </div>
        </div>

        {#each transaction.actions as action, idx}
            {@const address = action.actionType.includes("SENT")
                ? action.sent || ""
                : action.actionType.includes("RECEIVED")
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
                            in:fly={{
                                y: 20,
                                duration: 500,
                                delay: idx * 50,
                            }}
                        >
                            <TokenProvider
                                {address}
                                let:metadata
                                let:tokenIsLoading
                            >
                                {#if tokenIsLoading}
                                    <div
                                        class="mt-3 grid animate-pulse grid-cols-12 items-center gap-3 rounded-lg p-1"
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
                                    <a
                                        href="/{address}/token{combinedRef
                                            ? '?ref=' + combinedRef
                                            : ''}"
                                        class:pointer-events-none={!clickableTokens}
                                        in:fade={{
                                            duration: 500,
                                        }}
                                    >
                                        <div
                                            class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg p-1 {clickableTokens
                                                ? 'border p-2 hover:border-white'
                                                : ''}"
                                        >
                                            <div
                                                class="col-span-2 p-1 md:col-span-1"
                                            >
                                                <!-- background so that if it doesn't load you dont' get ugly no image icons -->
                                                <div
                                                    style="background-image: url('{metadata.image}')"
                                                    class="rounded-lgd aspect-square w-full bg-cover"
                                                />
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

                                                    {#if !action.actionType.includes("NFT")}
                                                        {#if action.actionType === "TRANSFER" || action.actionType === "SWAP"}
                                                            <div class="flex">
                                                                <h3
                                                                    class="mr-2 text-xs"
                                                                >
                                                                    From <span
                                                                        class="opacity-50"
                                                                    >
                                                                        {shortenString(
                                                                            action.from
                                                                        )}
                                                                    </span>
                                                                </h3>
                                                                <Icon
                                                                    id="arrowRight"
                                                                />
                                                                <h3
                                                                    class="ml-2 text-xs"
                                                                >
                                                                    To <span
                                                                        class="opacity-50"
                                                                    >
                                                                        {shortenString(
                                                                            action.to
                                                                        )}
                                                                    </span>
                                                                </h3>
                                                            </div>
                                                        {:else}
                                                            <h3
                                                                class="text-xs opacity-50"
                                                            >
                                                                {transactionActionsMetadata[
                                                                    action
                                                                        .actionType
                                                                ].label}
                                                            </h3>
                                                        {/if}
                                                    {/if}
                                                </div>
                                                <div>
                                                    {#if action.actionType.includes("RECEIVED") || action.actionType.includes("NFT_SELL")}
                                                        <h3
                                                            class="text-bold text-success"
                                                        >
                                                            + {action.amount.toLocaleString()}
                                                        </h3>
                                                    {:else if action.actionType.includes("SENT") || action.actionType.includes("NFT_BUY")}
                                                        <h3
                                                            class="text-bold text-error"
                                                        >
                                                            - {action.amount.toLocaleString()}
                                                        </h3>
                                                    {:else if action.actionType.includes("BURN")}
                                                        <h3
                                                            class="text-bold text-warning"
                                                        >
                                                            - {action.amount.toLocaleString()}
                                                        </h3>
                                                    {:else if action.amount}
                                                        <h3 class="text-bold">
                                                            {action.amount.toLocaleString()}
                                                        </h3>
                                                    {/if}
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                {/if}
                            </TokenProvider>
                        </div>
                    {/if}
                </IntersectionObserver>
            {/if}
        {/each}
    </a>
</div>
