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

    $: console.log();
</script>

{#if animate}
    <div
        in:fade={{
            duration: 1000,
        }}
    >
        <div class="sticky top-16 z-10 mb-3 bg-base-100 py-1">
            <div
                class="flex flex-row-reverse items-center justify-between bg-base-100 md:flex-row"
            >
                <div>
                    <h3 class="m-0 text-3xl font-bold">Transaction</h3>
                </div>
                <div>
                    <CopyButton
                        text={signature}
                        success="Copied Address"
                        classList="px-3"
                    />

                    <CopyButton
                        text={$page.url.href}
                        success="Copied Link"
                        classList="px-3"
                        icon="share"
                    />
                </div>
            </div>

            <p class="opacity-50">{shortenAddress(signature)}</p>
        </div>
    </div>

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
                            <div class="badge-success badge">Success</div>
                        </div>
                    </div>
                </IconCard>
            </div>

            <Transaction
                transaction={data}
                clickableTokens={true}
                clickableTransaction={false}
            />
        {/if}
    </div>
{/if}
