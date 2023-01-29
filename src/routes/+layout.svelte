<script lang="ts">
    import "../app.postcss";
    
    import { browser } from "$app/environment";

    import { QueryClient, QueryClientProvider } from "@tanstack/svelte-query";

    import Nav from "$lib/components/nav.svelte";

    // Create a client
    const queryClient = new QueryClient({
        defaultOptions : {
            queries : {
                enabled : browser,
            },
        },
    });

</script>

<QueryClientProvider client={queryClient}>
    <Nav />
    <main class="min-h-screen">
        <slot />
    </main>
</QueryClientProvider>

