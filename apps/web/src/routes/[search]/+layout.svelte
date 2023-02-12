 <!-- The layout for /wallet /tx /token -->
<div class="min-h-screen px-3 pt-28">
    <div class="w-full max-w-2xl mx-auto">
        <slot></slot>
    </div>
</div>

<script>
    import { onMount } from "svelte";

    import { state } from "svelte-snacks";

    const tokenRegistry = state("solanaTokenRegistry");

    onMount(() => {
        $tokenRegistry.load();
    });
</script>
