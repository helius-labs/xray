<script>
    import { state } from "svelte-snacks";

    import { page } from "$app/stores";

    import CopyButton from "$lib/components/copy-button.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Namor from "$lib/components/providers/namor-provider.svelte";
    import Transactions from "$lib/components/transactions.svelte";
    import Icon from "$lib/icon";

    const address = $page.params.search;

    const transactions = state(["solanaTransactions", address], address);
    const accountInfo = state(["solanaAccountInfo", address], address);
</script>

<section>
    <!-- <p class="text-xs opacity-50">Wallet</p> -->

    <div class="mb-5 flex items-center justify-between">
        <div class="item-center flex w-full justify-between">
            <div>
                <Namor
                    text={$page.params.search}
                    let:result
                    let:shortenedOriginal
                >
                    <div class="flex">
                        <Icon id="person" />
                        <h3 class="tooltip tooltip-right ml-2">
                            <span class="opacity-50">
                                {shortenedOriginal}
                            </span>
                        </h3>
                    </div>

                    <h1 class="text-2xl font-bold">{result}</h1>
                </Namor>
            </div>
            <div>
                <CopyButton text={$page.params.search} />
            </div>
        </div>

        {#if !$accountInfo?.hasFetched || !$transactions.hasFetched}
            <button class="loading btn-ghost btn pr-0" />
        {/if}

        {#if !$accountInfo?.hasFetched}
            <h1>{$accountInfo?.data?.balance}</h1>
        {/if}
    </div>

    {#if !$transactions.hasFetched}
        {#each Array(3) as _}
            <div class="mb-3">
                <IconCard />
            </div>
        {/each}
    {:else}
        <Transactions
            transactions={$transactions.data}
            user={$page.params.search}
        />
    {/if}
</section>
