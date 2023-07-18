export class RpcClient {
    constructor(connection) {
        this.connection = connection;
    }
    /**
     * Request an allocation of lamports to the specified address
     * @returns {Promise<SendAndConfirmTransactionResponse>}
     */
    async airdrop(publicKey, lamports, commitment) {
        const signature = await this.connection.requestAirdrop(publicKey, lamports);
        const blockhashWithExpiryBlockHeight = await this.getLatestBlockhash();
        const confirmResponse = await this.connection.confirmTransaction({
            signature,
            ...blockhashWithExpiryBlockHeight,
        }, commitment);
        return { signature, confirmResponse, ...blockhashWithExpiryBlockHeight };
    }
    /**
     * Fetch the latest blockhash from the cluster
     * @returns {Promise<BlockhashWithExpiryBlockHeight>}
     */
    async getLatestBlockhash(commitmentOrConfig = "finalized") {
        return this.connection.getLatestBlockhash(commitmentOrConfig);
    }
    /**
     * Returns the current transactions per second (TPS) rate — including voting transactions.
     *
     * @returns {Promise<number>} A promise that resolves to the current TPS rate.
     * @throws {Error} If there was an error calling the `getRecentPerformanceSamples` method.
     */
    async getCurrentTPS() {
        try {
            const samples = await this.connection.getRecentPerformanceSamples(1);
            return samples[0]?.numTransactions / samples[0]?.samplePeriodSecs;
        }
        catch (e) {
            throw new Error(`error calling getCurrentTPS: ${e}`);
        }
    }
}
