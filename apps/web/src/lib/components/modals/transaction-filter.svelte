<script lang="ts">
    import { transactionActionsMetadata } from "src/lib/types";

    export let updateFilter: (filter: string) => void;

    $: filterList = Object.entries(transactionActionsMetadata).filter(
        ([key, value]) => value.filterLabel
    );
</script>

{#each filterList as [key, value]}
    <button
        class="btn-ghost btn w-full"
        on:click={() => updateFilter(key)}>{value.filterLabel}</button
    >
{/each}
