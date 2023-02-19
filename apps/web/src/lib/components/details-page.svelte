<script>
    import { page } from "$app/stores";

    import Namor from "$lib/components/providers/namor-provider.svelte";
    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";
</script>

<section class="pb-96">
    <div
        class="title sticky top-16 z-10 mb-3 flex w-full items-center justify-between rounded-lg border bg-black p-4"
    >
        <div class="item-center grid w-full grid-cols-6">
            <div class="col-span-6 md:col-span-5">
                <Namor
                    text={$page.params.search}
                    let:result
                    let:shortenedOriginal
                >
                    <div class="flex items-center">
                        {#if $page.url.pathname.endsWith("/wallet")}
                            <Icon id="person" />
                            <span class="ml-2"> Account </span>
                        {:else if $page.url.pathname.endsWith("/token")}
                            <Icon id="coins" />
                            <span class="ml-2"> Token </span>
                        {:else}
                            <Icon id="lightning" />
                            <span class="ml-2"> Transaction </span>
                        {/if}

                        <h3 class="tooltip tooltip-right mx-2">
                            <span class="opacity-50">
                                {shortenedOriginal}
                            </span>
                        </h3>
                    </div>

                    <h1 class="text-lg font-bold lg:text-2xl">{result}</h1>
                </Namor>
            </div>
            <div
                class="col-span-6 mt-2 flex md:col-span-1 lg:items-center lg:justify-end"
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
