<script lang="ts">
    // @ts-nocheck
    import type { ProtonTransaction } from "$lib/xray";

    import { onMount } from "svelte";

    import { page } from "$app/stores";

    import { fly } from "svelte/transition";

    import { Circle } from "svelte-loading-spinners";

    import { trpcWithQuery } from "$lib/trpc/client";

    import Account from "$lib/components/account-data.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Icon from "$lib/components/icon.svelte";
    import JSON from "$lib/components/json.svelte";
    import LogMessages from "$lib/components/log-messages.svelte";
    import Transaction from "$lib/components/transaction.svelte";
    import Collapse from "$lib/components/collapse.svelte";
    import Network from "$lib/components/network.svelte";

    let animate = false;
    let isLoading = true;
    let isMounted = false;
    let updatedMetadata;

    const signature = $page.params.tx;

    const client = trpcWithQuery($page);
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
    let transaction: object | null = null;

    const rawTransaction = client.rawTransaction.createQuery([
        signature || "",
        isMainnetValue,
    ]);

    let error: any = null;

    $: if (signature && isMounted) {
        executeQuery();
    }

    async function executeQuery() {
        isLoading = true;

        try {
            const result = await fetchTransactionData();
            transaction = result;
            error = null;
        } catch (e) {
            error = e;
            transaction = null;
        } finally {
            isLoading = false;
        }
    }

    async function fetchTransactionData() {
        const result = client.transaction.createQuery({
            account: $page.url.searchParams
                .get("ref")
                ?.split("@")
                .reduce(
                    (acc, ref) =>
                        ref.startsWith("wallet") ? ref.split(":")[1] : acc,
                    ""
                ),
            isMainnet: isMainnetValue,
            transaction: signature || "",
        });
        return result;
    }

    onMount(() => {
        animate = true;
        isMounted = true;

        return () => {
            isMounted = false;
        };
    });

    $: data = $transaction?.data
        ? ($transaction.data as ProtonTransaction)
        : null;

    $: rawData = $rawTransaction?.data;

    $: ({ raw, ...rest } = data || { raw: null });

    $: isLoading = !$transaction || $transaction.data === undefined;
</script>

