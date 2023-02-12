<script lang="ts">
    import { state } from "svelte-snacks";

    import Icon from "$lib/icon";

    import { page } from "$app/stores";

    const address = $page.params.search;

    const tokenRegistry = state("solanaTokenRegistry");

    const solanaToken = state([ "solanaToken", address ], address);
    
    interface TokenInput {
        address: string
        amount: number
    }

    interface Token {
        image: string,
        name: string,
        address: string,
    }
    
    export let token:TokenInput;

    let isLoading = true;
    
    const metadata:Token = {
        image   : "",
        name    : "",
        address : token.address,
    };

    $: if($tokenRegistry.hasFetched) {
        const tokenDetails = $tokenRegistry.data.get(token?.address);

        if(!metadata) {
            // is NFT
            $solanaToken.load();
        } else {
            metadata.image = tokenDetails?.logoURI;
            metadata.name = tokenDetails?.symbol;
            isLoading = false;
        }
    }

    $: if($solanaToken.hasFetched) {
        isLoading = false;

        if($solanaToken.data?.name) {
            metadata.name = $solanaToken.data?.name;
            metadata.image = $solanaToken.data?.image;
        } else {
            metadata.name = "";
            metadata.image = "";
        }
    }
</script>

<div class="card grid grid-cols-12 gap-3">
    <div class="col-span-1 center">
        {#if isLoading}
            <button class="btn-ghost loading"></button>
        {:else}
            {#if metadata.image}
                <img
                    class="w-full rounded-full"
                    alt="token symbol"
                    src={metadata.image} />
            {:else}
                <Icon id="question" />
            {/if}
        {/if}
    </div>
    <div class="col-span-5">
        <h4 class="m-0 font-bold text-lg">{metadata.name || "UNKNOWN"}</h4>
        <p class="m-0 opacity-50">
            {token.amount}
        </p>
    </div>
</div>
