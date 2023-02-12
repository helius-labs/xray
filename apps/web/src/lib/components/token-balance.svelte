<script lang="ts">
    import query from "$lib/state";
    import Icon from "$lib/icon";

    const tokenRegistry = query("solana-token-registry");

    interface TokenInput {
        address: string
        amount: number
    }

    export let token:TokenInput;

    let details = {
        logoURI : "",
        amount  : 0,
        symbol  : "",
    };

    const fetchMetadata = async () => {
        const response = await fetch(`/api/solana/${token.address}/token`);

        const { data } = await response.json();

        details.logoURI = data?.offChainData.image;
        details.symbol = data?.offChainData.symbol;
    };

    $: if($tokenRegistry.data.has && token) {
        details = $tokenRegistry.data.has(token?.address) ? $tokenRegistry.data.get(token?.address) : {};

        if(!$tokenRegistry.data.has(token?.address)) {
            fetchMetadata();
        }
    }
</script>

<div class="card grid grid-cols-12 gap-3">
    <div class="col-span-1 center">
        {#if details.logoURI}
            <img
                class="w-full rounded-full"
                alt="token symbol"
                src={details.logoURI} />
        {:else}
            <Icon id="question" />
        {/if}
    </div>
    <div class="col-span-5">
        <h4 class="m-0 font-bold text-lg">{details.symbol || "UNKNOWN"}</h4>
        <p class="m-0 opacity-50">
            {token.amount}
        </p>
    </div>
</div>