{#if isLoading}
    <div
        class="flex content-center justify-center pt-4"
        aria-label="Loading spinner"
    >
        <Circle
            size="50"
            color="#FFFFFF"
            unit="px"
            duration="1s"
        />
    </div>
{:else if $transaction?.data?.signature}
    <div class="content mb-4 mt-4 flex justify-between px-3">
        <h1 class="text-xl font-bold">Transaction</h1>
        <div
            class="flex"
            on:click|preventDefault
            on:keydown|preventDefault
        >
            <CopyButton
                success=""
                text={$page.params.search}
            />
            <CopyButton
                icon="link"
                success=""
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
            class="content pl-2 md:pl-0"
        >
            {#if $transaction.isLoading}
                {#each Array(3) as _}
                    <div class="py-2">
                        <IconCard />
                    </div>
                {/each}
            {:else if data}
                <div class="px-3">
                    <Transaction transaction={data} />
                </div>

                {#if data.accounts}
                    <div class="px-3 pt-3">
                        <Collapse
                            sectionTitle="Account Changes"
                            showDetails={Boolean(
                                $transaction?.data?.type === "UNKNOWN"
                            )}
                            hideIcon={true}
                        >
                            {#each data.accounts as account}
                                <Account data={account} />
                            {/each}
                        </Collapse>
                    </div>
                {/if}

                {#if $transaction.data?.type === "COMPRESSED_NFT_UPDATE_METADATA"}
                    <div class="px-3 pt-3">
                        <Collapse
                            sectionTitle="Old Metadata"
                            showDetails={false}
                            hideIcon={true}
                        >
                            <JSON
                                data={data.raw?.events?.compressed[0]?.metadata}
                                label={"update-cNFT"}
                            />
                        </Collapse>
                    </div>
                    <div class="mb-3 px-3 pt-3">
                        <Collapse
                            sectionTitle="Metadata Changes"
                            showDetails={false}
                            hideIcon={true}
                        >
                            <JSON
                                data={data.raw?.events?.compressed[0]
                                    ?.updateArgs}
                                label={"update-cNFT"}
                            />
                        </Collapse>
                    </div>
                {/if}

                <div class="mb-3 px-3">
                    <div
                        class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
                    >
                        {#if rawData?.transaction?.meta?.err}
                            <div class="col-span-2 p-1 md:col-span-1">
                                <div
                                    class="center ml-1 h-10 w-10 rounded-full bg-error"
                                >
                                    <Icon
                                        id="close"
                                        fill="black"
                                        size="sm"
                                    />
                                </div>
                            </div>
                            <div
                                class="col-span-10 flex items-center justify-between md:col-span-11"
                            >
                                <div>
                                    <h4
                                        class="text-lg font-semibold md:text-sm"
                                    >
                                        Status
                                    </h4>
                                    <h3 class="mr-2 text-xs opacity-50">
                                        This transaction has failed.
                                    </h3>
                                </div>
                                <div class="badge badge-error mr-1">Error</div>
                            </div>
                        {:else}
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
                                    <h4
                                        class="text-lg font-semibold md:text-sm"
                                    >
                                        Status
                                    </h4>
                                    <h3 class="mr-2 text-xs opacity-50">
                                        This transaction has successfully
                                        processed.
                                    </h3>
                                </div>
                                <div class="badge badge-success mr-1">
                                    Success
                                </div>
                            </div>
                        {/if}
                    </div>
                </div>
                <div class="mb-3 px-3">
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
                            <p class="text-xs md:text-sm">{data.fee} SOL</p>
                        </div>
                    </div>
                </div>

                <div class="mb-3 px-3">
                    <div
                        class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
                    >
                        <div class="col-span-2 p-1 md:col-span-1">
                            <div
                                class="center ml-1 h-10 w-10 rounded-full bg-secondary"
                            >
                                <Icon
                                    id="box"
                                    size="sm"
                                />
                            </div>
                        </div>
                        <div
                            class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
                        >
                            <div>
                                <h4 class="text-lg font-semibold md:text-sm">
                                    Slot
                                </h4>
                                <h3 class="mr-2 text-xs opacity-50">
                                    The slot this transaction happened on.
                                </h3>
                            </div>
                            <a
                                data-sveltekit-reload
                                href="/block/{data?.raw
                                    ?.slot}?network={isMainnetValue
                                    ? 'mainnet'
                                    : 'devnet'}"
                                class="pointer-events-auto text-xs hover:link-success md:text-sm"
                            >
                                {data?.raw?.slot?.toLocaleString()}
                            </a>
                        </div>
                    </div>
                </div>

                {#if data?.raw?.description && !data?.raw?.description
                        .toLowerCase()
                        .includes("unknown")}
                    <div class="mb-3 px-3">
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
                                    <h4
                                        class="text-lg font-semibold md:text-sm"
                                    >
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

                <div class="px-3">
                    <Collapse
                        sectionTitle="Transaction Data"
                        showDetails={true}
                        hideIcon={true}
                    >
                        <div class="mb-3">
                            <JSON
                                data={rest}
                                label="proton"
                            />
                            <div
                                class="mb-3 mt-1 border border-x-0 border-t-0"
                            />
                        </div>
                        {#if data?.raw}
                            <div class="mb-3">
                                <JSON
                                    data={data?.raw}
                                    label="enriched"
                                />
                                <div
                                    class="mb-3 mt-1 border border-x-0 border-t-0"
                                />
                            </div>
                        {/if}
                        <div>
                            <JSON
                                data={rawData}
                                label="raw"
                            />
                        </div>
                    </Collapse>
                </div>

                {#if rawData}
                    <div class="px-3 pt-3">
                        <Collapse
                            sectionTitle="Log Messages"
                            showDetails={Boolean(
                                $transaction?.data?.type === "UNKNOWN"
                            )}
                            hideIcon={true}
                        >
                            <LogMessages
                                logs={rawData?.transaction?.meta?.logMessages ||
                                    []}
                            />
                        </Collapse>
                    </div>
                {/if}
            {/if}
        </div>
    {/if}
{:else}
    <h2 class="mb-6 mt-20 text-center text-lg opacity-90">
        Transaction not found. Try selecting another network.
    </h2>
    <Network />
{/if}
