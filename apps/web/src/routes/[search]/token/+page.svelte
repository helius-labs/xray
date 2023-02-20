<script lang="ts">
    import { page } from "$app/stores";
    import shortenString from "$lib/util/shorten-string";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    import DetailsPage from "$lib/components/details-page.svelte";
    import JSONWidget from "$lib/components/json-widget.svelte";
    import TokenProvider from "$lib/components/providers/token-provider.svelte";
    import TokenPgLoader from "$lib/components/token-pg-loader.svelte";
    import Modal from "$lib/components/modal.svelte";
    
    const search = $page.params.search;
</script>
    <TokenProvider
        { search }
        let:metadata
        let:token
    >
        {#if token.isLoading}
            <TokenPgLoader />
        {:else}
    
        <div
            in:fade={{ delay: 100, duration: 1000}}
        >
            <div 
            class="flex flex-col items-center justify-center"
            
            >
                <a href="#modal-token-fs-modal">
                    <img
                        class="md:w-1/2 m-auto h-auto rounded-md"
                        alt="token symbol"
                        src={metadata.image}
                        in:fly={{
                            delay: 150,
                            easing: cubicOut,
                            y: 50,
                        }}
                    />
                </a>
            </div>
            
            <Modal id="token-fs-modal" fullScreenModal>
                <img
                    alt="token symbol"
                    src={metadata.image}
                />
                <div class="mt-2">
                    <h1>{metadata.name}</h1>
                </div>
            </Modal>
            <DetailsPage pageDetails={{page: "token", tokenName: metadata.name}}>
                {#if metadata.description}
                    <div class="mt-3">
                        <h1 class="mt-3">Description</h1>
                        <div 
                            class="card"
                            in:fly={{
                                delay: 100,
                                easing: cubicOut,
                                y: 50,
                            }}
                        >
                            <p>
                                {metadata.description}
                            </p>
                        </div>
                        {#if metadata.collectionKey}
                        <TokenProvider search={metadata.collectionKey} let:metadata>
                        {#if metadata.name}
                        <h1 class="mt-3">Collection</h1>
                            <div 
                                class="card"
                                in:fly={{
                                    delay: 200,
                                    easing: cubicOut,
                                    y: 50,
                                }}
                            >  
                                <p>
                                    {metadata.name ? metadata.name : "Unknown"}
                                </p>
                            </div>
                        {/if}
                        </TokenProvider>
                        {/if}
                    </div>
                {/if}
                {#if metadata.attributes && metadata.attributes.length}
                    <div class="mt-3">
                        <h1 class="">Properties</h1>
                        <div class="flex flex-wrap gap-2">
                            {#each metadata.attributes as attribute, idx}
                                <div 
                                    class="card p-0"
                                    in:fly={{
                                        delay: (idx * 100),
                                        easing: cubicOut,
                                        y: 50,
                                    }}
                                >
                                    <h4 class="text-sm font-medium uppercase text-gray-500">
                                        {attribute.traitType}
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
                        class="mt-3">
                        <h1 class="">Creators</h1>
                        <div class="flex flex-wrap gap-2">
                            {#each metadata.creators as creator, idx}
                                <a 
                                    class="card p-0"
                                    href="/{creator.address}/wallet"
                                    in:fly={{
                                        delay: (idx * 100),
                                        easing: cubicOut,
                                        y: 50,
                                    }}
                                >
                                    <h4 class="text-sm font-medium text-gray-500">
                                        CREATOR {idx + 1}
                                    </h4>
                                    <p class="text-sm">
                                        {shortenString(creator.address)}
                                    </p>
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}
                <div class="mt-3">
                    <JSONWidget jsonData={token?.data} page="token" />
                </div>
            </DetailsPage>
        </div>
        {/if}
    </TokenProvider>
