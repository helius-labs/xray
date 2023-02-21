<script lang="ts">
    import type { UITransactionAction } from "$lib/types";

    import { get } from "svelte/store";

    import IntersectionObserver from "svelte-intersection-observer";

    import { ProtonSupportedType } from "@helius-labs/xray-proton";
    import { getSolanaName } from "@helius-labs/helius-namor";

    import Icon from "$lib/components/icon.svelte";

    import IconCard from "$lib/components/icon-card.svelte";
    import TokenProvider from "$lib/components/providers/token-provider.svelte";

    import cap from "$lib/util/cap";
    import formatMoney from "$lib/util/format-money";
    import shortenString from "$lib/util/shorten-string";

    export let action: UITransactionAction;

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
    let element: HTMLElement;

    $: displayName = cap(
        getSolanaName(
            action?.sentTo || action?.receivedFrom || action?.signature
        )
    );

    $: txName = getSolanaName(action?.signature)
        ?.split(" ")
        .slice(0, 3)
        .join(" ");

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
    let:intersecting
>
    <div>
        {#if intersecting || true}
            <TokenProvider
                search={address}
                let:token
                let:metadata
            >
                <div
                    bind:this={element}
                    class="min-h-28"
                >
                    <IconCard>
                        <div
                            slot="icon"
                            class="h-full"
                        >
                            {#if supported && action?.type !== "UNKNOWN"}
                                {#if metadata.image}
                                    <img
                                        class="max-w-3 h-full w-full rounded object-contain"
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
                                        {metadata.name ? metadata.name : txName}
                                    </h4>

                                    <p class="m-0 text-xs opacity-50">
                                        {label}
                                    </p>
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
                                        <h4
                                            class="mb-2 text-sm font-bold text-success"
                                        >
                                            + {action?.amount} SOL
                                        </h4>
                                    {:else if action?.actionType === "NFT_BOUGHT"}
                                        <h4
                                            class="text mb-2 text-sm font-bold text-success"
                                        >
                                            + 1 {metadata?.name || "NFT"}
                                        </h4>
                                        <h4
                                            class="mb-2 text-sm font-bold text-error"
                                        >
                                            - {action?.amount} SOL
                                        </h4>
                                    {/if}
                                </div>
                            </div>
                        </div>
                    </IconCard>
                </div>
            </TokenProvider>
        {/if}
    </div>
</IntersectionObserver>
