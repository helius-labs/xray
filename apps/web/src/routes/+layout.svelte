<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 4rem;
    }
</style>

<script lang="ts">
    import "../app.postcss";

    import { page } from "$app/stores";

    import { clusterApiUrl } from "@solana/web3.js";

    import {
        workSpace,
        WalletProvider,
        ConnectionProvider,
        WalletModal,
    } from "@svelte-on-solana/wallet-adapter-ui";

    import {
        wallets,
        showConnectWallet,
        hideConnectWallet,
        isConnectingWallet,
        connectWallet,
    } from "src/lib/state/stores/connect-wallet";

    const localStorageKey = "walletAdapter";
    const network = clusterApiUrl("mainnet-beta");

    import Nav from "$lib/components/nav.svelte";
    import DevBanner from "$lib/components/dev-banner.svelte";
    import Footer from "$lib/components/footer.svelte";

    import { SnackProvider } from "svelte-snacks";

    import * as queries from "$lib/state/queries";
</script>

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

<SnackProvider config={{ queries }}>
    <main class="grid min-h-screen">
        <DevBanner />
        <Nav />

        <div class="relative mx-auto w-full px-3">
            <slot />
        </div>
    </main>
</SnackProvider>

<Footer />
