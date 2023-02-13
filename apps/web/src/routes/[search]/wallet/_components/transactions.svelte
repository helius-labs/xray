<script lang="ts">
    import { onMount } from "svelte";

    import { page } from "$app/stores";

    import type { WebTransaction, WebTranscationAction } from "$lib/types";
    
    import Icon from "$lib/icon";

    import type {
        ProtonTransactionAction,
    } from "@helius-labs/xray-proton";

    import { state } from "svelte-snacks";
    
    import TransactionAction from "$lib/components/transaction-action.svelte";

    const address = $page.params.search;

    const transactions = state("solanaTransactions", address);

    const formatDate = (date:number) => new Date(date).toLocaleDateString("en-US", {
        year   : "numeric",
        month  : "short",
        day    : "numeric",
        hour   : "numeric",
        minute : "numeric",
    });
    
    onMount(() => {
        $transactions.load();
    });

    import prettyDate from "$lib/util/pretty-date";

    // Merge all of the actions across all Txs so we can group like types
    let grouped:Array<WebTranscationAction> = [];

    $: if($transactions?.data?.length) {
        let lastType = "";
        let lastTimestamp = $transactions?.data[0]?.raw?.timestamp;

        // Group by type
        $transactions?.data?.forEach((transaction:WebTransaction) => {
            if(!transaction?.parsed?.actions) {
                if(lastType !== "UNKNOWN") {
                    lastType = "UNKNOWN";

                    grouped.push([ lastType, []]);
                }

                grouped[grouped.length - 1][1].push({
                    type      : "UNKNOWN",
                    signature : transaction?.parsed?.signature,
                    timestamp : lastTimestamp,
                });
                
                return;
            }

            transaction?.parsed?.actions?.forEach((action:ProtonTransactionAction) => {
                let type:string = transaction?.parsed?.type;

                if(address === action.from) {
                    type = "TRANSFER_SENT";
                } else if(address === action.to) {
                    type = "TRANSFER_RECEIVED";
                }

                console.log("time", transaction?.raw?.timestamp);

                if((lastTimestamp - transaction?.raw?.timestamp) > 1000 * 60 * 60 * 24) {
                    lastTimestamp = transaction?.raw?.timestamp;

                    grouped.push([ lastType, []]);
                } else if(lastType !== type) {
                    lastType = type;

                    grouped.push([ lastType, []]);
                }

                console.log({ lastTimestamp });
                grouped[grouped.length - 1][1].push({
                    ...action,
                    type,
                    primaryUser : transaction?.raw?.primaryUser,
                    signature   : transaction?.raw?.signature,
                    timestamp   : lastTimestamp,
                });
            });
        });

        // Update template
        grouped = grouped;
    }
</script>

{#if $transactions?.data?.length === 0}
    <div class="center">
        <p class="text-center">
            No transactions found
        </p>
    </div>
{:else if $transactions?.isLoading}
    <div class="center">
        <button class="btn btn-ghost loading"></button>
    </div>
{:else if $transactions?.data?.length}
    {#each grouped as [ type, actions ]}
        <div class="mb-16">
            <div class="mt-3 flex justify-between">
                <!-- Group header -->
                <div class="flex items-center opacity-60">
                    {#if type === "UNKNOWN"}
                        <Icon id="box" />
                        <p class="m-0 ml-1">Generic Transaction</p>
                    {:else if type === "TRANSFER_SENT"}
                        <Icon id="arrow-up" />
                        <p class="m-0 ml-1">Sent</p>
                    {:else if type === "TRANSFER_RECEIVED"}
                        <Icon id="arrow-down" />
                        <p class="m-0 ml-1">Received</p>
                    {:else if type === "TRANSFER"}
                        <Icon id="arrow-right" />
                        <p class="m-0 ml-1">Transfer</p>
                    {:else if type === "SWAP"}
                        <Icon id="swap" />
                        <p class="m-0 ml-1">Swapped</p>
                    {/if}
                </div>

                <p class="opacity-60 text-xs">
                    {formatDate(actions[0]?.timestamp)}
                </p>
            </div>
        
            {#each actions || [] as action}
                <div class="mb-4 hover:opacity-50">
                    <a
                        class="mb-2"
                        href="/{action?.signature}/tx?wallet={$page.params.search}">
                        <TransactionAction {action} />
                    </a>
                </div>
            {/each}
        </div>
    {/each}
{/if}

