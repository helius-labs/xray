<script lang="ts">
    import type { ProtonTransaction } from "@helius-labs/xray-proton";

    import { onMount } from "svelte";

    import { page } from "$app/stores";

    import { fade, fly } from "svelte/transition";

    import { trpcWithQuery } from "$lib/trpc/client";

    import shortenAddress from "$lib/util/shorten-string";

    import Account from "$lib/components/account-data.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Icon from "$lib/components/icon.svelte";
    import JSON from "$lib/components/json.svelte";
    import Transaction from "$lib/components/transaction.svelte";
    import Collapse from "src/lib/components/collapse.svelte";

    let animate = false;
    let showCode = false;

    const signature = $page.params.search;

    const client = trpcWithQuery($page);

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

    const rawTransaction = client.rawTransaction.createQuery(signature || "");

    onMount(() => {
        animate = true;
    });

    $: data = $transaction?.data
        ? ($transaction.data as ProtonTransaction)
        : null;

    $: rawData = $rawTransaction?.data;

    $: ({ raw, ...rest } = data || { raw: null });
</script>

<div class="mb-4 flex justify-between px-3">
    <h1 class="text-xl font-bold">Transaction</h1>
    <div
        class="flex"
        on:click|preventDefault
        on:keydown|preventDefault
    >
        <CopyButton
            success="Copied Address"
            text={$page.url.href}
        />
        <CopyButton
            icon="share"
            success="Copied Link"
            text={$page.url.href}
        />
    </div>
</div>

{#if animate}
    <div
        in:fly={{
            delay: 500,
            duration: 1000,
            opacity: 0,
            y: 50,
        }}
    >
        {#if $transaction.isLoading}
            {#each Array(3) as _}
                <div class="py-2">
                    <IconCard />
                </div>
            {/each}
        {:else if data}
            <div class="pb-5 pl-3 pr-3 md:pl-0">
                <Transaction
                    transaction={data}
                    moreDetails={true}
                    copyButtons={true}
                />
            </div>

            <div class="mb-3">
                <div
                    class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
                >
                    <div class="col-span-2 p-1 md:col-span-1">
                        <div
                            class="center ml-1 h-10 w-10 rounded-full bg-success"
                        >
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
                        <div class="badge-success badge mr-1">Success</div>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <div
                    class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
                >
                    <div class="col-span-2 p-1 md:col-span-1">
                        <div
                            class="center ml-1 h-10 w-10 rounded-full bg-secondary"
                        >
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

            {#if data?.raw?.description && !data?.raw?.description
                    .toLowerCase()
                    .includes("unknown")}
                <div class="mb-3">
                    <div
                        class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1"
                    >
                        <div class="col-span-2 p-1 md:col-span-1">
                            <div
                                class="center ml-1 h-10 w-10 rounded-full bg-secondary"
                            >
                                <Icon
                                    id="info"
                                    size="md"
                                />
                            </div>
                        </div>
                        <div
                            class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
                        >
                            <div class="py-1">
                                <h4 class="text-lg font-semibold md:text-sm">
                                    Helius Description
                                </h4>
                                <p class="break-all text-xs opacity-50">
                                    {data?.raw?.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
            {#if data.accounts}
                <div class="py-3">
                    <Collapse
                        sectionTitle="Account Data"
                        showDetails={false}
                        hideIcon={true}
                    >
                        {#each data.accounts as account}
                            <div class="pb-5 pl-3 pr-3 md:pl-0">
                                <Account data={account} />
                            </div>
                        {/each}
                    </Collapse>
                </div>
            {/if}
            <div>
                <Collapse
                    sectionTitle="Transaction Data"
                    showDetails={false}
                    hideIcon={true}
                >
                    <div class="mb-3">
                        <JSON
                            data={rest}
                            label="proton"
                        />
                    </div>
                    {#if data?.raw}
                        <div class="mb-3">
                            <JSON
                                data={data?.raw}
                                label="enriched"
                            />
                        </div>
                    {/if}
                    <div class="mb-3">
                        <JSON
                            data={rawData}
                            label="raw"
                        />
                    </div>
                </Collapse>
            </div>
        {/if}
    </div>
{/if}
