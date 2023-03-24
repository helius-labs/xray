<script lang="ts">
    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    const client = trpcWithQuery($page);

    export let address: string = "";

    const usernames = client.accountUsernames.createQuery(address, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });
</script>

<slot {usernames} />
