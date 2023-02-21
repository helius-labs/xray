<script>
    import { state } from "svelte-snacks";

    import { page } from "$app/stores";

    import shortenString from "$lib/util/shorten-string";

    import Transactions from "$lib/components/transactions.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import DetailsPage from "$lib/components/details-page.svelte";
    import Namor from "$lib/components/providers/namor-provider.svelte";
    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";
    import { onMount } from "svelte";

    const address = $page.params.search;

    const transactions = state(["solanaTransactions", address], address);
    const accountInfo = state(["solanaAccountInfo", address], address);
</script>

<Namor
    text={$page.params.search}
    let:result
    let:shortenedOriginal
>
    <DetailsPage
        type="Account"
        title={result}
        icon="person"
        copyText={$page.url.href}
    >
        <!-- <div class="mb-3">
            <IconCard>
                <div slot="icon">
                    <div
                        class="center h-10 w-10 rounded-lg border bg-secondary"
                    >
                        <Icon
                            id="person"
                            size="sm"
                        />
                    </div>
                </div>
                <div
                    slot="title"
                    class="flex items-center justify-between"
                >
                    <div>
                        <h3 class="fond-bold">Address</h3>
                        <p class="text-xs opacity-50">
                            {shortenString($page.params.search)}
                        </p>
                    </div>
                    <div>
                        <CopyButton text={$page.params.search} />
                    </div>
                </div>
            </IconCard>
        </div> -->

        <div class="mb-3">
            <IconCard>
                <div slot="icon">
                    <div class="center h-10 w-10 rounded-full bg-secondary">
                        <Icon
                            id="person"
                            size="sm"
                        />
                    </div>
                </div>
                <div
                    slot="title"
                    class="flex items-center justify-between"
                >
                    <div>
                        <h3 class="text-lg font-bold">{result}</h3>

                        <div class="flex items-center">
                            <p class="mr-1 text-xs opacity-50">
                                {shortenString($page.params.search)}
                            </p>
                            <CopyButton
                                text={$page.params.search}
                                success="Copied Address"
                            />
                        </div>
                    </div>
                    <div>
                        <h1 class="text-md">
                            {$accountInfo?.data?.balance} SOL
                        </h1>
                    </div>
                </div>
            </IconCard>
        </div>

        <div class="mt-10">
            <h1 class="text-xl font-bold">Activity</h1>
        </div>

        {#if !$transactions.hasFetched}
            {#each Array(3) as _}
                <div class="mb-3">
                    <IconCard />
                </div>
            {/each}
        {:else}
            <!-- <Transactions
                transactions={$transactions.data}
                user={$page.params.search}
            /> -->
        {/if}
    </DetailsPage>
</Namor>
