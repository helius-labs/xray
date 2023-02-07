export default async (address:string):Promise<any> => {
    const response = await fetch(`/api/solana/${address}/account-info`);

    const json = await response.json();

    return json?.data;
};
