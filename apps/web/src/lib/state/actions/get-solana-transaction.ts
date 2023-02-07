import { parseTransaction } from "@helius-labs/xray-proton";

export default async (signature:string):Promise<any> => {
    const response = await fetch(`/api/solana/${signature}/transaction`);

    const { data }  = await response.json();

    const parsed = parseTransaction(data);

    console.log({ parsed });

    return parsed;
};
