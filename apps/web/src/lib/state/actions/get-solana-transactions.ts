import type { EnrichedTransaction } from "@helius-labs/types";

import { parseTransaction } from "@helius-labs/xray-proton";

export default async (address:string):Promise<EnrichedTransaction[]> => {
    const response = await fetch(`/api/solana/${address}/transactions`);

    const { data }  = await response.json();
    
    const parsed = data.map((tx:EnrichedTransaction) => parseTransaction(tx));

    console.log({ parsed });
    
    return [ ...parsed ];
};
