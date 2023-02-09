<script lang="ts">
    import "../app.postcss";
    
    import Nav from "$lib/components/nav.svelte";
        
    import { QueryProvider } from "$lib/state";

    import getSolanaPrice from "$lib/state/actions/get-solana-price";

    const queries = {
        "solana-price" : {
            load : () => getSolanaPrice(),
        },
    };

</script>

<QueryProvider {queries}>
    <Nav />
    <main class="min-h-screen">
        <slot />
    </main>
</QueryProvider>

