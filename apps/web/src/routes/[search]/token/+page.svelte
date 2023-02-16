<script lang="ts">
    import { page } from "$app/stores";
    import shortenString from "$lib/util/shorten-string";

    import TokenProvider from "$lib/components/token-provider.svelte";
    
    const search = $page.params.search;
</script>

<TokenProvider
    { search }
    let:metadata
    let:token
>
    {#if token.isLoading}
    <button class="loading btn-ghost btn" />
    {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 items-center justify-center">
        <a 
            class="rounded-md mx-auto overflow-hidden"
            href="#token-fs-modal"
        >
            <img
                alt="token symbol"
                src={metadata.image}
            />
        </a>
        <div class="modal" id="token-fs-modal">
            <div class="modal-box">
                <div class="rounded-md mx-auto overflow-hidden">
                    <img
                        class="w-full h-auto"
                        alt="token symbol"
                        src={metadata.image}
                    />
                </div>
              <div class="mt-2">
                <h1>{metadata.name}</h1>
              </div>
              <div class="modal-action">
               <a href="#" class="btn">Close</a>
              </div>
            </div>
        </div>
        {#if metadata.description}
            <div class="mt-3 md:ml-5 md:mt-0">
                <h3 class="text-lg font-medium text-gray-500">Name</h3>
                <h1>{metadata.name}</h1>
                <h3 class="mt-3 text-lg font-medium text-gray-500">Description</h3>
                <p class="text-sm">
                    {metadata.description}
                </p>
                <h3 class="mt-3 text-lg font-medium text-gray-500">Collection</h3>
                <TokenProvider search={metadata.collectionKey} let:metadata>
                    <p>{metadata.name}</p>
                </TokenProvider>
            </div>
        {/if}
        {#if metadata.attributes && metadata.attributes.length}
            <div class="mt-3 md:mt-10 md:col-span-2">
                <h3 class="text-lg font-medium">Properties</h3>
                <div class="flex flex-wrap">
                    {#each metadata.attributes as attribute}
                        <div class="card mr-3 mt-3 p-0">
                            <h4 class="text-sm font-medium text-gray-500">
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
            <div class="mt-3 md:mt-10 md:col-span-2">
                <h3 class="text-lg font-medium">Creators</h3>
                <div class="flex flex-wrap">
                    {#each metadata.creators as creator, idx}
                        <a 
                            class="card mr-3 mt-3 p-0"
                            href="/{creator.address}/wallet"
                        >
                            <h4 class="text-sm font-medium text-gray-500">
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
