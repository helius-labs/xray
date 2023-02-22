<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import { tweened } from "svelte/motion";

    import Transactions from "$lib/components/transactions.svelte";

    const account = $page.params.search;

    const client = trpcWithQuery($page);

    const accountInfo = client.accountInfo.createQuery(account);

    const balance = tweened(0, {
        duration: 1000,
    });

    $: if ($accountInfo?.data?.balance) {
        balance.set($accountInfo.data.balance);
    }

    $: console.log(`@wallet:${$page.params.search}`);
</script>

<<<<<<< HEAD
<Namor
    text={$page.params.search}
    let:result
    let:shortenedOriginal
>
    <DetailsPage pageDetails={{page: "wallet", tokenName: ""}>
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
=======
<Transactions
    {account}
    ref="@wallet:{$page.params.search}"
/>
>>>>>>> q/trpc
