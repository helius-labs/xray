import { parseTransaction } from "$lib/util/solana/parse-transactions";

export default async (signature:string):Promise<any> => {
    const response = await fetch(`/api/solana/${signature}/transaction`);

    const { data }  = await response.json();
    
    return parseTransaction(data);
};
