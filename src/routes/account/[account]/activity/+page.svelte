<script>
    import Icon from "$lib/components/icon.svelte";
    import shortenString from "$lib/util/shorten-string";
    import Transactions from "$lib/components/transactions.svelte";
    import { filterStore } from "$lib/util/stores/filter";
    import { showModal } from "$lib/state/stores/modals";

    import { page } from "$app/stores";

    const { account } = $page.params;
</script>

<div>
    <div class="flex items-center justify-between">
        <div class="my-5 flex items-center">
            <div>
                <h2 class="text-2xl font-bold">Activity</h2>
                <a
                    href="/account/{account}"
                    class="link-neutral pointer-events-auto border border-x-0 border-t-0 border-dotted hover:link-success"
                >
                    {shortenString(account)}
                </a>
            </div>
        </div>
        <div class="flex">
            <a
                href="/account/{account}"
                class="btn btn-outline btn-md mr-3"
            >
                <Icon
                    id="arrowLeft"
                    size="md"
                />
                <span class="ml-2"> Account </span>
            </a>
            <button
                class="btn btn-outline"
                on:click={() => showModal("TRANSACTION_FILTER")}
            >
                <Icon id="settings" />
                <span class="ml-2"> Filter </span>
            </button>
        </div>
    </div>
    <div>
        <Transactions
            {account}
            filter={$filterStore}
            user={account}
        />
    </div>
</div>
