/* eslint-disable no-console */
/* eslint-disable this/no-this */
import { writable, type Writable } from "svelte/store";
import { PublicKey, Keypair, Connection } from "@solana/web3.js";
import * as anchor from "@coral-xyz/anchor";
import { getRPCUrl } from "../get-rpc-url";

// Define the internal state type
type IdlState = anchor.Idl | null;

class IdlStore {
    private store: Writable<IdlState>;

    constructor() {
        this.store = writable<IdlState>(null);
    }

    // Method to get the store's subscription method
    subscribe(run: (value: IdlState) => void) {
        return this.store.subscribe(run);
    }

    // Method to manually set the store's state
    set(idl: IdlState) {
        this.store.set(idl);
    }

    // Method to update the store's state
    update(updater: (value: IdlState) => IdlState) {
        this.store.update(updater);
    }
}

// Create an instance of the custom store
export const idlStore = new IdlStore();

// Function to fetch IDL and update the store
export async function grabIdl(
    accountAddress: string,
    isMainnetValue: boolean,
    apiKey: string
) {
    try {
        const connection = new Connection(
            getRPCUrl(`?api-key=${apiKey}`, isMainnetValue),
            "confirmed"
        );
        const aWallet = new anchor.Wallet(Keypair.generate());
        const provider = new anchor.AnchorProvider(
            connection,
            aWallet,
            anchor.AnchorProvider.defaultOptions()
        );

        const accountPubkey = new PublicKey(accountAddress);
        const idl = await anchor.Program.fetchIdl(accountPubkey, provider);

        // Directly use the idlStore instance to set the IDL
        idlStore.set(idl);
    } catch (error) {
        console.error("Error fetching IDL:", error);
        idlStore.set(null);
    }
}
