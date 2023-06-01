<script lang="ts">
    import Icon from "$lib/components/icon.svelte";
    import type { Icon as IconType, NullableProp } from "$lib/types";

    export let iconId = "" as IconType;
    export let sectionTitle: string = "";
    export let sectionAditionalInfo: NullableProp<string | number> = null;
    export let hideIcon = false;
    export let showDetails = false;
</script>

<div class="collapse-arrow collapse rounded-md border">
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
                    stroke="success"
                />
            </div>
        {/if}
        <div class="ml-2 flex items-center gap-2">
            <p class="text-primary">{sectionTitle}</p>
            {#if sectionAditionalInfo}
                <span class="rounded-sm border bg-white/10 px-[0.4rem] text-sm"
                    >{sectionAditionalInfo}</span
                >
            {/if}
        </div>
    </div>
    <div class="collapse-content">
        <slot />
    </div>
</div>
