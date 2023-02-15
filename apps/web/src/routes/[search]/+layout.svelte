<script>
    import { onMount } from "svelte";

    import { state } from "svelte-snacks";

    const tokenRegistry = state("solanaTokenRegistry");

    onMount(() => {
        $tokenRegistry.load();
    });
</script>

<!-- The layout for /wallet /tx /token -->
<div class="min-h-screen px-3 pt-28">
    <div class="mx-auto w-full max-w-2xl">
        <slot />
    </div>
</div>
