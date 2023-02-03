export default async (address:string):Promise<any> => {
    const response = await fetch(`/api/solana/${address}/token`);

    const { data }  = await response.json();

    return data;
};
