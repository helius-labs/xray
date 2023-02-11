<script lang="ts">
    import { page } from "$app/stores";

    import query from "$lib/state";

    import TxType from "$lib/components/transaction/type.svelte";
    import TxTokenPreview from "$lib/components/transaction/token-preview.svelte";
    import TxNFTDetails from "$lib/components/transaction/nft-preview.svelte";
    import TxSendReceive from "$lib/components/transaction/send-receive.svelte";
    import TxSwap from "$lib/components/transaction/swap.svelte";
    import TxFooter from "$lib/components/transaction/footer.svelte";
    import shortenString from "src/lib/util/shorten-string";
    import Icon from "src/lib/icon/icon.svelte";
  
    const tokenRegistry = query("solana-token-registry");

    const transaction = query("solana-transaction");

    $: if($transaction?.load && $page.params.search) {
        $transaction.load($page.params.search);
    }
</script>

{#if $page.url.searchParams.get("wallet")}
    <a
        class="btn btn-ghost mb-6 pl-0"
        href="/{$page.url.searchParams.get("wallet")}/wallet">
        <Icon id="arrow-left" />
        <span class="ml-3">Back to Wallet</span>
    </a>
{/if}

{#if $transaction?.isLoading}
    <p>Loading...</p>
{:else if $transaction?.isError}
    <p>Error: {$transaction?.error}</p>
{:else if $transaction?.hasFetched}
    <div class="card prose mb-6">
        <div class="flex justify-between items-center">
            <div>
                <h4 class="font-bold opacity-50 m-0">Transaction</h4>
                <div class="flex items-center">
                    <h3 class="m-0">{shortenString($transaction?.data?.parsed?.signature || "")}</h3>
                    <button class="btn btn-ghost">
                        <Icon id="copy" />
                    </button>
                </div>
            </div>
            <div>
                <div class="badge badge-success h-8 px-3">
                    Success
                </div>
            </div>
        </div>
    </div>

    {#each $transaction?.data?.parsed?.actions as {
        from,
        to,
        amount,
        sent,
    }}
        <hr class="opacity-25 my-8">
        <div class="grid grid-cols-4 gap-4 mb-10">
            <div class="col-span-3">
                <div class="grid grid-cols-12 gap-4">
                    <div class="col-span-4">
                        <div class="card">
                            <div class="center">
                                <Icon id="paper-plane" />
                                <p class="m-0  ml-2 font-bold">Sent</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-8">
                        <div class="card">
                            <div class="flex items-center justify-between">
                                <p class="m-0  ml-2 font-bold opacity-50">
                                    {#if $tokenRegistry.data.has(sent)}
                                        {$tokenRegistry.data.get(sent).symbol}
                                    {:else}
                                        UNKNOWN
                                    {/if}
                                </p>
                                
                                <p class="m-0  ml-2 font-bold">{Number(amount).toFixed(8)}</p>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-5">
                        <div class="card">
                            <div class="flex items-center">
                                <Icon
                                    id="person"
                                    size="md" />
                                <div>
                                    <p class="m-0  ml-2 font-bold opacity-50 text-xs">From</p>
                                    <p class="m-0  ml-2 font-bold">{shortenString(from)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-2 center">
                        <Icon
                            id="arrow-right"
                            size="lg" />
                    </div>
                    <div class="col-span-5">
                        <div class="card">
                            <div class="flex items-center">
                                <Icon
                                    id="person"
                                    size="md" />
                                <div>
                                    <p class="m-0  ml-2 font-bold opacity-50 text-xs">To</p>
                                    <p class="m-0  ml-2 font-bold">{shortenString(to)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-span-1">
                <div class="card h-full center">
                    {#if $tokenRegistry.data.has(sent)}
                        <img
                            class="w-3/4"
                            alt=""
                            src={$tokenRegistry.data.get(sent).logoURI}>
                    {:else}
                        UNKNOWN
                    {/if}
                </div>
            </div>
        </div>
    {/each}
    <!-- <div class="text-xs card mb-3">
        Parsed
        <pre>{JSON.stringify($transaction?.data?.parsed, null, 4)}</pre>
    </div>
    <div class="text-xs card mb-3">
        Raw
        <pre>{JSON.stringify($transaction?.data?.raw, null, 4)}</pre>
    </div> -->
    <!-- <div class="grid grid-col-1 mx-auto">

        <TxType />
        {#if $transaction?.data?.parsed.type === "TRANSFER"}
            {#if $tokenRegistry?.data?.has($transaction?.data?.parsed.actions[0].sent)}
                <TxSendReceive />
                <TxTokenPreview />
            {:else if $tokenRegistry?.hasFetched}
                <TxNFTDetails />
                <TxAction />
            {/if}
        {:else if $transaction?.data?.parsed.type === "SWAP"}
            <TxSwap />
            <TxFooter />
        {/if}
        <TxFooter />
    </div> -->
{/if}

