<script lang="ts">
    import Icon from "$lib/components/icon.svelte";
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";
    import { IconPaths } from "$lib/types";

    export let account:string;

    const client = trpcWithQuery($page);

    $: domains = client.domainsFromPublicKey.createQuery(account);

    let selectedDomain: string;

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
</script>

<div class="py-2">
    <div class="flex items-center justify-between mb-3">
        <div>
            <h2 class="text-2xl font-bold -mb-1" >Profile</h2>
            <p class="text-neutral text-xs my-0">Powered by SNS</p>
        </div>
        <div class="flex gap-3 items-center">
            {#each $domains?.data || [] as domain}
                <div
                    on:click={() => selectedDomain = domain.name}
                    class:bg-white={selectedDomain === domain.name}
                    class:text-secondary={selectedDomain === domain.name}
                    class="bg-green-300 text-green-900 font-semibold p-1 rounded-2xl text-xs px-2"
                >{domain.name}.sol</div>
            {/each}
        </div>
    </div>

    <div class="flex gap-3 relative items-center">
        <img src="{selectedRecords?.pic || ""}" class="rounded h-36" alt="">
        <div>
            {#each Object.keys(selectedRecords || {}) as record}
                {#if selectedRecords[record] && record !== "pic"}
                    <div class="flex items-center">
                        <Icon id={recordIcons[record]} size="sm"/>
                        <div class="ml-2">
                            <p class="font-semibold">{record}</p>
                            <p class="text-sm text-xs text-neutral">{selectedRecords[record]}</p>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
</div>