// A simple global store that lets us setup the conenct wallet boilerplate in the
// main +layout and then trigger it from anywhere in the app.
import { writable, get } from "svelte/store";

import { walletStore } from "@svelte-on-solana/wallet-adapter-core";

import {
    PhantomWalletAdapter,
    BackpackWalletAdapter,
    GlowWalletAdapter,
    SolflareWalletAdapter,
    BraveWalletAdapter,
    WalletConnectWalletAdapter,
} from "@solana/wallet-adapter-wallets";

export const wallets = [
    new PhantomWalletAdapter(),
    new BackpackWalletAdapter(),
    new SolflareWalletAdapter(),
    new GlowWalletAdapter(),
    new BraveWalletAdapter(),
    // new WalletConnectWalletAdapter({
    //     network,
    //     options: {
    //         metadata: {
    //             description: "XRAY Explorer",
    //             icons: [
    //                 "https://xray.helius.xyz/_app/immutable/assets/helius-icon-ae7c46c0.png",
    //             ],
    //             name: "XRAY Explorer",
    //         },

    //         // example WC app project ID
    //         projectId: "7b48cd5fd2ecd9103609d5e6bb8e5417",
    //         relayUrl: "wss://relay.walletconnect.com",
    //     },
    // }),
];

export const isConnectingWallet = writable(false);

export const showConnectWallet = () => isConnectingWallet.set(true);

export const hideConnectWallet = () => isConnectingWallet.set(false);

export const connectWallet = async (event: CustomEvent) => {
    await get(walletStore).select(event.detail);
    await get(walletStore).connect();

    isConnectingWallet.set(false);
};
