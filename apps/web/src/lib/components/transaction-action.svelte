<script lang="ts">
    import type {
        Token,
        WebTranscationAction
    } from "$lib/types";
    
    import { state } from "svelte-snacks";
    
    import {
        fly,
        scale
    } from "svelte/transition";

    import { page } from "$app/stores";
    import { getSolanaName } from "@helius-labs/helius-namor";

    import Icon from "$lib/icon";

    import { cubicOut } from "svelte/easing";

    import shortenString from "$lib/util/shorten-string";

    import IntersectionObserver from "svelte-intersection-observer";

    import type { QueryStore } from "svelte-snacks";
        
    export let action:WebTranscationAction;
    export let owner:string;
    export let index:number;
   
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
    
    const metadata:Token = {
        address,
        image : "",
        name  : "",
    };

    const cap = (string:string = "") => string
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

    $: if($page.url.searchParams.get("wallet")) {
        if(action?.sentTo === owner) {
            action.type = "TRANSFER_RECEIVED";
        } else if(action?.receivedFrom === owner) {
            action.type = "TRANSFER_SENT";
        }
    }
        
    $: tokenDetails = $tokenRegistry.data.get(address);

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

    $: if(action?.type === "TRANSFER_SENT") {
        label = `To: ${displayName}`;
    } else if(action?.type === "TRANSFER_RECEIVED") {
        label = `From: ${displayName}`;
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
            <div
                class="card grid grid-cols-12 gap-3"
                in:fly={{
                    delay  : index < 25 ? index * 500 : 0,
                    easing : cubicOut,
                    y      : 50,
                }}
            >
                <div class="col-span-2 md:col-span-1 center relative">
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
                <div class="col-span-10 md:col-span-11  flex justify-between">
                    <div>
                        <h4
                            class="m-0 font-bold text-md"
                            class:text-lg={metadata.name}>{title}</h4>
    
                        <p class="m-0 opacity-50 text-xs">{label}</p>
                    </div>
    
                    {#if action?.type === "TRANSFER_SENT"}
                        <h4 class="font-bold text-sm text-error absolute right-2 top-3">
                            - {action?.amount}
                        </h4>
                    {:else if action?.type === "TRANSFER_RECEIVED"}
                        <h4 class="font-bold text-sm text-success absolute right-2 top-3">
                            + {action?.amount}
                        </h4>
                    {:else if action?.type === "TRANSFER"}
                        <h4 class="text-black font-bold text-sm absolute right-2 top-3">
                            {action?.amount}
                        </h4>
                    {/if}
                </div>
            </div>
        {/if}
    </div>
</IntersectionObserver>
