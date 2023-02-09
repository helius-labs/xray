export default async (signature:string):Promise<any> => {
    if(!signature) {
        return null;
    }
    
    const response = await fetch(`/api/solana/${signature}/transaction`);

    const { data }  = await response.json();

    return data;
};
