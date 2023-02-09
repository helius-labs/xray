<script>
    import { page } from "$app/stores";
    
    import query from "$lib/state";

    const token = query("solana-token");

    $: if($token?.load) {
        $token.load($page.params.search);
    }
</script>

<h1>Token</h1>

{#if $token.isLoading}
    <button class="btn btn-ghost loading"></button>
{:else}
    <div class="card">
        <pre>{JSON.stringify($token?.data)}</pre>
    </div>
{/if}

