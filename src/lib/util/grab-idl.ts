import {
    PublicKey,
    Keypair,
    Connection,
    Transaction,
    VersionedTransaction,
} from "@solana/web3.js";
import { AnchorProvider, Program, type Idl } from "@coral-xyz/anchor";
import { getRPCUrl } from "./get-rpc-url";
import { idlStore } from "./stores/idl";

type DummyTransaction = { dummy: true };

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

        // In the future, look into ambiguous export errors for Anchor's Wallet class
        // For now, we create a dummy wallet and use it with the provider
        // This is enough since we aren't actually using the wallet to sign anything
        const dummyKeypair = Keypair.generate();
        const dummyWallet = {
            publicKey: dummyKeypair.publicKey,
            signAllTransactions: <T extends Transaction | VersionedTransaction>(
                txs: T[]
            ): Promise<T[]> => Promise.resolve(txs),
            signTransaction: <T extends Transaction | VersionedTransaction>(
                tx: T
            ): Promise<T> => Promise.resolve(tx),
        };

        const provider = new AnchorProvider(
            connection,
            dummyWallet,
            AnchorProvider.defaultOptions()
        );

        const accountPubkey = new PublicKey(accountAddress);
        const idl = (await Program.fetchIdl(
            accountPubkey,
            provider
        )) as Idl | null;

        return idl;
    } catch (error) {
        return null;
    }
}
