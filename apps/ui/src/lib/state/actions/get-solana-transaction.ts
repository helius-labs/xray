import { parseTransaction } from "@helius/makeover";

export default async (signature:string):Promise<any> => {
    const response = await fetch(`/api/solana/${signature}/transaction`);

    const { data }  = await response.json();

    const parsed = parseTransaction(data);

    return parsed;
};
