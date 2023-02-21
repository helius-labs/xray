<script lang="ts">
    import { page } from "$app/stores";
    import shortenString from "$lib/util/shorten-string";
    import { fade, fly } from "svelte/transition";
    import { cubicOut } from "svelte/easing";

    import DetailsPage from "$lib/components/details-page.svelte";
    import TxHistory from "$lib/components/tx-history.svelte";
    import JSONWidget from "$lib/components/json-widget.svelte";
    import TokenSection from "$src/lib/components/token-section.svelte;
    import TokenProvider from "$lib/components/providers/token-provider.svelte";
    import TokenPgLoader from "$lib/components/token-pg-loader.svelte";
    import Modal from "$lib/components/modal.svelte";
    
    const search = $page.params.search;

    const wallet = $page.url.searchParams.get("wallet");
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
                    <div 
                        class="mt-3"
                        in:fly={{
                            delay: 100,
                            easing: cubicOut,
                            y: 50,
                        }}
                    >
                        <TokenSection 
                            sectionTitle="Description" 
                            iconId="person"
                            showDetails={true}
                        >
                            <p>{metadata.description}</p>
                        </TokenSection>
                    </div>
                        {#if metadata.collectionKey}
                        <TokenProvider search={metadata.collectionKey} let:metadata>
                        {#if metadata.name}
                            <div 
                                class="mt-3"
                                in:fly={{
                                    delay: 200,
                                    easing: cubicOut,
                                    y: 50,
                                }}
                            >
                            <TokenSection 
                                sectionTitle="Collection" 
                                iconId="collection"                                
                                showDetails={true}
                            >
                                <p>{metadata.name ? metadata.name : "Unknown"}</p>
                            </TokenSection> 
                            </div>
                        {/if}
                        </TokenProvider>
                        {/if}
                </div>
                {/if}
                {#if metadata.attributes && metadata.attributes.length}
                    <div 
                        class="mt-3"
                        in:fly={{
                            delay: 300,
                            easing: cubicOut,
                            y: 50,
                        }}
                    >
                        <TokenSection 
                            sectionTitle="Properties" 
                            iconId="attributes"
                            showDetails
                        >
                            <div class="flex flex-wrap gap-2">
                                {#each metadata.attributes as attribute, idx}
                                    <div class="card p-0">
                                        <h4 class="text-sm font-medium uppercase text-gray-500">
                                            {attribute.traitType}
                                        </h4>
                                        <p class="text-sm">
                                            {attribute.value}
                                        </p>
                                    </div>
                                {/each}
                            </div>
                        </TokenSection>
                    </div>
                {/if}
                {#if metadata.creators && metadata.creators.length > 0}
                    <div 
                        class="mt-3">
                        <TokenSection 
                            sectionTitle="Creators" 
                            iconId="creator"
                        >
                        <div class="flex flex-wrap gap-2">
                            {#each metadata.creators as creator, idx}
                                <a 
                                    class="card p-0"
                                    href="/{creator.address}/wallet"
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
                        </TokenSection>
                    </div>
                {/if}
                <div class="mt-3">
                    <TokenSection 
                        sectionTitle="Transaction history" 
                        iconId="history"
                        showDetails
                    >
                        <TxHistory nft={token} user={wallet} />
                    </TokenSection>
                </div>
                <div class="mt-3">
                    <JSONWidget jsonData={token?.data} page="token" />
                </div>
            </DetailsPage>
        </div>
        {/if}
    </TokenProvider>
