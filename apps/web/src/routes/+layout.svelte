<style>
    .grid {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 4rem;
    }
</style>

<script lang="ts">
    import "../app.postcss";

    import type { LayoutData } from "./$types";

    import { QueryClientProvider } from "@tanstack/svelte-query";

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
    } from "src/lib/state/stores/connect-wallet";

    import Footer from "$lib/components/footer.svelte";
    import Modals from "$lib/components/modals.svelte";
    import Nav from "$lib/components/nav.svelte";

    export let data: LayoutData;

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

<QueryClientProvider client={data.queryClient}>
    <main>
        <div class="max-w-screen relative mx-auto">
            <div class="relative mx-auto">
                <slot />
            </div>
        </div>
    </main>
</QueryClientProvider>

<!-- <Footer /> -->
