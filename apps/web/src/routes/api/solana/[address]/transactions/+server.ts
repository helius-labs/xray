import { json, type RequestEvent } from "@sveltejs/kit";

const {
    HELIUS_KEY,
    MOCK_ENDPOINTS,
} = process.env;

import transactionsMock from "./test/transactions.mock";

// Consume a search, return what to do with it
export async function GET({ params }: RequestEvent) {
    if(!MOCK_ENDPOINTS) {
        const response = await fetch(`https://api.helius.xyz/v0/addresses/${params.address}/transactions?api-key=${HELIUS_KEY}`);
    
        const data  = await response.json();
        
        return json({ data });
    }

    return json({ data : transactionsMock });
}
