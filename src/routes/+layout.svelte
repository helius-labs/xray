<script lang="ts">
    import "../app.postcss";

    import { clusterApiUrl } from "@solana/web3.js";

    import {
        ConnectionProvider,
        WalletModal,
        WalletProvider,
        workSpace,
    } from "@svelte-on-solana/wallet-adapter-ui";

    import {
        connectWallet,
        hideConnectWallet,
        isConnectingWallet,
        showConnectWallet,
        wallets,
    } from "$lib/state/stores/connect-wallet";

    import Footer from "$lib/components/footer.svelte";
    import Modals from "$lib/components/modals.svelte";
    import Nav from "$lib/components/nav.svelte";

    const localStorageKey = "walletAdapter";
    const network = clusterApiUrl("mainnet-beta");
</script>

<Modals />

{#if $isConnectingWallet}
    <WalletModal
        maxNumberOfWallets="6"
        on:connect={connectWallet}
        on:close={hideConnectWallet}
    />
{/if}

<WalletProvider
    autoConnect={false}
    {localStorageKey}
    {wallets}
/>

<ConnectionProvider {network} />

<!-- <QueryClientProvider client={data.queryClient}>
</QueryClientProvider> -->
<main class="min-h-screen">
    <Nav />

    <div class="max-w-screen relative mx-auto">
        <div class="relative mx-auto">
            <slot />
        </div>
    </div>
</main>

<Footer />
