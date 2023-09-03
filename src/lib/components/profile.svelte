<script lang="ts">
    export let profileName: string;
    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";
    import RecordWidget from "./widgets/record-widget.svelte";
    import cap from "$lib/util/cap";
    const client = trpcWithQuery($page);
    const profile = client.profileFromDomainName.createQuery(profileName);
    let account = [];
    let isExpanded = false;

    // When profile updates, set the account array to the profile
    $: {
        if ($profile.isFetched) {
            account = $profile.data;
        }
    }
</script>

<div class="w-72 bg-black p-4 rounded-lg shadow-md flex flex-col items-center mx-auto mt-48">
    <!-- Display the 'pic' record as an image at the top -->
    <!-- Heading for the domain name itself, under profileName -->
    
    {#each account as record}
        {#if record.record === 'pic' && record.returnedData}
            <img src={record.returnedData.url} alt="Profile Picture" class="w-24 h-24 rounded-full mt-4 mb-4" />
        {/if}
    {/each}
    <h1 class="text-2xl font-semibold mb-4">{cap(profileName)}.sol</h1>
    <!-- Display the 'content' record underneath the profile picture -->
    {#each account as record}
        {#if record.record === 'content' && record.returnedData.url!==""}
            <div class="mb-4 text-center text-sm break-words overflow-y-hidden w-full" style={isExpanded ? 'max-height: none;' : 'max-height: 6em;'}>
                {record.returnedData.url.split(".")[0]+"."}
            </div>
        {/if}
    {/each}

    <!-- Display the rest of the records using RecordWidget -->
    <div class="w-full">
        {#each account as record}
            {#if record.record !== 'pic' && record.record !== 'content' && record.returnedData}
                <RecordWidget {record} />
            {/if}
        {/each}
    </div>
</div>
