<script lang="ts">
    import { trpcWithQuery } from "$lib/trpc/client";
    import { page } from "$app/stores";
    import IntersectionObserver from "svelte-intersection-observer";
    export let address: string;
    let intersecting = false;
    const client = trpcWithQuery($page);
</script>
