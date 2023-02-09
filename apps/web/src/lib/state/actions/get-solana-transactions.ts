import type { EnrichedTransaction } from "@helius-labs/types";

export default async (address:string):Promise<EnrichedTransaction[]> => {
    const response = await fetch(`/api/solana/${address}/transactions`);

    const { data }  = await response.json();
        
    return data;
};
