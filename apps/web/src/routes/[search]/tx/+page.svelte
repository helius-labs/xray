<style>
    :global(.code span) {
        font-size: 0.65rem;
    }
</style>

<script lang="ts">
    import type { UITransactionActionGroup } from "$lib/types";

    import { page } from "$app/stores";

    import { state } from "svelte-snacks";

    import { fly } from "svelte/transition";

    import { cubicOut } from "svelte/easing";

    // @ts-ignore old lib, not typed
    import formatHighlight from "json-format-highlight";

    import shortenString from "$lib/util/shorten-string";
    import Icon from "$lib/icon";

    import TransactionAction from "$lib/components/transaction-action.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Namor from "$lib/components/namor.svelte";

    import {
        groupTransactionActions,
        mergeTransactionActions,
    } from "$lib/util/transactions";

    import { nameFromString } from "@helius-labs/helius-namor";

    import { fade } from "svelte/transition";

    let showCode = false;

    const address = $page.params.search;

    const transaction = state(["solanaTransaction", address], address);

    let metadataHTML = "";

    let groups: UITransactionActionGroup[] = [];

    $: if ($transaction?.data?.parsed) {
        metadataHTML = formatHighlight($transaction?.data?.raw, {
            keyColor: "#a5a3a3",
            numberColor: "#e8a034",
            stringColor: "#24ae67",
        });

        const merged = mergeTransactionActions(
            [$transaction?.data],
            $page.url.searchParams.get("wallet") || ""
        );

        groups = groupTransactionActions(merged);
    }
</script>

<div class="flex items-center justify-between">
    <Namor
        text={$page.params.search}
        let:result
        let:shortenedOriginal
    >
        <h1
            class="tooltip text-3xl font-bold"
            data-tip="Tx: {shortenedOriginal}"
        >
            {result}
        </h1>
    </Namor>

    {#if !$transaction?.hasFetched}
        <button class="loading btn-ghost btn pr-0" />
    {/if}
</div>

{#if $transaction?.isLoading}
    {#each Array(3) as _}
        <div class="mb-3">
            <IconCard />
        </div>
    {/each}
{:else if $transaction?.isError}
    <p>Error: {$transaction?.error}</p>
{:else if $transaction?.hasFetched}
    {#each groups as { label, icon, type, actions, timestamp }, groupIndex}
        <div
            class="py-6"
            in:fade={{
                delay: groupIndex * 100,
                duration: 500,
            }}
        >
            <div class="mb-2 flex opacity-75">
                <div class="flex items-center">
                    <Icon
                        id={icon}
                        size="md"
                    />
                    <h1 class="ml-2">
                        {label}
                    </h1>
                </div>
            </div>

            {#each actions as action, actionIndex}
                <a
                    class="mb-2 block cursor-pointer hover:opacity-75"
                    data-sveltekit-reload
                    href="/{action.signature}/tx?wallet={$page.params.search}"
                    in:fly={{
                        delay: actionIndex * 100,
                        easing: cubicOut,
                        y: 50,
                    }}
                >
                    <TransactionAction {action} />
                </a>
            {/each}
        </div>
    {/each}

    <div
        in:fade={{
            delay: 500,
            duration: 750,
        }}
    >
        <div class="mb-3">
            <IconCard>
                <div slot="icon">
                    <div class="center h-10 w-10 rounded-full bg-success">
                        <Icon
                            id="check"
                            fill="base-100"
                            size="sm"
                        />
                    </div>
                </div>
                <div
                    slot="title"
                    class="flex items-center justify-between"
                >
                    <div>
                        <p>Status</p>
                        <p class="text-xs opacity-50">
                            This transaction has successfully processed.
                        </p>
                    </div>
                    <div>
                        <div class="badge-success badge">Success</div>
                    </div>
                </div>
            </IconCard>
        </div>

        <div class="mb-3">
            <IconCard>
                <div slot="icon">
                    <div class="center h-10 w-10 rounded-full bg-secondary">
                        <Icon
                            id="network"
                            size="sm"
                        />
                    </div>
                </div>
                <div
                    slot="title"
                    class="flex items-center justify-between"
                >
                    <div>
                        <p>Network Fee</p>
                        <p class="text-xs opacity-50">
                            Cost for processing this transaction.
                        </p>
                    </div>
                    <div>
                        <p class="opacity-50">
                            {$transaction?.data?.parsed?.fee}
                        </p>
                    </div>
                </div>
            </IconCard>
        </div>

        <div class="mb-3">
            <IconCard>
                <div slot="icon">
                    <div class="center h-10 w-10 rounded-full bg-secondary">
                        <Icon
                            id="signature"
                            size="sm"
                        />
                    </div>
                </div>
                <div
                    slot="title"
                    class="flex items-center justify-between"
                >
                    <div>
                        <p>Signature</p>
                        <p class="text-xs opacity-50">
                            {shortenString($page.params.search)}
                        </p>
                    </div>
                    <div>
                        <button class="btn-ghost btn-sm btn">
                            <Icon
                                id="copy"
                                size="md"
                            />
                        </button>
                    </div>
                </div>
            </IconCard>
        </div>

        <div class="mb-3">
            <IconCard>
                <div slot="icon">
                    <div class="center h-10 w-10 rounded-full bg-secondary">
                        <Icon
                            id="json"
                            size="sm"
                        />
                    </div>
                </div>
                <div
                    slot="title"
                    class="flex items-center justify-between"
                >
                    <div>
                        <p>JSON</p>
                        <p class="text-xs opacity-50">
                            View the raw transaction data.
                        </p>
                    </div>
                    <div>
                        {#if showCode}
                            <button
                                class="btn-ghost btn-sm btn"
                                on:click={() => (showCode = false)}
                            >
                                <Icon
                                    id="cancel"
                                    size="md"
                                />
                            </button>
                        {:else}
                            <button
                                class="btn-ghost btn-sm btn"
                                on:click={() => (showCode = true)}
                            >
                                <Icon
                                    id="dots"
                                    size="md"
                                />
                            </button>
                        {/if}
                    </div>
                </div>
            </IconCard>

            {#if showCode}
                <div
                    class="card mt-3"
                    in:fade={{ duration: 500 }}
                >
                    <div class="code overflow-hidden">
                        <pre><code class="text-xs">{@html metadataHTML}</code
                            ></pre>
                    </div>
                </div>
            {/if}
        </div>

        <div class="my-5 flex justify-center">
            <a
                class="btn-ghost btn text-xs text-success hover:bg-transparent"
                href={`https://explorer.solana.com/tx/${$page?.params?.search}`}
                >View on Solana Explorer</a
            >
        </div>
    </div>
{/if}
