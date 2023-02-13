<script lang="ts">
    import "../app.postcss";

    import { browser } from "$app/environment";

    import Nav from "$lib/components/nav.svelte";
        
    import { SnackProvider } from "svelte-snacks";

    import * as queries from "$lib/state/queries";
</script>

<SnackProvider config={{ disable : !browser, queries }}>
    <Nav />
    <main>
        <slot />
    </main>
</SnackProvider>

