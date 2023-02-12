<script lang="ts">
    import type {
        UITransaction,
        UITransactionActionGroup
    } from "$lib/types";

    import {
        groupTransactionActions,
        mergeTransactionActions
    } from "$lib/util/transactions";

    import Icon from "$lib/icon";
    
    export let transactions:UITransaction[];
    export let user:string = "";

    let groups:UITransactionActionGroup[] = [];

    $: if(transactions?.length) {
        const merged = mergeTransactionActions(transactions, user);

        groups = groupTransactionActions(merged);
    }
</script>

{#each groups as {
    label,
    icon,
    type,
    actions,
    timestamp,
}}

    <div class="flex">
        <div class="flex">
            <Icon id={icon} />
            <p class="text-micro">
                {label}
            </p>
        </div>

    </div>

    {#each actions as action}
        <div class="card"></div>
    {/each}
{/each}
