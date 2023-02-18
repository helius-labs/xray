<style>
</style>

<script>
    import { state } from "svelte-snacks";

    import { page } from "$app/stores";

    import Namor from "$lib/components/providers/namor-provider.svelte";
    import Transactions from "$lib/components/transactions.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";

    const address = $page.params.search;

    const transactions = state(["solanaTransactions", address], address);
    const accountInfo = state(["solanaAccountInfo", address], address);
</script>

<section>
    <div
        class="title sticky top-16 z-10 mb-5 flex w-full items-center justify-between bg-black pb-2 pt-5"
    >
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

                    <h1 class="text-lg font-bold lg:text-2xl">{result}</h1>
                </Namor>
            </div>
            <div>
                <CopyButton text={$page.params.search} />
            </div>
        </div>

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
