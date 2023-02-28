<script lang="ts">
    import Icon from "$lib/components/icon.svelte";
    import type { Icon as IconType } from "$lib/types";

    export let iconId = "" as IconType;
    export let sectionTitle = "";

    export let hideIcon = false;
    export let showDetails = false;
    export let alwaysOpen = false;
    export let noBorder = false;
    export let isTxHistory = false;
</script>

<div
    class="collapse rounded-md border"
    class:collapse-arrow={!alwaysOpen}
    class:collapse-open={alwaysOpen}
    class:border-none={noBorder}
>
    <input
        type="checkbox"
        bind:checked={showDetails}
    />
    <div class="collapse-title flex items-center py-1">
        {#if !hideIcon}
            <div class="center h-8 w-8 rounded-full">
                <Icon
                    id={iconId}
                    size="md"
                    fill="success"
                />
            </div>
        {/if}
        <div class="ml-2">
            <p class="text-primary">{sectionTitle}</p>
        </div>
    </div>
    <div
        class="collapse-content"
        class:pl-8={isTxHistory}
    >
        <slot />
    </div>
</div>
