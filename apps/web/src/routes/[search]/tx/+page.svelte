<script lang="ts">
    import type { ProtonTransaction } from "@helius-labs/xray-proton";

    import { onMount } from "svelte";

    import { page } from "$app/stores";

    import { fly, fade } from "svelte/transition";

    import { trpcWithQuery } from "$lib/trpc/client";

    import shortenAddress from "$lib/util/shorten-string";

<<<<<<< HEAD
    // @ts-ignore old lib, not typed

    import shortenString from "$lib/util/shorten-string";
    import Icon from "$lib/components/icon.svelte";

    import TransactionAction from "$lib/components/transaction-action.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Namor from "src/lib/components/providers/namor-provider.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";
    import DetailsPage from "$lib/components/details-page.svelte";
    import JSONWidget from "$lib/components/json-widget.svelte";

    import {
        groupTransactionActions,
        mergeTransactionActions,
    } from "$lib/util/transactions";

    import { fade } from "svelte/transition";
    
    const address = $page.params.search;

    const wallet = $page.url.searchParams.get("wallet");
    
    const transaction = state(["solanaTransaction", address], address);

    let groups: UITransactionActionGroup[] = [];

    $: if ($transaction?.data?.parsed) {

        const merged = mergeTransactionActions(
            [$transaction?.data],
            $page.url.searchParams.get("wallet") || ""
=======
    import CopyButton from "$lib/components/copy-button.svelte";
    import Transaction from "$lib/components/transaction.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Icon from "$lib/components/icon.svelte";
    import JSON from "$lib/components/json-viewer.svelte";

    let animate = false;
    let showCode = false;

    const signature = $page.params.search;

    const client = trpcWithQuery($page);

    $: wallet = $page.url.searchParams
        .get("ref")
        ?.split("@")
        .reduce(
            (acc, ref) => (ref.startsWith("wallet") ? ref.split(":")[1] : acc),
            ""
>>>>>>> q/trpc
        );

    $: console.log({ wallet });

    const transaction = client.transaction.createQuery({
        account: $page.url.searchParams
            .get("ref")
            ?.split("@")
            .reduce(
                (acc, ref) =>
                    ref.startsWith("wallet") ? ref.split(":")[1] : acc,
                ""
            ),
        transaction: signature || "",
    });

    onMount(() => {
        animate = true;
    });

    $: data = $transaction?.data
        ? ($transaction.data as ProtonTransaction)
        : null;
</script>

<<<<<<< HEAD
<DetailsPage pageDetails={{page: "transaction", tokenName: ""}}>
    {#if $transaction?.isLoading}
        {#each Array(3) as _}
            <div class="mb-3">
                <IconCard />
            </div>
        {/each}
    {:else if $transaction?.isError}
        <p>Error: {$transaction?.error}</p>
    {:else if $transaction?.hasFetched}
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

        <div
            in:fade={{
                delay: 500,
                duration: 750,
            }}
        >
            <h1 class="text-1xl mt-10 font-bold">Actions</h1>
            {#each groups as { label, icon, type, actions, timestamp }, groupIndex}
                <div
                    class="pb-4"
                    in:fade={{
                        delay: groupIndex * 100,
                        duration: 500,
                    }}
                >
                    {#each actions as action, actionIndex}
                        {#if action.type === "TRANSFER" || action.type === "SWAP"}
                            <a
                                class="mb-2 block cursor-pointer hover:opacity-75"
                                data-sveltekit-reload
                                href="/{action.sent}/token?prev={window.encodeURI(
                                    action.signature
                                )}&wallet={window.encodeURI(wallet)}"
                                in:fly={{
                                    delay: actionIndex * 100,
                                    easing: cubicOut,
                                    y: 50,
                                }}
                            >
                                <TransactionAction {action} />
                            </a>
                        {:else}
                            <a
                                class="mb-2 block cursor-pointer hover:opacity-75"
                                data-sveltekit-reload
                                href="/{action.signature}/tx?prev={window.encodeURI(
                                    $page.params.search
                                )}"
                                in:fly={{
                                    delay: actionIndex * 100,
                                    easing: cubicOut,
                                    y: 50,
                                }}
                            >
                                <TransactionAction {action} />
                            </a>
                        {/if}
                    {/each}
=======
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
>>>>>>> q/trpc
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
                <div
                    class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1"
                >
                    <div class="col-span-2 p-1 md:col-span-1">
                        <div class="center h-10 w-10 rounded-full bg-success">
                            <Icon
                                id="check"
                                fill="black"
                                size="sm"
                            />
                        </div>
                    </div>
                    <div
                        class="col-span-10 flex items-center justify-between md:col-span-11"
                    >
                        <div>
                            <h4 class="text-lg font-semibold md:text-sm">
                                Status
                            </h4>
                            <h3 class="mr-2 text-xs opacity-50">
                                This transaction has successfully processed.
                            </h3>
                        </div>
                        <div class="badge badge-success mr-1">Success</div>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <div
                    class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1"
                >
                    <div class="col-span-2 p-1 md:col-span-1">
                        <div class="center h-10 w-10 rounded-full bg-secondary">
                            <Icon
                                id="network"
                                size="sm"
                            />
                        </div>
                    </div>
                    <div
                        class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
                    >
                        <div>
                            <h4 class="text-lg font-semibold md:text-sm">
                                Network Fee
                            </h4>
                            <h3 class="mr-2 text-xs opacity-50">
                                Cost for processing this transaction.
                            </h3>
                        </div>
                        <p>{data.fee} SOL</p>
                    </div>
                </div>
            </div>
<<<<<<< HEAD

            <div class="mb-3">
                <IconCard>
                    <div slot="icon">
                        <div class="center h-10 w-10 rounded-full bg-secondary">
                            <Icon
                                id="signature"
                                size="sm"
                            />
                        </div>
                    </div>
                    <div
                        slot="title"
                        class="flex items-center justify-between"
                    >
                        <div>
                            <p>Signature</p>
                            <p class="text-xs opacity-50">
                                {shortenString($page.params.search)}
                            </p>
                        </div>
                        <div>
                            <CopyButton text={$page.params.search} />
                        </div>
                    </div>
                </IconCard>
            </div>

            <JSONWidget
               jsonData={$transaction?.data?.raw}
               page="transaction"
            />

            <div class="my-5 flex justify-center">
                <a
                    class="btn-ghost btn text-xs text-success hover:bg-transparent"
                    href={`https://explorer.solana.com/tx/${$page?.params?.search}`}
                    >View on Solana Explorer</a
                >
            </div>
        </div>
    {/if}
</DetailsPage>
=======
            {#if data?.raw}
                <div class="mb-3">
                    <JSON data={data?.raw} />
                </div>
            {/if}
        {/if}
    </div>
{/if}
>>>>>>> q/trpc
