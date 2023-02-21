<script lang="ts">
    import type { ProtonTransaction } from "@helius-labs/xray-proton";

    import { onMount } from "svelte";

    import { page } from "$app/stores";

    import { fly, fade } from "svelte/transition";

    import { trpcWithQuery } from "$lib/trpc/client";

    import shortenAddress from "$lib/util/shorten-string";

    import CopyButton from "$lib/components/copy-button.svelte";
    import Transaction from "$lib/components/transaction.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Icon from "$lib/components/icon.svelte";

    let animate = false;

    const signature = $page.params.search;

    const client = trpcWithQuery($page);

    const transaction = client.transaction.createQuery([signature]);

    onMount(() => {
        animate = true;
    });

    $: data = $transaction?.data
        ? ($transaction.data as ProtonTransaction)
        : null;
</script>

{#if animate}
    <div
        in:fly={{
            duration: 1000,
            delay: 500,
            y: 50,
            opacity: 0,
        }}
    >
        {#if $transaction.isLoading}
            {#each Array(3) as _}
                <div class="py-2">
                    <IconCard />
                </div>
            {/each}
        {:else if data}
            <div class="pb-5">
                <Transaction
                    transaction={data}
                    clickableTokens={true}
                    clickableTransaction={false}
                    copyButtons={true}
                    ref="@tx:{data.signature}"
                />
            </div>

            <div class="mb-3">
                <IconCard>
                    <div slot="icon">
                        <div class="center h-10 w-10 rounded-full bg-success">
                            <Icon
                                id="check"
                                fill="black"
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
                            <div class="badge badge-success">Success</div>
                        </div>
                    </div>
                </IconCard>
            </div>
        {/if}
    </div>
{/if}
