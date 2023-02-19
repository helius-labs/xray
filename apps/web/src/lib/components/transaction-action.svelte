<script lang="ts">
    import {
        UITransactionActionType,
        type UITokenMetadata,
        type UITransactionAction,
    } from "$lib/types";
    import type { QueryStore } from "svelte-snacks";

    import { state } from "svelte-snacks";

    import IntersectionObserver from "svelte-intersection-observer";

    import { ProtonSupportedType } from "@helius-labs/xray-proton";
    import { getSolanaName } from "@helius-labs/helius-namor";

    import Icon from "$lib/components/icon.svelte";

    import IconCard from "$lib/components/icon-card.svelte";

    import cap from "$lib/util/cap";
    import formatMoney from "$lib/util/format-money";
    import shortenString from "$lib/util/shorten-string";
    import prettyDate from "../util/pretty-date";

    export let action: UITransactionAction;

    const tokenRegistry = state("solanaTokenRegistry");

    let address = "";

    if (
        action?.type === "BURN" ||
        action?.type === "BURN_NFT" ||
        action?.type === "NFT_BID" ||
        action?.type === "NFT_BID_CANCELLED" ||
        action?.type === "NFT_CANCEL_LISTING" ||
        action?.type === "NFT_LISTING" ||
        action?.type === "NFT_SALE" ||
        action?.type === "NFT_MINT"
    ) {
        address = action?.sent || "";
    } else if (action?.type === "TRANSFER" || action?.type === "SWAP") {
        address = action?.received || action?.sent || "";
    }

    let label = "";
    let isLoading = true;
    let intersecting = false;
    let element: HTMLElement;
    let solanaToken: QueryStore;

    if (address) {
        solanaToken = state(["solanaToken", address], address);
    }

    const metadata: UITokenMetadata = {
        address,
        image: "",
        name: "",
    };

    $: ({ formatted: date } = prettyDate(action.timestamp));

    $: tokenDetails = $tokenRegistry.data.get
        ? $tokenRegistry.data.get(address)
        : {};

    $: if (intersecting) {
        if (tokenDetails) {
            metadata.name = tokenDetails?.symbol;
            metadata.image = tokenDetails?.logoURI;
        } else {
            metadata.name =
                $solanaToken?.data?.offChainMetadata?.metadata?.name;
            metadata.image =
                $solanaToken?.data?.offChainMetadata?.metadata?.image;
        }

        isLoading = false;
    }

    $: displayName = cap(
        getSolanaName(
            action?.sentTo || action?.receivedFrom || action?.signature
        )
    );

    $: txName = getSolanaName(action?.signature)
        ?.split(" ")
        .slice(0, 3)
        .join(" ");

    $: title = metadata?.name || txName;

    $: supported = Object.keys(ProtonSupportedType).includes(action?.type);

    $: if (action?.actionType === "TRANSFER_SENT") {
        label = `To: ${displayName}`;
    } else if (action?.actionType === "TRANSFER_RECEIVED") {
        label = `From: ${displayName}`;
    } else if (action?.actionType === "SWAP_RECEIVED") {
        label = `For: ${displayName} / ${shortenString(action.received, 6)}`;
    } else if (action?.actionType === "SWAP_SENT") {
        label = `Swapped: ${displayName}`;
    } else if (action?.type === "TRANSFER" || action?.type === "SWAP") {
        label = `From: ${shortenString(
            action?.receivedFrom,
            4
        )}  To: ${shortenString(action?.sentTo, 4)}`;
    } else if (action?.type === "NFT_SALE") {
        label = `Sold: ${shortenString(
            action?.receivedFrom,
            4
        )}  To: ${shortenString(action?.sentTo, 4)}`;
    } else {
        label = `Tx: ${shortenString(action?.signature, 4)}`;
    }
</script>

<IntersectionObserver
    {element}
    once
    rootMargin="100px"
    bind:intersecting
>
    <div
        bind:this={element}
        class="min-h-28"
    >
        {#if intersecting}
            <IconCard>
                <div slot="icon">
                    {#if isLoading}
                        <button class="btn-ghost loading" />
                    {:else if supported && action?.type !== "UNKNOWN"}
                        {#if metadata.image}
                            <img
                                class="max-w-3 w-full rounded"
                                alt="token symbol"
                                src={metadata.image}
                            />
                        {:else}
                            <div class="rounded bg-secondary p-3">
                                <span class="opacity-70">
                                    <Icon id="image" />
                                </span>
                            </div>
                        {/if}
                    {:else}
                        <Icon
                            id="lightning"
                            fill="success"
                            size="md"
                        />
                    {/if}
                </div>
                <div slot="title">
                    <div class="flex items-center justify-between">
                        <div>
                            <h4
                                class="text-md m-0 font-bold"
                                class:text-lg={metadata.name}
                            >
                                {title}
                            </h4>

                            <p class="m-0 text-xs opacity-50">{label}</p>
                        </div>

                        <div class="text-right">
                            {#if action?.actionType === "TRANSFER_RECEIVED" || action?.actionType === "SWAP_RECEIVED"}
                                <h4
                                    class="mb-1 text-sm font-bold text-success md:text-lg"
                                >
                                    + {metadata.name === "USDC"
                                        ? formatMoney(action.amount)
                                        : action.amount}
                                </h4>
                            {:else if action?.actionType === "TRANSFER_SENT" || action?.actionType === "SWAP_SENT"}
                                <h4
                                    class="mb-1 text-sm font-bold text-error md:text-lg"
                                >
                                    - {metadata.name === "USDC"
                                        ? formatMoney(action.amount)
                                        : action.amount}
                                </h4>
                            {:else if action?.type === "TRANSFER"}
                                <h4 class="mb-2 text-sm font-bold">
                                    {action?.amount}
                                </h4>
                            {:else if action?.actionType === "NFT_SOLD"}
                                <h4
                                    class="text mb-2 text-sm font-bold text-error"
                                >
                                    - 1 {metadata?.name || "NFT"}
                                </h4>
                                <h4 class="mb-2 text-sm font-bold text-success">
                                    + {action?.amount} SOL
                                </h4>
                            {:else if action?.actionType === "NFT_BOUGHT"}
                                <h4
                                    class="text mb-2 text-sm font-bold text-success"
                                >
                                    + 1 {metadata?.name || "NFT"}
                                </h4>
                                <h4 class="mb-2 text-sm font-bold text-error">
                                    - {action?.amount} SOL
                                </h4>
                            {/if}
                        </div>
                    </div>
                </div>
            </IconCard>
        {/if}
    </div>
</IntersectionObserver>
