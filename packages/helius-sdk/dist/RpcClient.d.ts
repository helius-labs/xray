import { BlockhashWithExpiryBlockHeight, TransactionSignature, Commitment, PublicKey, GetLatestBlockhashConfig, RpcResponseAndContext, SignatureResult, Blockhash, Connection } from "@solana/web3.js";
export type SendAndConfirmTransactionResponse = {
    signature: TransactionSignature;
    confirmResponse: RpcResponseAndContext<SignatureResult>;
    blockhash: Blockhash;
    lastValidBlockHeight: number;
};
export declare class RpcClient {
    protected readonly connection: Connection;
    constructor(connection: Connection);
    /**
     * Request an allocation of lamports to the specified address
     *
     * @returns {Promise<SendAndConfirmTransactionResponse>}
     */
    airdrop(publicKey: PublicKey, lamports: number, commitment?: Commitment): Promise<SendAndConfirmTransactionResponse>;
    /**
     * Fetch the latest blockhash from the cluster
     *
     * @returns {Promise<BlockhashWithExpiryBlockHeight>}
     */
    getLatestBlockhash(commitmentOrConfig?: Commitment | GetLatestBlockhashConfig): Promise<BlockhashWithExpiryBlockHeight>;
    /**
     * Returns the current transactions per second (TPS) rate — including voting
     * transactions.
     *
     * @returns {Promise<number>} A promise that resolves to the current TPS rate.
     * @throws {Error} If there was an error calling the
     *   `getRecentPerformanceSamples` method.
     */
    getCurrentTPS(): Promise<number>;
}
