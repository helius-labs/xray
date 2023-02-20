<script lang="ts">
    import { page } from "$app/stores";
    import { fade } from "svelte/transition";

    import Namor from "$lib/components/providers/namor-provider.svelte";
    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";

    export let pageDetails = {
        page: "",
        tokenName: "",
    };

    let iconId = "";

    if (pageDetails.page === "wallet") {
        iconId = "person";
    } else if (pageDetails.page === "token") {
        iconId = "coins";
    } else {
        iconId = "lightning";
    }
</script>

<section class="pb-96">
    <div
        class="title sticky top-16 z-10 mb-3 flex w-full items-center justify-between rounded-lg border bg-black p-4"
        class:mt-5={pageDetails.page === "token"}
        in:fade={{ delay: 300, duration: 250 }}
    >
        <div class="item-center grid w-full grid-cols-6">
            <div class="col-span-6 md:col-span-5">
                <Namor
                    text={$page.params.search}
                    let:result
                    let:shortenedOriginal
                >
                    <div class="flex items-center">
                        <Icon id={iconId} />
                        <span class="ml-2 capitalize"> {pageDetails.page} </span>

                        <h3 class="tooltip tooltip-right mx-2">
                            <span class="opacity-50">
                                {shortenedOriginal}
                            </span>
                        </h3>
                    </div>
                    {#if pageDetails.page === "token"}
                        <h2 class="text-3xl font-bold lg:text-4xl">
                            {pageDetails?.tokenName}
                        </h2>
                    {:else}
                        <h1 class="text-3xl font-bold lg:text-2xl">{result}</h1>
                    {/if}
                </Namor>
            </div>
            <div
                class="col-span-6 justify-end flex md:col-span-1 lg:items-center"
            >
                <CopyButton
                    text={$page.url.pathname}
                    icon="share"
                    label="Share"
                    success="Copied Link"
                    classList="btn -ml-3 md:-ml-auto"
                />
            </div>
        </div>
    </div>

    <slot />
</section>
