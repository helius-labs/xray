<script lang="ts">
    import "../app.postcss";
    import { onMount } from "svelte";

    import { fly } from "svelte/transition";

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

    import { updateTokensMap, tokens } from "$lib/state/tokens";

    import Footer from "$lib/components/footer.svelte";
    import Modals from "$lib/components/modals.svelte";

    export let data: LayoutData;

    const localStorageKey = "walletAdapter";
    const network = clusterApiUrl("mainnet-beta");

    let animate = false;

    // eslint-disable-next-line no-console
    $: console.log("tokens", $tokens);

    onMount(() => (animate = true));
</script>

<Modals />

<div
    style="background-image: url(/media/gradient.png);"
    class="pointer-none absolute top-1/2 left-1/2 z-0 h-full w-full -translate-y-1/2 -translate-x-1/2 bg-cover bg-center"
/>

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
    <main class="flex min-h-screen">
        {#if animate}
            <div class="mx-auto w-full max-w-2xl pt-5">
                <h1
                    in:fly={{
                        delay: 600,
                        duration: 4000,
                        y: -50,
                    }}
                    class="mb-3 mt-10 text-center text-8xl font-bold text-white opacity-40"
                >
                    {#each "XRAY" as char, idx}
                        <span
                            in:fly={{
                                delay: 1000 + 300 * idx,
                                duration: 6000,
                                y: -50,
                            }}
                        >
                            {char}
                        </span>
                    {/each}
                </h1>

                <slot />
            </div>
        {/if}
    </main>

    <div>
        <Footer />
    </div>
</QueryClientProvider>
