import type { EnrichedTransaction } from "../../../../../../../helius-sdk/dist";
import { parseTransaction } from "../../../../../../packages/makeover/src";

export default async (address:string):Promise<EnrichedTransaction> => {
    const response = await fetch(`/api/solana/${address}/transactions`);

    const { data }  = await response.json();
    
    const parsed = data.map((tx:EnrichedTransaction) => parseTransaction(tx));

    return parsed;
};
