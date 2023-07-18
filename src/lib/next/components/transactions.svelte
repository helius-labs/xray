<script lang="ts">
    import type { Transaction } from "$lib/next/types";

    import { transactions } from "$lib/next/state/transactions";

    import TokenProvider from "$lib/next/components/providers/token-provider.svelte";

    import shortenString from "$lib/util/shorten-string";

    // array of transaction signatures to render
    export let ids: string[] = [];
</script>

{#each ids as id}
    {@const transaction = $transactions.data.get(id)}
    {#if transaction?.actions}
        {#each transaction.actions as action}
            <TokenProvider
                address={action.token}
                let:asset
            >
                <div class="flex w-full items-center border-secondary py-4">
                    <img
                        src={asset.image}
                        class="mr-3 aspect-square w-10 rounded"
                        alt=""
                    />

                    <div>
                        {#if action.actionType === "RECEIVED" || action.actionType === "MINTED"}
                            <h4 class="font-bold">Recieved {asset.name}</h4>
                            <p class="text-xs opacity-70">
                                From {shortenString(action.from)}
                            </p>
                        {:else if action.actionType === "SENT"}
                            <h4>Sent {asset.name}</h4>
                            <p class="text-xs opacity-70">
                                To {shortenString(action.to)}
                            </p>
                        {/if}
                    </div>
                    <div class="flex flex-1 items-center justify-end">
                        {#if action.actionType === "RECEIVED" || action.actionType === "MINT"}
                            <p class="text-green-500">+ {action.amount}</p>
                        {:else if action.actionType === "SENT"}
                            <p class="text-red-500">- {action.amount}</p>
                        {/if}
                    </div>
                </div>
            </TokenProvider>
        {/each}
    {/if}
{/each}
