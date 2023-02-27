<style>
    .stars {
        /* transition: opacity 1000ms 2000ms ease-in-out; */
    }

    .intro {
        min-height: 65vh;
    }

    .transition-section {
        border-radius: 100%;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";

    import { fly } from "svelte/transition";

    import Icon from "$lib/components/icon.svelte";
    import PoweredByHelius from "$lib/components/powered-by-helius.svelte";
    import Search from "$lib/components/search.svelte";
    import IntersectionObserver from "svelte-intersection-observer";

    import { browser } from "$app/environment";
    // @ts-ignore
    import { LottiePlayer } from "@lottiefiles/svelte-lottie-player";

    import Starback from "starback";

    let searchError = "";
    let searchingStarsCanvas: HTMLCanvasElement;
    let isFocused = false;
    let isSearching = false;

    let transactionsElement: HTMLElement;
    let exploreELement: HTMLElement;
    let ecosystemsElement: HTMLElement;
    let nftsElement: HTMLElement;
    let heliusElement: HTMLElement;

    let clearSearch = () => null;
    let focusInput = () => null;

    onMount(() => {
        setTimeout(() => {
            focusInput();
        }, 100);

        const searchingStarback = new Starback(searchingStarsCanvas, {
            backgroundColor: ["#0f0f0f1a"],
            direction: 100,
            frequency: 1,
            quantity: 100,
            randomOpacity: true,
            speed: 0.2,
            starColor: ["#ff5d05"],
            type: "line",
        });
    });
</script>

<div class="intro md:min-h-auto relative flex min-h-screen w-full items-center">
    <canvas
        class="stars absolute top-0 left-0 h-full w-full opacity-80 blur-sm"
        class:opacity-0={!isFocused}
        bind:this={searchingStarsCanvas}
    />

    <div class="mx-auto w-full max-w-2xl md:-translate-y-1/4">
        <div class="mb-10">
            <h1 class="text-center text-9xl font-bold">XRAY</h1>
        </div>

        <div class="relative w-full">
            <Search
                size="lg"
                {searchError}
                bind:focusInput
                bind:clearSearch
                on:focusin={() => (isFocused = true)}
                on:focusout={() => (isFocused = false)}
            />
        </div>
    </div>
</div>

<IntersectionObserver
    once={true}
    rootMargin="100px"
    element={exploreELement}
    let:intersecting
>
    <section
        bind:this={exploreELement}
        class="transition-section relative z-10 mx-auto -mt-24 overflow-hidden bg-black py-24"
    >
        {#if intersecting}
            <div
                class="relative mx-auto max-w-2xl text-center"
                in:fly={{
                    duration: 750,
                    y: 100,
                }}
            >
                <h1 class="mb-4 text-6xl font-bold">
                    <span
                        class="bg-gradient-to-br from-orange-700 to-yellow-400 bg-clip-text text-transparent"
                    >
                        Explore
                    </span>
                    the Solana Blockchain
                </h1>
            </div>
        {/if}
    </section>
</IntersectionObserver>

<IntersectionObserver
    once={true}
    rootMargin="100px"
    element={transactionsElement}
    let:intersecting
>
    <section
        bind:this={transactionsElement}
        class="mx-auto max-w-5xl"
    >
        {#if intersecting}
            <div
                in:fly={{
                    duration: 750,
                    y: 100,
                }}
                class=" grid grid-cols-1 justify-center gap-x-5 md:grid-cols-12"
            >
                <div class="col-span-6">
                    <div class="bg-base-300 py-3 pr-3">
                        <div
                            class="mb-8 grid grid-cols-12 gap-x-5 gap-y-2 rounded-lg border p-3"
                        >
                            <div
                                class="col-span-2 flex items-center justify-center  opacity-50"
                            >
                                <Icon
                                    id="swap"
                                    size="md"
                                />
                            </div>
                            <div class="col-span-8  opacity-50">
                                <h1 class="text-xl font-bold">Swap</h1>
                            </div>
                            <div class="col-span-2" />
                            <div
                                class="col-span-2 aspect-square w-full rounded-lg bg-secondary"
                            />
                            <div class="col-span-8">
                                <div
                                    class="mb-3 h-5 w-1/3 rounded-lg bg-secondary"
                                />
                                <div
                                    class="mb-3 h-2 w-2/3 rounded-lg bg-secondary"
                                />
                                <div
                                    class="h-2 w-1/4 rounded-lg bg-secondary"
                                />
                            </div>
                            <div class="col-span-2">
                                <div
                                    class="mb-3 h-4 w-full rounded-lg bg-secondary"
                                />
                            </div>
                        </div>
                        <div
                            class="mb-8 grid grid-cols-12 gap-x-5 gap-y-2 rounded-lg border p-3"
                        >
                            <div
                                class="col-span-2 flex items-center justify-center  opacity-50"
                            >
                                <Icon
                                    id="lightning"
                                    size="md"
                                />
                            </div>
                            <div class="col-span-8  opacity-50">
                                <h1 class="text-xl font-bold">Transfer</h1>
                            </div>
                            <div class="col-span-2" />
                            <div
                                class="col-span-2 aspect-square w-full rounded-lg bg-secondary"
                            />
                            <div class="col-span-8">
                                <div
                                    class="mb-3 h-5 w-1/3 rounded-lg bg-secondary"
                                />
                                <div
                                    class="mb-3 h-2 w-2/3 rounded-lg bg-secondary"
                                />
                                <div
                                    class="h-2 w-1/4 rounded-lg bg-secondary"
                                />
                            </div>
                            <div class="col-span-2">
                                <div
                                    class="mb-3 h-4 w-full rounded-lg bg-secondary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-span-6 flex h-full items-center">
                    <div>
                        <h1 class="text-3xl font-bold">Transaction Explorer</h1>
                        <p class="opacity-50">
                            We categorize and parse complicated transaction data
                            to provide an interface that neatly categorizes and
                            names account history.
                        </p>
                    </div>
                </div>
            </div>
        {/if}
    </section>
</IntersectionObserver>

<IntersectionObserver
    once={true}
    rootMargin="100px"
    element={ecosystemsElement}
    let:intersecting
>
    <section
        bind:this={ecosystemsElement}
        class="mx-auto max-w-5xl py-10"
    >
        {#if intersecting}
            <div
                in:fly={{
                    duration: 750,
                    y: 100,
                }}
                class="grid grid-cols-1 justify-center gap-x-5 md:grid-cols-12"
            >
                <div class="col-span-6 flex h-full items-center">
                    <div>
                        <h1 class="text-3xl font-bold">
                            Ecosystem Integrations
                        </h1>
                        <p class="opacity-50">
                            Our search engine accepts more than just IDs. We
                            offer support for searching by Bonfida .sol domains
                            and @username xNFT Backpack usernames.
                        </p>
                    </div>
                </div>
                <div class="col-span-6 flex items-center justify-center">
                    <img
                        class="w-1/2 rounded-lg border object-contain p-8 pr-6"
                        src="/ecosystem.png"
                        alt=""
                    />
                </div>
            </div>
        {/if}
    </section>
</IntersectionObserver>

<IntersectionObserver
    once={true}
    rootMargin="100px"
    element={nftsElement}
    let:intersecting
>
    <section
        bind:this={nftsElement}
        class="mx-auto max-w-5xl py-10"
    >
        {#if intersecting}
            <div
                in:fly={{
                    duration: 750,
                    y: 100,
                }}
                class="grid grid-cols-1 justify-center gap-x-5 md:grid-cols-12"
            >
                <div class="col-span-6">
                    <div
                        class="mx-auto grid w-3/4 grid-cols-8 gap-4 bg-base-300 py-3 pr-3"
                    >
                        {#each Array(8) as _}
                            <div
                                class="col-span-2 aspect-square w-full rounded-lg bg-secondary"
                            />
                        {/each}

                        <div
                            class="col-span-1 aspect-square w-full rounded-lg bg-secondary"
                        />
                        <div class="col-span-7">
                            <div
                                class="mb-3 h-5 w-1/3 rounded-lg bg-secondary"
                            />
                            <div
                                class="mb-3 h-2 w-2/3 rounded-lg bg-secondary"
                            />
                            <div class="h-2 w-1/4 rounded-lg bg-secondary" />
                        </div>
                        <div
                            class="col-span-1 aspect-square w-full rounded-lg bg-secondary"
                        />
                        <div class="col-span-7">
                            <div
                                class="mb-3 h-5 w-1/3 rounded-lg bg-secondary"
                            />
                            <div
                                class="mb-3 h-2 w-2/3 rounded-lg bg-secondary"
                            />
                            <div class="h-2 w-1/4 rounded-lg bg-secondary" />
                        </div>
                    </div>
                </div>
                <div class="col-span-6 flex h-full items-center">
                    <div>
                        <h1 class="text-3xl font-bold">
                            Token Details, NFT Buy/Sell History
                        </h1>
                        <p class="opacity-50">
                            View the NFTs and tokens held by a specified account
                            as well we the transaction history of a particular
                            token. This lets you do things like see all of the
                            bids, sales, lists, on a certain NFT.
                        </p>
                    </div>
                </div>
            </div>
        {/if}
    </section>
</IntersectionObserver>

<IntersectionObserver
    once={true}
    rootMargin="10%"
    element={heliusElement}
    let:intersecting
>
    <section
        bind:this={heliusElement}
        class="mx-auto max-w-5xl py-10"
    >
        {#if intersecting}
            <div
                in:fly={{
                    duration: 750,
                    y: 100,
                }}
                class="mx-auto max-w-5xl"
            >
                <div class="overflow-hidden pb-32">
                    <div class="mt-10 scale-150 md:mt-0">
                        {#if browser}
                            <LottiePlayer
                                src="/media/animation.json"
                                autoplay={true}
                                loop={true}
                                controls={false}
                                renderer="svg"
                                background="transparent"
                                height="300%"
                                width="300%"
                            />
                        {/if}
                    </div>
                </div>

                <div>
                    <h1 class="scale-100 text-6xl font-bold text-current">
                        Powered by

                        <span
                            class="bg-gradient-to-br from-orange-700 to-yellow-400 bg-clip-text text-transparent"
                        >
                            Helius
                        </span>
                    </h1>
                    <div class="mt-5 grid grid-cols-12 gap-4">
                        <div class="col-span-1 flex items-center">
                            <div
                                class="flex h-6 w-6 items-center justify-center rounded-full bg-white"
                            >
                                <Icon
                                    id="check"
                                    fill="black"
                                />
                            </div>
                        </div>
                        <div class="col-span-11">
                            <p class="opacity-50">
                                We provide the most powerful Solana RPC hardware
                                around. We offer the fastest speeds at the
                                lowest prices possible. We also provide private
                                RPCs for serious users.
                            </p>
                        </div>
                        <div class="col-span-1 flex items-center">
                            <div
                                class="flex h-6 w-6 items-center justify-center rounded-full bg-white"
                            >
                                <Icon
                                    id="check"
                                    fill="black"
                                />
                            </div>
                        </div>
                        <div class="col-span-11">
                            <p class="opacity-50">
                                Quickly build bots, analytics, marketplaces,
                                portfolio or wallet trackers using the most
                                complete Solana NFT API.
                            </p>
                        </div>
                        <div class="col-span-1 flex items-center">
                            <div
                                class="flex h-6 w-6 items-center justify-center rounded-full bg-white"
                            >
                                <Icon
                                    id="check"
                                    fill="black"
                                />
                            </div>
                        </div>
                        <div class="col-span-11">
                            <p class="opacity-50">
                                We allow you to query historical data by
                                multiple dimensions including transaction types
                                (DAO votes, NFT Mints, DeFi Swaps, etc) or
                                underlying protocols (Jupiter, Magic Eden, etc).
                            </p>
                        </div>
                        <div class="col-span-1 flex items-center">
                            <div
                                class="flex h-6 w-6 items-center justify-center rounded-full bg-white"
                            >
                                <Icon
                                    id="check"
                                    fill="black"
                                />
                            </div>
                        </div>
                        <div class="col-span-11">
                            <p class="opacity-50">
                                Stream on-chain events on up to 100k addresses
                                for free.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <button class="btn-primary btn mt-8">
                <a
                    href="https://helius.xys"
                    class="text-black"
                >
                    <span>Get Started</span>
                </a>
            </button>
        {/if}
    </section>
</IntersectionObserver>
