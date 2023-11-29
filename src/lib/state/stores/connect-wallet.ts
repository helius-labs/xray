// A simple global store that lets us setup the conenct wallet boilerplate in the
// main +layout and then trigger it from anywhere in the app.
import { writable, get, derived } from "svelte/store";

import { walletStore } from "@svelte-on-solana/wallet-adapter-core";

import {
    PhantomWalletAdapter,
    // BackpackWalletAdapter,
    // GlowWalletAdapter,
    SolflareWalletAdapter,
    // BraveWalletAdapter,
} from "@solana/wallet-adapter-wallets";

export const wallets = [
    new PhantomWalletAdapter(),
    // new BackpackWalletAdapter(),
    new SolflareWalletAdapter(),
    // new GlowWalletAdapter(),
    // new BraveWalletAdapter(),
];

export const isConnectingWallet = writable(false);

export const showConnectWallet = () => isConnectingWallet.set(true);

export const hideConnectWallet = () => isConnectingWallet.set(false);

export const connectWallet = async (event: CustomEvent) => {
    await get(walletStore).select(event.detail);
    await get(walletStore).connect();

    const publicKey = get(walletStore).publicKey;
    if (publicKey) {
        console.log("Connected Wallet Public Key:", publicKey.toBase58());
    }

    isConnectingWallet.set(false);
};

export const connectedPublicKey = derived(walletStore, ($walletStore) => {
    return $walletStore.publicKey;
});
