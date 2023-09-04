<script lang="ts">
    import Icon from "$lib/components/icon.svelte";
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";
    import { IconPaths } from "$lib/types";    
    export let account:string;

    import { SOCIAL_BONFIDA_RECORDS } from "$lib/config";
    import { onMount } from "svelte";

    const client = trpcWithQuery($page);

    $: domains = client.domainsFromPublicKey.createQuery(account, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    let selectedDomain: string;

    let isLoading = true;

    const recordIcons = {
        discord: "discord",
        pic: "image",
        twitter: "twitter",
        url: "link",
    } as {
        discord: string;
        pic: string;
        twitter: string;
        url: string;
    }

    $: if($domains?.data?.length > 0) {
        selectedDomain = $domains?.data[0].name;
    }

    $: selectedRecords = $domains.data?.find((domain) => domain.name === selectedDomain)?.records;

    onMount(() => {
        setTimeout(() => {
            isLoading = false;
        }, 1000)
    })
</script>


<div class="py-2 border rounded-lg p-3">
    <div class="flex items-center justify-between mb-3">
        {#if isLoading}
            <div class="bg-secondary rounded-2xl animate-pulse px-10 py-2">

            </div>
        {:else}
            <div>
                <h2 class="text-2xl font-bold -mb-1" >Profile</h2>
            </div>
            <div class="flex gap-2">
                {#each $domains?.data || [] as domain}
                    <button
                        on:click={() => selectedDomain = domain.name}
                        class:bg-white={selectedDomain === domain.name}
                        class:text-secondary={selectedDomain === domain.name}
                        class="bg-green-300 text-green-900 font-semibold p-1 rounded-2xl text-xs px-2"
                    >{domain.name}.sol</button>
                {/each}
            </div>
        {/if}
    </div>

    <div class="flex gap-3 relative items-center">
        {#if isLoading}
            <div class="bg-secondary rounded-2xl animate-pulse rounded h-36 aspect-square">

            </div>

            <div class="grid grid-cols-2 gap-4">
                {#each Array(4) as x}
                    <div class="flex items-center hover:border-white border rounded-lg p-2">
                        <div class="bg-secondary animate-pule rounded-full p-3"></div>
                        <div class="ml-2">
                            <div class="bg-secondary rounded-2xl animate-pulse px-20 py-3 mb-1"></div>
                            <div class="bg-secondary rounded-2xl animate-pulse px-10 py-2"></div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <img src="{selectedRecords?.pic || ""}" class="rounded h-36 aspect-square" alt="">
            <div class="grid grid-cols-2 gap-4">
                {#each Object.keys(selectedRecords || {}) as record}
                    {#if selectedRecords[record] && record !== "pic"}
                        <div class="flex items-center border rounded-lg p-2">
                            <Icon id={recordIcons[record]} size="sm"/>
                            <div class="ml-2">
                                <p class="font-semibold">{record}</p>
                                <p class="text-sm text-xs text-neutral">{selectedRecords[record].slice(0,20)}{selectedRecords[record].length >= 20 ? "..."  : ""}</p>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</div>
