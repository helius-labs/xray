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

<script>
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";
    import Search from "$lib/components/search.svelte";
    import Stats from "src/lib/components/stats.svelte";

    let searchError = "";

    let isFocused = false;

    let clearSearch = () => null;
    let focusInput = () => null;

    onMount(() => {
        setTimeout(() => {
            focusInput();
        }, 100);
    });
</script>

<div
    class="relative mx-auto mt-3 w-full max-w-2xl px-3"
    in:fly={{
        delay: 1000,
        duration: 2000,
        y: 50,
    }}
>
    <div
        class="relative mx-auto w-full max-w-2xl px-3"
        in:fly={{
            delay: 600,
            duration: 2000,
            y: 50,
        }}
    >
        <Stats />
    </div>

    <div
        class="relative mx-auto w-full max-w-2xl px-3 pt-3"
        in:fly={{
            delay: 1600,
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
