<script lang="ts">
    import { onMount } from "svelte";

    import Search from "$lib/components/search.svelte";

    let searchError = "";

    let clearSearch = () => null;
    let focusInput = () => null;

    onMount(() => {
        setTimeout(() => {
            focusInput();
        }, 100);
    });
</script>

<div class="mx-auto max-w-2xl pt-20 md:pt-60">
    <div class="mb-10">
        <h1 class="glow text-center text-9xl font-bold text-black opacity-80">
            XRAY
        </h1>
    </div>

    <div class="w-full">
        <Search
            {searchError}
            bind:focusInput
            bind:clearSearch
            size="lg"
        />
    </div>
</div>
