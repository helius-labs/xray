<style>
    .intro {
        min-height: 65vh;
    }

    .main {
        grid-template-rows: repeat(20, 1fr);
    }

    .intro {
        grid-row: span 19;
    }
</style>

<script lang="ts">
    import { onMount } from "svelte";

    import { fly } from "svelte/transition";

    import Icon from "$lib/components/icon.svelte";
    import Search from "$lib/components/search.svelte";
    import IntersectionObserver from "svelte-intersection-observer";
    import Footer from "$lib/components/footer.svelte";
    import Nav from "$lib/components/nav.svelte";
    import Stats from "src/lib/components/stats.svelte";

    let searchError = "";

    let exploreELement: HTMLElement;
    let heliusElement: HTMLElement;

    let isFocused = false;

    let clearSearch = () => null;
    let focusInput = () => null;

    let animate = false;

    onMount(() => {
        animate = true;

        setTimeout(() => {
            focusInput();
        }, 100);
    });
</script>

<div
    style="background-image: url(/media/gradient.png);"
    class="absolute top-1/2 left-1/2 z-0 h-full w-full -translate-y-1/2 -translate-x-1/2 bg-cover bg-center"
/>

{#if animate}
    <div class="main grid h-screen grid-cols-1">
        <Nav liteMode={true} />

        <div class="intro relative flex h-full w-full items-center">
            <div
                class="z-10 mx-auto flex w-full flex-col items-center md:-translate-y-1/4"
            >
                <div class="mb-10">
                    <h1
                        class="text-center text-9xl font-bold opacity-80"
                        in:fly={{
                            duration: 4000,
                            y: -50,
                        }}
                    >
                        XRAY
                    </h1>
                </div>

                <div
                    class="w-full max-w-2xl px-3"
                    in:fly={{
                        delay: 600,
                        duration: 2000,
                        y: 50,
                    }}
                >
                    <Stats />
                </div>

                <div
                    class="relative mt-3 w-full max-w-2xl px-3"
                    in:fly={{
                        delay: 1000,
                        duration: 2000,
                        y: 50,
                    }}
                >
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
        <Footer />
    </div>
{/if}
