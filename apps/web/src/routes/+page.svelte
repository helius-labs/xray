<script lang="ts">
    import { onMount } from "svelte";

    import heliusLogo from "$lib/assets/helius/helius.png";

    import Icon from "$lib/components/icon.svelte";
    import Search from "$lib/components/search.svelte";

    let searchError = "";

    let clearSearch = () => null;
    let focusInput = () => null;

    onMount(focusInput);
</script>

<div class="md:pt-50 mx-auto max-w-2xl pt-20">
    <div>
        <h1 class="text-center text-8xl font-bold text-white opacity-80">
            <span class="opacity-50">X</span>RAY
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
