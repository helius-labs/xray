<script lang="ts">
    import { hideModal } from "$lib/state/stores/modals";
    import { transactionActionsMetadata } from "$lib/types";
    import { filterStore } from "$lib/util/stores/filter";
    import Icon from "../icon.svelte";

    const handleClick = (key: string) => {
        $filterStore = key;
        hideModal();
    };

    const filterEntries = Object.entries(transactionActionsMetadata);

    $: filterList = filterEntries.filter(([key, value]) => value.filterLabel);
</script>

<button
    class="btn-ghost btn w-full"
    on:click={() => handleClick("")}>All Transactions</button
>
{#each filterList as [key, value]}
    <button
        class="btn-ghost btn w-full"
        on:click={() => handleClick(key)}
    >
        <div class="flex items-center justify-center">
            <Icon
                id={value.icon}
                size="md"
            />
            <div class="ml-2">{value.filterLabel}</div>
        </div>
    </button>
{/each}
