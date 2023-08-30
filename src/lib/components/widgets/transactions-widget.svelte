<script lang="ts">
    import { page } from "$app/stores";

    import Icon from "$lib/components/icon.svelte";
    import Transactions from "$lib/components/transactions.svelte";
    import { filterStore } from "$lib/util/stores/filter";

    export let account: string = "";
</script>

<div>
    <div class="my-3 flex justify-between">
        <h2 class="text-xl font-bold">Activity</h2>

        <a
            href="/account/{account}/activity"
            class="btn btn-outline btn-sm"
        >
            <Icon
                id="arrowRight"
                size="md"
            />
        </a>
    </div>

    <Transactions
        {account}
        filter={$filterStore}
        user={account}
        limit={10}
    />
</div>
