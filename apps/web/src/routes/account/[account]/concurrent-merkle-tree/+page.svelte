<script lang="ts">
    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";

    const client = trpcWithQuery($page);
    const account = $page.params.account;

    const cmt = client.concurrentMerkleTree.createQuery(account);

    $: console.log($cmt.data);
</script>

<div />
