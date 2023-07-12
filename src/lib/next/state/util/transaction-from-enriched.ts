import type { EnrichedTransaction } from "helius-sdk";

export const transactionFromEnriched = (enriched:EnrichedTransaction) => {
    console.log(enriched);

    return enriched
};