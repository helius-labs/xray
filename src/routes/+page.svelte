<style>
    .intro {
        min-height: 65vh;
    }

</style>

<script lang="ts">
    import { onMount } from "svelte";
    import Search from "$lib/components/search.svelte";

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

<div class="intro relative flex h-screen w-full items-center">
    <div
        style="background-image: url(/media/gradient.png);"
        class="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-cover bg-center"
    />

    <div class="mx-auto w-full max-w-2xl md:-translate-y-1/4">
        <div class="mb-10">
            <h1 class="text-center text-9xl font-bold opacity-80">XRAY</h1>
        </div>

        <div class="relative w-full px-3">
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
