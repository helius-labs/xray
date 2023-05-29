<script lang="ts">
    export let id: string;

    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";
    import { onMount } from "svelte";

    const client = trpcWithQuery($page);

    const getToken = (id: string) => client.token(id);
    const getAsset = (id: string) => client.asset(id);

    onMount(async () => {
        const token = await getAsset(id);
        const asset = await getToken(id);

        console.log({ asset, token });
    });
</script>
