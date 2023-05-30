<script lang="ts">
    import { fly } from "svelte/transition";

    export let each: any[] = [];

    export let count = 20;
    export let delay = 50;
    export let y = -20;
    export let x = 0;
    export let duration = 750;
</script>

{#each each as item, index}
    <!-- Only attach animation to the first {count} items -->
    {#if index < count}
        <div
            in:fly={{
                delay: index * delay,
                duration,
                x,
                y,
            }}
        >
            <slot {item} />
        </div>
    {:else}
        <div>
            <slot
                {item}
                {index}
            />
        </div>
    {/if}
{/each}
