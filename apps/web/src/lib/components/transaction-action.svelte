<script lang="ts">
    import { state } from "svelte-snacks";
    
    import type {
        UITokenMetadata,
        UITransactionAction
    } from "$lib/types";
    
    import { fly } from "svelte/transition";

    import { getSolanaName } from "@helius-labs/helius-namor";

    import Icon from "$lib/icon";
    import IconCard from "$lib/components/icon-card.svelte";

    import shortenString from "$lib/util/shorten-string";

    import IntersectionObserver from "svelte-intersection-observer";

    import type { QueryStore } from "svelte-snacks";

    import cap from "$lib/util/cap";
    import formatMoney from "../util/format-money";
        
    export let action:UITransactionAction;
   
    const tokenRegistry = state("solanaTokenRegistry");

    const address = action?.received ||  action?.sent || "unknown";

    let label = "";
    let isLoading = true;
    let intersecting = false;
    let element:HTMLElement;
    let solanaToken:QueryStore;
    const isNFT = false;

    if(address) {
        solanaToken = state([ "solanaToken", address ], address);
    }
    
    const metadata:UITokenMetadata = {
        address,
        image : "",
        name  : "",
    };
        
    $: tokenDetails = $tokenRegistry.data.get ? $tokenRegistry.data.get(address) : {};

    $: if(intersecting) {
        if(tokenDetails) {
            metadata.name = tokenDetails?.symbol;
            metadata.image = tokenDetails?.logoURI;
        } else {
            metadata.name = $solanaToken.data?.offChainData?.name;
            metadata.image = $solanaToken.data?.offChainData?.image;
        }

        isLoading = false;
    }

    $: displayName = cap(getSolanaName(action?.sentTo || action?.receivedFrom || action?.signature));

    $: txName = getSolanaName(action?.signature)?.split(" ")
        .slice(0, 3)
        .join(" ");

    $: title = metadata?.name || txName;

    $: if(action?.actionType === "TRANSFER_SENT") {
        label = `To: ${displayName}`;
    } else if(action?.actionType === "TRANSFER_RECEIVED") {
        label = `From: ${displayName}`;
    } else if(action?.actionType === "SWAP_RECEIVED") {
        label = `For: ${displayName} / ${shortenString(action?.from, 6)}`;
    } else if(action?.actionType === "SWAP_SENT") {
        label = `Swapped: ${displayName}`;
    } else {
        label = `Tx: ${shortenString(action?.signature, 10)}`;
    }
</script>

<IntersectionObserver
    {element}
    once
    rootMargin="100px"
    bind:intersecting>
    <div
        bind:this={element}
        class="min-h-28">
        {#if intersecting}
            <IconCard>
                <div slot="icon">
                    {#if isLoading}
                        <button class="btn-ghost loading"></button>
                    {:else}
                        {#if metadata.image}
                            <img
                                class="rounded w-full"
                                alt="token symbol"
                                src={metadata.image} />
                        {:else}
                            <Icon
                                id="lighting"
                                fill="success"
                                size="md" />
                        {/if}
                    {/if}
                </div>
                <div slot="title">
                    <div>
                        <h4
                            class="m-0 font-bold text-md"
                            class:text-lg={metadata.name}>{title}</h4>
    
                        <p class="m-0 opacity-50 text-xs">{label}</p>
                    </div>
    
                    {#if action?.actionType === "TRANSFER_SENT" || action?.actionType === "SWAP_SENT"}
                        <h4 class="font-bold text-sm md:text-lg text-error absolute right-2 top-3">
                            - {metadata.name === "USDC" ? formatMoney(action.amount) : action.amount}
                        </h4>
                    {:else if action?.actionType === "TRANSFER_RECEIVED" || action?.actionType === "SWAP_RECEIVED"}
                        <h4 class="font-bold text-sm md:text-lg text-success absolute right-2 top-3">
                            + {metadata.name === "USDC" ? formatMoney(action.amount) : action.amount}
                        </h4>
                    {:else if action?.type === "TRANSFER"}
                        <h4 class="text-black font-bold text-sm absolute right-2 top-3">
                            {action?.amount}
                        </h4>
                    {/if}
                </div>
            </IconCard>
        {/if}
    </div>
</IntersectionObserver>
