<script lang="ts">
    import Icon from "$lib/components/icon.svelte";
    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";
    import { IconPaths } from "$lib/types";
    export let account: string;

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
    };

    $: if ($domains?.data?.length > 0) {
        selectedDomain = $domains?.data[0].name;
    }

    $: selectedRecords = $domains.data?.find(
        (domain) => domain.name === selectedDomain
    )?.records;

    onMount(() => {
        setTimeout(() => {
            isLoading = false;
        }, 1000);
    });
</script>

<div class="rounded-lg border p-3 py-2">
    <div class="mb-3 flex items-center justify-between">
        {#if isLoading}
            <div class="animate-pulse rounded-2xl bg-secondary px-10 py-2" />
        {:else}
            <div>
                <h2 class="-mb-1 text-2xl font-bold">Profile</h2>
            </div>
            <div class="flex gap-2">
                {#each $domains?.data || [] as domain}
                    <button
                        on:click={() => (selectedDomain = domain.name)}
                        class:bg-white={selectedDomain === domain.name}
                        class:text-secondary={selectedDomain === domain.name}
                        class="rounded-2xl bg-green-300 p-1 px-2 text-xs font-semibold text-green-900"
                        >{domain.name}.sol</button
                    >
                {/each}
            </div>
        {/if}
    </div>

    <div class="relative md:flex items-center gap-3">
        {#if isLoading}
            <div
                class="aspect-square h-36 animate-pulse rounded rounded-2xl bg-secondary"
            />

            <div class="grid grid-cols-2 gap-4">
                {#each Array(4) as x}
                    <div
                        class="flex items-center rounded-lg border p-2 hover:border-white"
                    >
                        <div
                            class="animate-pule rounded-full bg-secondary p-3"
                        />
                        <div class="ml-2">
                            <div
                                class="mb-1 animate-pulse rounded-2xl bg-secondary px-20 py-3"
                            />
                            <div
                                class="animate-pulse rounded-2xl bg-secondary px-10 py-2"
                            />
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <img
                src={selectedRecords?.pic || ""}
                class="aspect-square w-full md:h-36 rounded my-3 md:w-auto"
                alt=""
            />
            <div class="grid grid-cols-2 gap-4">
                {#each Object.keys(selectedRecords || {}) as record}
                    {#if selectedRecords[record] && record !== "pic"}
                        <div class="flex items-center rounded-lg border p-2">
                            <Icon
                                id={recordIcons[record]}
                                size="sm"
                            />
                            <div class="ml-2">
                                <p class="font-semibold">{record}</p>
                                <p class="text-sm text-xs text-neutral">
                                    {selectedRecords[record].slice(
                                        0,
                                        20
                                    )}{selectedRecords[record].length >= 20
                                        ? "..."
                                        : ""}
                                </p>
                            </div>
                        </div>
                    {/if}
                {/each}
            </div>
        {/if}
    </div>
</div>
