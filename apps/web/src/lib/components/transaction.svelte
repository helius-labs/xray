<script lang="ts">
    import { onMount } from "svelte";

    import {
        type ProtonTransaction,
        type ProtonActionType,
    } from "@helius-labs/xray-proton";

    import {
        transactionActionsMetadata,
        type TransactionActionMetadata,
    } from "$lib/types";

    import formatDate from "$lib/util/format-date";

    import { fly } from "svelte/transition";

    export let transaction: ProtonTransaction;
    export let clickableTokens = false;
    export let clickableTransaction = true;

    import IconCard from "$lib/components/icon-card.svelte";
    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";
    import shortenString from "../util/shorten-string";
    import TokenProvider from "./providers/token-provider.svelte";
    import IntersectionObserver from "svelte-intersection-observer";

    let element: HTMLDivElement;
    let intersecting = false;

    const key = transaction.type as ProtonActionType;

    const supported = Object.keys(transactionActionsMetadata).includes(
        transaction.type
    );

    const metadata = supported
        ? transactionActionsMetadata[transaction.type as ProtonActionType]
        : transactionActionsMetadata["UNKNOWN"];
</script>

<div>
    <div
        class="rounded-lg border bg-black p-2 {clickableTransaction
            ? 'cursor-pointer hover:border-white'
            : ''}"
    >
        <div class="grid grid-cols-12 gap-3">
            <div class="center col-span-1 opacity-50">
                <Icon
                    id={metadata.icon}
                    size="md"
                />
            </div>
            <div class="col-span-7">
                <h3 class="text-xl font-semibold">
                    {metadata.label}
                </h3>
                <div class="text-xs opacity-50">
                    {transaction.signature
                        ? shortenString(transaction.signature, 8)
                        : "Unknown"}
                </div>
            </div>

            <div class="col-span-4 text-right opacity-50">
                <h3 class="ml-2 mt-1 text-xs">
                    {formatDate(transaction.timestamp)}
                </h3>
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
                                delay: idx * 100,
                            }}
                        >
                            <TokenProvider
                                {address}
                                let:metadata
                            >
                                <a
                                    href="/{address}/token?tx={transaction.signature}"
                                    class="hover:boder"
                                >
                                    <div
                                        class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg p-1"
                                    >
                                        <div
                                            class="col-span-2 p-1 md:col-span-1"
                                        >
                                            <img
                                                src={metadata?.image ||
                                                    "/media/tokens/unknown-token.png"}
                                                alt=""
                                                class="aspect-square w-full rounded-lg object-cover"
                                            />
                                        </div>

                                        <div
                                            class="col-span-10 flex items-center justify-between md:col-span-11"
                                        >
                                            <div>
                                                <h4
                                                    class="text-sm font-semibold"
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
                                                {/if}
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            </TokenProvider>
                        </div>
                    {/if}
                </IntersectionObserver>
            {/if}
        {/each}
    </div>
</div>
