<script lang="ts">
    import type { UITokenMetadata, UITransactionAction } from "$lib/types";
    import type { QueryStore } from "svelte-snacks";

    import { state } from "svelte-snacks";

    import IntersectionObserver from "svelte-intersection-observer";

    import { ProtonSupportedType } from "@helius-labs/xray-proton";
    import { getSolanaName } from "@helius-labs/helius-namor";

    import Icon from "$lib/icon";

    import IconCard from "$lib/components/icon-card.svelte";

    import cap from "$lib/util/cap";
    import formatMoney from "$lib/util/format-money";
    import shortenString from "$lib/util/shorten-string";

    export let action: UITransactionAction;

    const tokenRegistry = state("solanaTokenRegistry");

    const address = action?.received || action?.sent || "unknown";

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

    $: if ($solanaToken.data?.offChainMetadata?.metadata?.symbol === "MUC") {
        console.log(JSON.stringify($solanaToken.data, null, 2));
    }

    $: tokenDetails = $tokenRegistry.data.get
        ? $tokenRegistry.data.get(address)
        : {};

    $: if (intersecting) {
        if (tokenDetails) {
            metadata.name = tokenDetails?.symbol;
            metadata.image = tokenDetails?.logoURI;
        } else {
            metadata.name = $solanaToken.data?.offChainMetadata?.metadata?.name;
            metadata.image =
                $solanaToken.data?.offChainMetadata?.metadata?.image;
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
    } else {
        label = `Tx: ${shortenString(action?.signature, 10)}`;
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
                        <button class="loading btn-ghost" />
                    {:else if supported}
                        <img
                            class="max-w-3 w-full rounded"
                            alt="token symbol"
                            src={metadata.image}
                        />
                    {:else}
                        <Icon
                            id="question"
                            size="md"
                        />
                    {/if}
                </div>
                <div slot="title">
                    <div>
                        <h4
                            class="text-md m-0 font-bold"
                            class:text-lg={metadata.name}
                        >
                            {title}
                        </h4>

                        <p class="m-0 text-xs opacity-50">{label}</p>
                    </div>

                    {#if action?.actionType === "TRANSFER_SENT" || action?.actionType === "SWAP_SENT"}
                        <h4
                            class="absolute right-2 top-3 text-sm font-bold text-error md:text-lg"
                        >
                            - {metadata.name === "USDC"
                                ? formatMoney(action.amount)
                                : action.amount}
                        </h4>
                    {:else if action?.actionType === "TRANSFER_RECEIVED" || action?.actionType === "SWAP_RECEIVED"}
                        <h4
                            class="absolute right-2 top-3 text-sm font-bold text-success md:text-lg"
                        >
                            + {metadata.name === "USDC"
                                ? formatMoney(action.amount)
                                : action.amount}
                        </h4>
                    {:else if action?.type === "TRANSFER"}
                        <h4
                            class="absolute right-2 top-3 text-sm font-bold text-black"
                        >
                            {action?.amount}
                        </h4>
                    {/if}
                </div>
            </IconCard>
        {/if}
    </div>
</IntersectionObserver>
