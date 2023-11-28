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
    } from "$lib/state/stores/connect-wallet";

    import Footer from "$lib/components/footer.svelte";
    import Modals from "$lib/components/modals.svelte";
    import Nav from "$lib/components/nav.svelte";

    export let data: LayoutData;
</script>

<Modals />

<QueryClientProvider client={data.queryClient}>
    <main class="min-h-screen">
        <Nav />

        <div class="max-w-screen relative mx-auto">
            <div class="relative mx-auto">
                <slot />
            </div>
        </div>
    </main>
    <Footer />
</QueryClientProvider>
