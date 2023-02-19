<script lang="ts">
    import { state } from "svelte-snacks";

    const xrayConfig = state("xrayConfig");
</script>

{#if $xrayConfig.data.isMocked}
    <div
        class="fixed top-0 w-full bg-warning text-center text-xs font-bold text-black"
    >
        MOCKED DATA
    </div>
{/if}
