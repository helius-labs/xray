import { parseTransaction } from "@helius/makeover";

export default async (address:string):Promise<any> => {
    const response = await fetch(`/api/solana/${address}/transactions`);

    const { data }  = await response.json();
    
    const parsed = data.map((tx:any) => parseTransaction(tx));

    return parsed;
};
