<script lang="ts">
    import type { ProtonTransaction } from "@helius-labs/xray";

    export let transaction: ProtonTransaction | undefined;
    export let index: number | undefined;
    export let userAccount: string | undefined;

    import { transactionActionsMetadata } from "$lib/types";

    import formarDate from "$lib/util/format-date";

    import AssetProvider from "$lib/components/providers/asset-provider.svelte";

    import { FileCog, Hash, User, Box, Coins } from "lucide-svelte";
    import shortenString from "$lib/util/shorten-string";

    const getIconComponent = (type: string) =>
        // @ts-ignore
        transactionActionsMetadata[type]?.lucideIcon ||
        transactionActionsMetadata.UNKNOWN.lucideIcon;

    const formatType = (str: string) =>
        str
            .split("_")
            .map((s) => s[0].toUpperCase() + s.slice(1).toLowerCase())
            .join(" ")
            .replaceAll("Nft", "NFT")
            .replaceAll("Sft", "SFT")
            .replaceAll("Unknown", "Generic Tx")
            .replaceAll("Compressed ", "");

    const received = (str: string) =>
        str.includes("RECEIVED") ||
        str.includes("MINTED") ||
        str.includes("AIRDROP");

    const amount = (amount: number) =>
        amount.toFixed(2).endsWith(".00")
            ? amount.toFixed(0)
            : amount.toFixed(2);

    const sent = (str: string) => str.includes("SENT");

    $: transactionType = transaction ? formatType(transaction.type) : "";
    $: compressed = transaction?.type.includes("COMPRESSED");
</script>

{#if transaction}
    <!-- <div
        class="dark-card min-h-8 relative mb-10 border !p-0 !pt-3 hover:cursor-pointer hover:border-gray-400"
        class:mt-[3.25rem]={compressed}
    > -->
    <!-- <a
            href={`/account/${userAccount}/transactions/compressed`}
            class="btn-sm btn absolute -top-4 -left-1 border-transparent bg-black text-xs text-gray-300 hover:bg-black"
            class:pt-1={compressed}
        >
            {#if compressed}
                <a
                    class="btn-ghost btn-xs btn absolute -top-4 -left-0  h-1 border-transparent bg-black pb-0 text-gray-300 hover:border-gray-400 hover:bg-black"
                    ><span class="text-[10px] text-warning">Compressed</span></a
                >
            {/if}

            <svelte:component
                this={getIconComponent(transaction.type)}
                size={20}
            />

            {#if transactionType}
                <div class="ml-1 text-sm">
                    {transactionType}
                </div>
            {/if}
        </a> -->

    <!-- <div
            class="absolute -top-3  -right-1 rounded border-transparent bg-secondary p-1 text-[10px] text-gray-300"
        >
            {formarDate(transaction.timestamp)}
        </div> -->

    <!-- <div class="ml-2 mt-3 flex text-xs">
            <span class="opacity-50">
                <FileCog size={14} />
            </span>

            <span
                class="tooltip ml-1 "
                data-tip="Program"
            >
                <span class="opacity-50">
                    {formatType(transaction.source)}
                </span>
            </span>

            <span class="ml-3 opacity-50">
                <Hash size={14} />
            </span>

            <span
                class="tooltip ml-1 "
                data-tip="Signature"
            >
                <span class="opacity-50">
                    {shortenString(transaction.signature, 4)}
                </span>
            </span>
        </div> -->

    {#if transaction.actions.length < 1}
        <div class="p-2">
            <i class="text-xs opacity-40">Click for more details</i>
        </div>
    {/if}

    {#each transaction.actions as action}
        {@const id = action.sent || action.received}

        {@const isReceived = received(action.actionType)}
        {@const isSent = sent(action.actionType)}

        <AssetProvider
            {id}
            let:asset
        >
            {JSON.stringify(asset)}
            <!-- <div class="flex items-center justify-between pr-3">
                    <div class="relative flex items-center py-3 pl-6">
                        <div
                            class="absolute left-0 top-1/2 h-[1px] w-5 -translate-y-1/2 bg-white opacity-20"
                        />

                        <a href="/token/{asset.data?.id}">
                            <img
                                src={asset.data?.imagePreview}
                                class="aspect-square w-8 rounded bg-secondary bg-cover bg-center hover:scale-125"
                                alt=""
                            />
                        </a>

                        {#if transaction.type.includes("MINT") || transaction.type.includes("BORROW") || transaction.type.includes("BURN") || transaction.type.includes("LISTING") || transaction.type.includes("LOAN") || transaction.type.includes("SELL")}
                            <div class="mr-1 flex text-xs opacity-50">
                                <p class="ml-2">
                                    {action.sent ? "Sent" : "Received"}
                                </p>
                            </div>

                            <a
                                href="/token/{action.sent || action.received}"
                                class="link flex text-xs"
                            >
                                {shortenString(
                                    action.sent || action.received,
                                    4
                                )}
                            </a>
                        {:else if isReceived}
                            <p class="ml-2 flex text-xs opacity-95">
                                <span class="opacity-50">Reveived </span>

                                {#if asset.data.name}
                                    <span class="mx-1"
                                        >{asset.data.name || ""}</span
                                    >
                                {/if}

                                <span class="ml-1 opacity-50">from</span>

                                <span class="mx-1">
                                    <User size={14} />
                                </span>

                                <a
                                    href="/account/{action.from}"
                                    class="link"
                                >
                                    {shortenString(action.to, 4)}
                                </a>
                            </p>
                        {:else if isSent}
                            <p class="ml-2 flex text-xs opacity-95">
                                <span class="opacity-50">Sent </span>

                                {#if asset.data.name}
                                    <span class="mx-1"
                                        >{asset.data.name || ""}</span
                                    >
                                {/if}

                                <span class="ml-1 opacity-50">to</span>

                                <span class="mx-1">
                                    <User size={14} />
                                </span>

                                <a
                                    href="/account/{action.to}"
                                    class="link"
                                >
                                    {shortenString(action.to, 4)}
                                </a>
                            </p>
                        {:else if transaction.type.includes("TRANSFER")}
                            <p class="ml-2 flex text-xs opacity-95">
                                {#if action.from}
                                    <span class="opacity-50">Reveived </span>
                                {:else if action.to}
                                    <span class="opacity-50">Sent </span>
                                {/if}

                                {#if asset.data.name}
                                    <span class="mx-1"
                                        >{asset.data.name || ""}</span
                                    >
                                {/if}

                                <span class="ml-1 opacity-50"
                                    >{action.from ? "from" : "to"}</span
                                >

                                <span class="mx-1">
                                    <User size={14} />
                                </span>

                                <a
                                    href="/account/{isReceived
                                        ? action.from
                                        : action.to}"
                                    class="link"
                                >
                                    {shortenString(action.to, 4)}
                                </a>
                            </p>
                        {/if}
                    </div>

                    <p
                        class:text-success={isReceived ||
                            (action.from && action.from !== userAccount)}
                        class:text-error={isSent ||
                            (action.to && action.to !== userAccount)}
                    >
                        {#if isReceived || (action.from && action.from !== userAccount)}
                            <span>+</span>
                        {:else if isSent || (action.to && action.to !== userAccount)}
                            <span>-</span>
                        {/if}

                        {amount(action.amount)}
                    </p>
                </div> -->
        </AssetProvider>
    {/each}
    <!-- </div> -->
{/if}
