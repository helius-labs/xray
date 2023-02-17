<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 4rem;
    }
</style>

<script lang="ts">
    import "../app.postcss";

    import Nav from "$lib/components/nav.svelte";
    import DevBanner from "$lib/components/dev-banner.svelte";

    import { SnackProvider } from "svelte-snacks";

    import * as queries from "$lib/state/queries";
</script>

<SnackProvider config={{ queries }}>
    <main class="grid min-h-screen">
        <DevBanner />
        <Nav />

        <div class="relative px-3">
            <slot />
        </div>
    </main>
</SnackProvider>
