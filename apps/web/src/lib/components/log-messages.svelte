<script lang="ts">
    export let logs: string[];
</script>

{#each logs as message}
    <p class="px-3 text-xs">
        <span class="mr-1 text-success">></span><span class="text-neutral"
            >{message}</span
        >
    </p>
{/each}
