<script lang="ts">
    import { onMount } from "svelte";
    import { showConnectWallet } from "$lib/state/stores/connect-wallet";

    import Icon from "$lib/components/icon.svelte";

    export let mobileNav = true;

    let isBackpack = false;

    const connectWallet = () => {
        showConnectWallet();
    };

    onMount(() => {
        isBackpack =
            window?.localStorage?.getItem("walletAdapter") === '"Backpack"';
    });
</script>

{#if mobileNav}
    <button
        class="bg-faint btn-outline btn w-full"
        on:click|preventDefault={connectWallet}
    >
        <span class="hidden text-sm md:block"
            >{isBackpack ? "🎒" : ""}Connect Wallet</span
        >
        <span class="md:hidden">
            <Icon
                id="wallet"
                size="md"
            />
        </span>
    </button>
{:else}
    <button
        class="bg-faint btn-outline btn"
        on:click|preventDefault={connectWallet}
    >
        <span class="text-sm">{isBackpack ? "🎒" : ""}Connect Wallet</span>
    </button>
{/if}
