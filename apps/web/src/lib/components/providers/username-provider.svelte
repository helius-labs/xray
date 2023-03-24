<script lang="ts">
    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    const client = trpcWithQuery($page);

    export let address: string = "";

    const usernameData = client.accountUsernames.createQuery(address, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    $: usernames = $usernameData?.data || [];
</script>

<slot {usernames} />
