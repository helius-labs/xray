<script lang="ts">
    import { page } from "$app/stores";
    import shortenString from "$lib/util/shorten-string";
    import { fade } from "svelte/transition";

    import PageLoader from "./_loader.svelte";

    import TokenProvider from "$lib/components/providers/token-provider.svelte";
    import Modal from "$lib/components/modal.svelte";

    const address = $page.params.search;
</script>

<TokenProvider
    {address}
    let:metadata
    let:tokenIsLoading
>
    {#if tokenIsLoading}
        <PageLoader />
    {:else}
        <div>
            <div
                class="flex flex-col items-center justify-center"
                in:fade={{ delay: 100, duration: 800 }}
            >
                <a href="#modal-token-fs-modal">
                    <img
                        class="m-auto mt-3 h-auto rounded-md md:w-1/2"
                        alt="token symbol"
                        src={metadata.image}
                        in:fade={{ delay: 600, duration: 1000 }}
                    />
                </a>
            </div>
            <Modal
                id="token-fs-modal"
                fullScreenModal
            >
                <img
                    alt="token symbol"
                    src={metadata.image}
                />
                <div class="mt-2">
                    <h1>{metadata.name}</h1>
                </div>
            </Modal>
            {#if metadata.description}
                <div
                    class="mt-3"
                    in:fade={{ delay: 700, duration: 800 }}
                >
                    <h3 class="mt-3 text-lg font-medium text-gray-500">
                        Description
                    </h3>
                    <p class="text-sm">
                        {metadata.description}
                    </p>
                    {#if metadata.collectionKey}
                        <h3 class="mt-3 text-lg font-medium text-gray-500">
                            Collection
                        </h3>
                        <TokenProvider
                            search={metadata.collectionKey}
                            let:metadata
                        >
                            <p>{metadata.name}</p>
                        </TokenProvider>
                    {/if}
                </div>
            {/if}
            {#if metadata.attributes && metadata.attributes.length}
                <div
                    class="mt-3"
                    in:fade={{ delay: 850, duration: 800 }}
                >
                    <h3 class="text-lg font-medium text-gray-500">
                        Properties
                    </h3>
                    <div class="flex flex-wrap">
                        {#each metadata.attributes as attribute, idx}
                            <div
                                class="card mr-3 mt-3 p-0"
                                in:fade={{
                                    delay: idx * 75 + 900,
                                    duration: 800,
                                }}
                            >
                                <h4 class="text-sm font-medium">
                                    {attribute.traitType.toUpperCase()}
                                </h4>
                                <p class="text-sm">
                                    {attribute.value}
                                </p>
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
            {#if metadata.creators && metadata.creators.length > 0}
                <div
                    class="mt-3"
                    in:fade={{ delay: 1000, duration: 800 }}
                >
                    <h3 class="text-lg font-medium text-gray-500">Creators</h3>
                    <div class="flex flex-wrap">
                        {#each metadata.creators as creator, idx}
                            <a
                                class="card mr-3 mt-3 p-0"
                                href="/{creator.address}/wallet"
                                in:fade={{
                                    delay: idx * 75 + 1000,
                                    duration: 800,
                                }}
                            >
                                <h4 class="text-sm font-medium">
                                    Creator {idx + 1}
                                </h4>
                                <p class="text-sm">
                                    {shortenString(creator.address)}
                                </p>
                            </a>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</TokenProvider>
