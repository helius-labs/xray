<script lang="ts">
    import { page } from "$app/stores";

    import { onMount } from "svelte";

    import { state } from "svelte-snacks";

    import shortenString from "$lib/util/shorten-string";
    import Icon from "$lib/icon";

    import TransactionAction from "$lib/components/transaction-action.svelte";

    const address = $page.params.search;
  
    const transaction = state([ "solanaTransaction", address ], address);

    const formatDate = (date:number) => new Date(date).toLocaleDateString("en-US", {
        day    : "numeric",
        hour   : "numeric",
        minute : "numeric",
        month  : "short",
        year   : "numeric",
    });

    onMount(() => {
        $transaction.load();
    });
</script>

{#if $page.url.searchParams.get("wallet")}
    <a
        class="btn btn-ghost mb-6 pl-0"
        href="/{$page.url.searchParams.get("wallet")}/wallet">
        <Icon id="arrow-left" />
        <span class="ml-3">Back to Wallet</span>
    </a>
{/if}

{#if $transaction?.isLoading}
    <p>Loading...</p>
{:else if $transaction?.isError}
    <p>Error: {$transaction?.error}</p>
{:else if $transaction?.hasFetched}
    <div class="card prose mb-6">
        <div class="flex justify-between items-center">
            <div>
                <h4 class="font-bold opacity-50 m-0">Transaction</h4>
                <div class="flex items-center">
                    <h3 class="m-0">{shortenString($transaction?.data?.parsed?.signature || "")}</h3>
                    <button class="btn btn-ghost">
                        <Icon id="copy" />
                    </button>
                </div>
            </div>
            <div>
                <div class="badge badge-success h-8 px-3">
                    Success
                </div>
            </div>
        </div>
    </div>

    <div class="mb-16">
        <div class="mt-3 flex justify-between">
            <!-- Group header -->
            <div class="flex items-center opacity-60">
                {#if $transaction?.data?.raw?.type === "UNKNOWN"}
                    <Icon id="box" />
                    <p class="m-0 ml-1">Generic Transaction</p>
                {:else if $transaction?.data?.raw?.type === "TRANSFER_SENT"}
                    <Icon id="arrow-up" />
                    <p class="m-0 ml-1">Sent</p>
                {:else if $transaction?.data?.raw?.type === "TRANSFER_RECEIVED"}
                    <Icon id="arrow-down" />
                    <p class="m-0 ml-1">Received</p>
                {:else if $transaction?.data?.raw?.type === "TRANSFER"}
                    <Icon id="arrow-right" />
                    <p class="m-0 ml-1">Transfer</p>
                {:else if $transaction?.data?.raw?.type === "SWAP"}
                    <Icon id="swap" />
                    <p class="m-0 ml-1">Swapped</p>
                {/if}
            </div>

            <div>
                <p>{formatDate($transaction?.data?.raw?.timestamp)}</p>
            </div>
        </div>
    
        {#each $transaction?.data?.parsed?.actions || [] as action}
            <div class="mb-4 hover:opacity-50">
                <a
                    class="mb-2"
                    href="/{action?.signature}/tx?wallet={$page.params.search}">
                    <TransactionAction
                        action={{
                            ...action,
                            owner     : $page.url.searchParams.get("wallet"),
                            timestamp : $transaction?.data?.raw?.timestamp,
                            type      : $transaction?.data?.raw?.type,
                        }} />
                </a>
            </div>
        {/each}
    </div>
{/if}

