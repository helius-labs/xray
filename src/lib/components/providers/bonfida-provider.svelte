<script lang="ts">
    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    const client = trpcWithQuery($page);
</script>
