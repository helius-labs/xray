<script lang="ts">
    import type { ProtonAccount } from "$lib/xray";

    import Namor from "./providers/namor-provider.svelte";
    import TokenProvider from "./providers/token-provider.svelte";

    import { fade } from "svelte/transition";

    import shortenString from "$lib/util/shorten-string";
    import CopyButton from "./copy-button.svelte";
    import ShortenAddress from "./shorten-address.svelte";

    export let data: ProtonAccount;
</script>

<div>
    <div
        class="relative mb-5 block w-full rounded-lg border-transparent bg-black px-3"
    >
        {#if data.changes}
            <Namor
                text={data.account}
                let:result
            >
                <div>
                    <div class="flex justify-between">
                        <div>
                            <div class="flex items-center">
                                <a
                                    href="/account/{data.account}"
                                    class="pointer-events-auto border-x-0 border-t-0 border-dotted hover:link-success"
                                >
                                    <ShortenAddress address={data.account} />
                                </a>
                                <CopyButton text={data.account} />
                            </div>
                        </div>
                    </div>

                    <div class="mb-3 mt-1 border border-x-0 border-t-0" />
                </div>
            </Namor>
            {#each data.changes as change}
                {#if change.amount}
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
                                class="mb-5 ml-3 w-full rounded-lg text-left"
                                in:fade={{
                                    duration: 500,
                                }}
                            >
                                <div
                                    class="pointer-events-none relative grid grid-cols-12 items-center gap-3 rounded-lg"
                                >
                                    <div class="col-span-">
                                        <a
                                            href="/token/{metadata.address}"
                                            class="pointer-events-auto block transition-transform hover:scale-125"
                                        >
                                            <div
                                                style="background-image: url('{metadata.image}')"
                                                class="aspect-square w-6 rounded-lg bg-cover object-contain"
                                            />
                                        </a>
                                    </div>

                                    <div
                                        class="pointer-events-none col-span-10 flex items-center justify-between md:col-span-11"
                                    >
                                        <div>
                                            <a
                                                href="/token/{metadata.address}"
                                                class="pointer-events-auto text-xs text-neutral hover:link-success"
                                            >
                                                {metadata?.name || "Unknown"}
                                            </a>
                                        </div>
                                        <div class="mr-2">
                                            {#if change.amount > 0}
                                                <h3
                                                    class="text-bold text-sm text-success"
                                                >
                                                    + {change.amount}
                                                </h3>
                                            {:else if change.amount < 0}
                                                <h3
                                                    class="text-bold text-sm text-error"
                                                >
                                                    {change.amount}
                                                </h3>
                                            {:else}
                                                <h3 class="text-bold text-sm">
                                                    {change.amount}
                                                </h3>
                                            {/if}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {/if}
                    </TokenProvider>
                {/if}
            {/each}
        {/if}
    </div>
</div>
