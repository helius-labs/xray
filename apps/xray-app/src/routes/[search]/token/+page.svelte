<script>
    import { page } from "$app/stores";
    
    import tokenQuery from "$lib/state/queries/solana-token";

    const token = tokenQuery($page.params.search);

</script>

<h1>Token</h1>

{#if $token.isFetching}
    <button class="btn btn-ghost loading"></button>
{:else}
    <div class="card">
        <pre>{JSON.stringify($token?.data)}</pre>
    </div>
{/if}

