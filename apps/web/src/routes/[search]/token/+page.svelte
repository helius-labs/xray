<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";

    import { state } from "svelte-snacks";

    import TokenProvider from "$lib/components/token-provider.svelte";

    const address = $page.params.search;

    const token = state(["solanaToken", address], address);
</script>

{#if $token.isLoading}
    <button class="loading btn-ghost btn" />
{:else}
    <TokenProvider
        token={$token.data}
        let:metadata
    >
        <h1 class="text-center text-xl">{metadata.name}</h1>
        <div class="avatar mt-2 flex items-center justify-center">
            <div class="w-1/2 rounded-md">
                <img
                    class="rounded-md"
                    alt="token symbol"
                    src={metadata.image}
                />
            </div>
        </div>
        {#if metadata.description}
            <div class="mt-2">
                <h3 class="text-lg font-medium text-gray-900">Description</h3>
                <p class="text-sm text-gray-500">
                    {metadata.description}
                </p>
            </div>
        {/if}
        {#if metadata.attributes.length > 0}
            <div class="mt-10">
                <h3 class="text-lg font-medium text-gray-900">Properties</h3>
                <div class="flex flex-wrap">
                    {#each metadata.attributes as attribute}
                        <div class="card mr-3 mt-3 p-0">
                            <h4 class="text-sm font-medium text-gray-900">
                                {attribute.traitType.toUpperCase()}
                            </h4>
                            <p class="text-sm text-gray-500">
                                {attribute.value}
                            </p>
                        </div>
                    {/each}
                </div>
            </div>
        {/if}
    </TokenProvider>
{/if}
