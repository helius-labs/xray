<script lang="ts">
    import type { Icon as IconType } from "$lib/types";

    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";

    export let icon: IconType;
    export let type = "";
    export let subtitle = "";
    export let title = "";
    export let copyText = "";
</script>

<section class="pb-96">
    <div class="title sticky top-16 z-10  w-full bg-black py-1">
        <div class="flex items-center justify-between">
            <p class="m-0 opacity-50">{type}</p>

            {#if copyText}
                <div>
                    <CopyButton
                        text={copyText}
                        icon="share"
                        label="Share"
                        success="Copied Link"
                    />
                </div>
            {/if}
        </div>
    </div>

    <slot />
</section>
