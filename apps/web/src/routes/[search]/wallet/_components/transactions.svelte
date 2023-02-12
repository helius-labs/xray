<script lang="ts">
    import { page } from "$app/stores";

    import type { WebTransaction } from "$lib/types";
    
    import Icon from "$lib/icon";
    import query from "$lib/state";

    import type {
        ProtonTransactionAction,
    } from "@helius-labs/xray-proton";
    
    import TokenBalance from "$lib/components/token-balance.svelte";

    const transactions = query("solana-account-transactions");

    // Merge all of the actions across all Txs so we can group like types
    let grouped:Array<any> = [];

    $: if($transactions?.load) {
        $transactions.load($page.params.search);
    }

    $: if($transactions?.data?.length) {
        let lastType = "";

        // Group by type
        $transactions?.data?.forEach((transaction:WebTransaction) => {
            transaction?.parsed?.actions.forEach((action:ProtonTransactionAction) => {
                const primaryUser = transaction?.parsed?.primaryUser;

                let type:string = transaction?.parsed?.type;
                
                if(primaryUser && type === "TRANSFER") {
                    if(primaryUser === action.from) {
                        type = "SENT";
                    } else if(primaryUser === action.to) {
                        type = "RECEIVED";
                    }
                }
                
                if(lastType !== type) {
                    lastType = type;

                    grouped.push([ lastType, []]);
                }

                grouped[grouped.length - 1][1].push({
                    ...action,
                    type        : transaction?.parsed?.type,
                    primaryUser : transaction?.parsed?.primaryUser,
                    signature   : transaction?.parsed?.signature,
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
        <div class="mb-7">
            <div class="grid mt-3 mb-1">
                <!-- Group header -->
                <div class="flex items-center">
                    {#if type === "TRANSFER"}
                        <Icon id="arrow-right" />
                        <p class="m-0 ml-1">Transfer</p>
                    {:else if type === "SENT"}
                        <Icon id="arrow-up" />
                        <p class="m-0 ml-1">Sent</p>
                    {:else if type === "RECEIVED"}
                        <Icon id="arrow-down" />
                        <p class="m-0 ml-1">Received</p>
                    {:else if type === "SWAP"}
                        <Icon id="swap" />
                        <p class="m-0 ml-1">Swapped</p>
                    {:else}
                        <Icon id="check" />
                        <p class="m-0 ml-1">Transaction</p>
                    {/if}
                </div>
            </div>

            {#each actions || [] as action}
                <!-- <div class="text-xs">
                    debug sent/received: {action?.sent || action?.received}
                </div> -->
                <div class="mb-4 hover:opacity-50">
                    <a
                        class="mb-2"
                        href="/{action?.signature}/tx?wallet={$page.params.search}">
                        <TokenBalance
                            token={{
                                address : action?.sent || action?.received,
                                amount  : action?.amount,
                            }}
                        />
                    </a>
                </div>
            {/each}
        </div>
    {/each}
{/if}

