<script lang="ts">
    import type {
        ProtonAccount,
        ProtonAccountChange,
    } from "@helius-labs/xray-proton";
    import { fade } from "svelte/transition";
    import shortenString from "../util/shorten-string";
    import TokenProvider from "./providers/token-provider.svelte";

    export let data: ProtonAccount;
</script>

<div>
    <button
        on:click|self={() => (window.location.href = `/${data.account}/wallet`)}
        class="gradient relative block w-full rounded-lg border border-transparent bg-black pb-1 text-left hover:border-primary"
    >
        <div
            class="pointer-events-none relative top-3 mb-2 grid grid-cols-12 gap-3 rounded-lg p-2"
        >
            <div class="pointer-events-none col-span-12 px-3 pl-6">
                <a
                    href="/{data.account}/wallet"
                    class="link-primary pointer-events-auto text-xl font-semibold hover:link-success"
                >
                    {shortenString(data.account, 8)}
                </a>
            </div>
        </div>
        {#if data.changes}
            {#each data.changes as change}
                <div class="ml-3">
                    <TokenProvider
                        address={change.mint}
                        let:metadata
                        let:tokenIsLoading
                    >
                        {#if tokenIsLoading}
                            <div
                                class="grid animate-pulse grid-cols-12 items-center gap-3 rounded-lg"
                            >
                                <div class="col-span-2 p-1 md:col-span-1">
                                    <div
                                        class="aspect-square w-full rounded-full bg-secondary"
                                    />
                                </div>
                                <div
                                    class="col-span-10 flex items-center justify-between md:col-span-11"
                                >
                                    <div>
                                        <div
                                            class="mb-2 h-3 w-32 animate-pulse rounded-full bg-secondary"
                                        />
                                        <div
                                            class="h-2 w-20 animate-pulse rounded-full bg-secondary"
                                        />
                                    </div>
                                    <div
                                        class="h-2 w-5 animate-pulse rounded-full bg-secondary"
                                    />
                                </div>
                            </div>
                        {:else if metadata?.image}
                            <div
                                class="my-2 w-full rounded-lg text-left"
                                in:fade={{
                                    duration: 500,
                                }}
                            >
                                <div
                                    class="pointer-events-none relative grid grid-cols-12 items-center gap-3 rounded-lg p-1"
                                >
                                    <div class="col-span-2 p-1 md:col-span-1">
                                        <button
                                            on:click={() =>
                                                (window.location.href = `/${metadata.address}/token`)}
                                            class="pointer-events-auto mx-2 w-full transition-transform hover:scale-125"
                                        >
                                            <!-- background so that if it doesn't load you dont' get ugly no image icons -->
                                            <div
                                                style="background-image: url('{metadata.image}')"
                                                class="aspect-square w-full rounded-lg bg-cover"
                                            />
                                        </button>
                                    </div>
                                    <div
                                        class="pointer-events-none col-span-10 flex items-center justify-between md:col-span-11"
                                    >
                                        <div>
                                            <a
                                                href="/{metadata.address}/token"
                                                class="link-primary pointer-events-auto text-lg font-semibold hover:link-success md:text-sm"
                                            >
                                                {metadata?.name || "Unknown"}
                                            </a>
                                        </div>
                                        <div class="mr-2">
                                            <div
                                                class="absolute top-1/2 -left-3 h-0.5 w-3 -translate-y-1/2 rounded-full bg-secondary"
                                            />
                                            {#if change.amount > 0}
                                                <h3
                                                    class="text-bold text-success"
                                                >
                                                    + {change.amount}
                                                </h3>
                                            {:else if change.amount < 0}
                                                <h3
                                                    class="text-bold text-error"
                                                >
                                                    - {Math.abs(change.amount)}
                                                </h3>
                                            {:else}
                                                <h3 class="text-bold">
                                                    {change.amount}
                                                </h3>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </TokenProvider>
                </div>
            {/each}
        {/if}
    </button>
</div>
