<script lang="ts">
    import type { UITransactionAction } from "$lib/types";

    import IntersectionObserver from "svelte-intersection-observer";

    import { ProtonSupportedType } from "@helius-labs/xray-proton";
    import { getSolanaName } from "@helius-labs/helius-namor";

    import Icon from "$lib/components/icon.svelte";

    import IconCard from "$lib/components/icon-card.svelte";
    import TokenProvider from "$lib/components/providers/token-provider.svelte";

    import cap from "$lib/util/cap";
    import formatMoney from "$lib/util/format-money";
    import shortenString from "$lib/util/shorten-string";
    import prettyDate from "../util/pretty-date";

    export let action: UITransactionAction;

    const address = action?.received || action?.sent || "unknown";

    let label = "";
    let isLoading = true;
    let intersecting = false;
    let element: HTMLElement;
   
    $: ({ formatted: date } = prettyDate(action.timestamp));

    $: if (intersecting) {
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
<TokenProvider search={address} let:metadata>
    <div
        bind:this={element}
        class="min-h-28"
    >
        {#if intersecting}
            <IconCard>
                <div slot="icon">
                    {#if isLoading}
                        <button class="loading btn-ghost" />
                    {:else if supported && action?.type !== "UNKNOWN"}
                        <img
                            class="max-w-3 w-full rounded"
                            alt="token symbol"
                            src={metadata.image}
                        />
                    {:else}
                        <Icon
                            id="lightning"
                            fill="success"
                            size="md"
                        />
                    {/if}
                </div>
                <div slot="title">
                    <div class="flex justify-between">
                        <div>
                            <h4
                                class="text-md m-0 font-bold"
                                class:text-lg={metadata.name}
                            >
                                {metadata.name ? metadata.name : txName}
                            </h4>

                            <p class="m-0 text-xs opacity-50">{label}</p>
                        </div>

                        <div class="text-right">
                            {#if action?.actionType === "TRANSFER_SENT" || action?.actionType === "SWAP_SENT"}
                                <h4
                                    class="mb-1 text-sm font-bold text-error md:text-lg"
                                >
                                    - {metadata.name === "USDC"
                                        ? formatMoney(action.amount)
                                        : action.amount}
                                </h4>
                            {:else if action?.actionType === "TRANSFER_RECEIVED" || action?.actionType === "SWAP_RECEIVED"}
                                <h4
                                    class="mb-1 text-sm font-bold text-success md:text-lg"
                                >
                                    + {metadata.name === "USDC"
                                        ? formatMoney(action.amount)
                                        : action.amount}
                                </h4>
                            {:else if action?.type === "TRANSFER"}
                                <h4 class="mb-2 text-sm font-bold">
                                    {action?.amount}
                                </h4>
                            {/if}
                            <p class="m-0 text-xs opacity-50">{date}</p>
                        </div>
                    </div>
                </div>
            </IconCard>
        {/if}
    </div>
</TokenProvider>
</IntersectionObserver>
