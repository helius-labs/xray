<script lang="ts">
    import "../app.postcss";
    
    import Nav from "$lib/components/nav.svelte";
        
    import { QueryProvider } from "$lib/state";
</script>

<QueryProvider>
    <Nav />
    <main class="min-h-screen">
        <slot />
    </main>
</QueryProvider>

