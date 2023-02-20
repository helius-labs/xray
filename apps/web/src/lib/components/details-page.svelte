<script lang="ts">
    import type { Icon as IconType } from "$lib/types";

    import { page } from "$app/stores";
    import { fade } from "svelte/transition";

    import Namor from "$lib/components/providers/namor-provider.svelte";
    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";

    let pageType = "";

    export let icon: IconType;
    export let type = "";
    export let subtitle = "";
    export let title = "";

    // if ($page.url.pathname.endsWith("/wallet")) {
    //     pageType = "wallet";
    // } else if ($page.url.pathname.endsWith("/token")) {
    //     pageType = "token";
    // } else {
    //     pageType = "transaction";
    // }
</script>

<section class="pb-96">
    <div
        class="title sticky top-16 z-10 mb-3  w-full rounded-lg border bg-black p-2 py-1"
    >
        <div class="flex items-center opacity-50 ">
            <Icon id={icon} />
            <span class="ml-2">{type}</span>

            {#if subtitle}
                <h3 class="tooltip tooltip-right mx-2 text-xs">
                    <span class="opacity-50">
                        {subtitle}
                    </span>
                </h3>
            {/if}
        </div>
        <h1 class="text-lg font-bold lg:text-xl">{title}</h1>
    </div>

    <slot />
</section>
