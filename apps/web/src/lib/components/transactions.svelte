<script lang="ts">
    import type {
      UITransaction,
      UITransactionActionGroup
    } from "$lib/types";

    import { page } from "$app/stores";

    import {
      groupTransactionActions,
      mergeTransactionActions
    } from "$lib/util/transactions";

    import Icon from "$lib/icon";

    import TransactionAction from "$lib/components/transaction-action.svelte";

    import {
      fade, fly
    } from "svelte/transition";

    import { cubicOut } from "svelte/easing";
    
    export let transactions:UITransaction[];
    export let user:string = "";
    // dont know what this is for but commented it out cause it fixed an error
    // export let gap:number = 3;

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
}, groupIndex}
    <div
        class="py-6"
        in:fade={{
            delay    : groupIndex * 100,
            duration : 500,
        }}>
        <div class="flex opacity-75 mb-2">
            <div class="flex items-center">
                <Icon
                    id={icon}
                    size="md" />
                <h1 class="ml-2">
                    {label}
                </h1>
            </div>
        </div>

        {#each actions as action, actionIndex}
            <a
                class="mb-2 block hover:opacity-75 cursor-pointer"
                data-sveltekit-reload
                href="/{action.signature}/tx?wallet={$page.params.search}"
                in:fly={{
                    delay  : actionIndex * 100,
                    easing : cubicOut,
                    y      : 50,
                }}>
                <TransactionAction {action} />
            </a>
        {/each}
    </div>
{/each}
