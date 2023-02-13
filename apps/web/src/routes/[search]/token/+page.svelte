<script>
    import { onMount } from "svelte";
    
    import { page } from "$app/stores";

    import { state } from "svelte-snacks";

    const address = $page.params.search;
 
    const token = state([ "solanaToken", address ], address);

</script>

<h1>Token</h1>

{#if $token.isLoading}
    <button class="btn btn-ghost loading"></button>
{:else}
    <div class="card">
        <pre>{JSON.stringify($token?.data)}</pre>
    </div>
{/if}

