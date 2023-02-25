<script lang="ts">
    import { page } from "$app/stores";
    import shortenString from "$lib/util/shorten-string";
    import { cubicOut } from "svelte/easing";
    import { fade, fly } from "svelte/transition";

    import Collapse from "$lib/components/collapse.svelte";
    import JSON from "$lib/components/json.svelte";
    import Transactions from "$lib/components/transactions.svelte";

    import PageLoader from "./_loader.svelte";

    import CopyButton from "$lib/components/copy-button.svelte";
    import Modal from "$lib/components/modal.svelte";
    import TokenProvider from "$lib/components/providers/token-provider.svelte";

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
        <div class="sticky top-16 z-10 bg-base-100 py-1">
            <div
                class="flex flex-wrap  items-center justify-between bg-base-100"
            >
                <div>
                    <h3 class="m-0 text-xl font-bold md:text-3xl">
                        {metadata.name}
                    </h3>
                </div>

                <div>
                    <div class="my-2">
                        <CopyButton
                            text={address}
                            success="Copied Address"
                            label="Address"
                            classList="px-3 btn-outline"
                        />

                        <CopyButton
                            text={$page.url.href}
                            success="Copied Link"
                            label="Share"
                            classList="px-3 btn-outline"
                            icon="share"
                        />
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div
                class="flex flex-col items-center justify-center"
                in:fade={{ delay: 100, duration: 800 }}
            >
                <!-- <a href="#modal-token-fs-modal"> -->
                <img
                    class="m-auto mt-3 h-auto w-full rounded-md"
                    alt="token symbol"
                    src={metadata.image}
                    in:fade={{ delay: 600, duration: 1000 }}
                />
                <!-- </a> -->
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
                <div class="mt-3">
                    <div
                        class="mt-3"
                        in:fly={{
                            delay: 100,
                            easing: cubicOut,
                            y: 50,
                        }}
                    >
                        <Collapse
                            sectionTitle="Description"
                            iconId="person"
                            showDetails={true}
                        >
                            <p>{metadata.description}</p>
                        </Collapse>
                    </div>
                    {#if metadata.collectionKey}
                        <TokenProvider
                            address={metadata.collectionKey}
                            let:metadata
                        >
                            {#if metadata.name}
                                <div
                                    class="mt-3"
                                    in:fly={{
                                        delay: 200,
                                        easing: cubicOut,
                                        y: 50,
                                    }}
                                >
                                    <Collapse
                                        sectionTitle="Collection"
                                        iconId="collection"
                                        showDetails={true}
                                    >
                                        <p>
                                            {metadata.name
                                                ? metadata.name
                                                : "Unknown"}
                                        </p>
                                    </Collapse>
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
                    <Collapse
                        sectionTitle="Properties"
                        iconId="attributes"
                        showDetails
                    >
                        <div class="flex flex-wrap gap-2">
                            {#each metadata.attributes as attribute, idx}
                                <div class="card p-0">
                                    <h4
                                        class="text-sm font-medium uppercase text-gray-500"
                                    >
                                        {attribute.traitType}
                                    </h4>
                                    <p class="text-sm">
                                        {attribute.value}
                                    </p>
                                </div>
                            {/each}
                        </div>
                    </Collapse>
                </div>
            {/if}
            {#if metadata.creators && metadata.creators.length > 0}
                <div class="mt-3">
                    <Collapse
                        sectionTitle="Creators"
                        iconId="creator"
                    >
                        <div class="flex flex-wrap gap-2">
                            {#each metadata.creators as creator, idx}
                                <a
                                    class="card p-0"
                                    href="/{creator.address}/wallet"
                                >
                                    <h4
                                        class="text-sm font-medium text-gray-500"
                                    >
                                        CREATOR {idx + 1}
                                    </h4>
                                    <p class="text-sm">
                                        {shortenString(creator.address)}
                                    </p>
                                </a>
                            {/each}
                        </div>
                    </Collapse>
                </div>
            {/if}
            <div class="mt-3">
                <Transactions
                    account={address}
                    ref="@token:{address}"
                />
            </div>
            <div class="mt-3">
                <JSON
                    data={metadata}
                    label="token"
                />
            </div>
        </div>
    {/if}
</TokenProvider>
