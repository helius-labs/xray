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
    <div class="flex justify-between items-center">
        <div class="flex my-5 items-center">
            <div>
                <h2 class="text-2xl font-bold">Activity</h2>
                <a
                    href="/account/{account}"
                    class="link-neutral pointer-events-auto border border-x-0 border-t-0 border-dotted hover:link-success"
                >
                    {shortenString(
                        account
                    )}
                </a>
            </div>
        </div>
        <div class="flex">
            <a href="/account/{account}" class="mr-3 btn btn-outline btn-md">
                <Icon id="arrowLeft" size="md" />
                <span class="ml-2">
                    Account
                </span>
            </a>
            <button
            class="btn-outline btn"
            on:click={() => showModal("TRANSACTION_FILTER")}
        >
            <Icon id="settings" />
            <span class="ml-2">
                Filter
            </span>
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