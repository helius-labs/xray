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

<div class="mx-auto max-w-2xl pt-20 md:pt-48">
    <div>
        <h1 class="text-center text-8xl font-bold text-white opacity-80">
            XRAY
        </h1>
    </div>

    <Search
        {searchError}
        bind:focusInput
        bind:clearSearch
        size="lg"
    />
</div>
