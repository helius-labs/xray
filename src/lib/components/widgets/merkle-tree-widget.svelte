<script lang="ts">
    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";
    import Icon from "$lib/components/icon.svelte";
    import { PublicKey } from "@solana/web3.js";

    export let account: string = "";

    const client = trpcWithQuery($page);

    const merkleTree = client.concurrentMerkleTree.createQuery(account);

    $: currentRoot = new PublicKey($merkleTree.data?.root.data || []);
</script>

<div class="my-4">
    <div class="">
        <div class="">
            <h2 class="text-2xl font-bold">Merkle Tree</h2>
        </div>
        <div class="flex items-center gap-2">
            <Icon
                id="key"
                size="sm"
            />
            <div>
                <div class="font-semibold">Authority</div>
                <div class="text-sm text-xs text-neutral">{$merkleTree?.data?.authority}</div>
            </div>

        </div>
    </div>
</div>