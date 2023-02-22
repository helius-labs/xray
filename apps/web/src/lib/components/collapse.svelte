<script lang="ts">
    import type { Icon as IconType } from "$lib/types";
    import Icon from "$lib/components/icon.svelte";

    export let iconId: IconType;
    export let sectionTitle = "";

    export let showDetails = false;
</script>

<div class="collapse-arrow collapse rounded-md border">
    <input
        type="checkbox"
        bind:checked={showDetails}
    />
    <div class="collapse-title flex items-center py-1">
        <div class="center h-8 w-8 rounded-full">
            <Icon
                id={iconId}
                size="md"
                fill="success"
            />
        </div>
        <div class="ml-2">
            <p class="text-primary">{sectionTitle}</p>
        </div>
    </div>
    <div class="collapse-content">
        <slot />
    </div>
</div>
