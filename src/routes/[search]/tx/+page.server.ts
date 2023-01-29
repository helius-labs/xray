import getTransaction from "$lib/solana/get-transaction";

export async function load({ params, url }) {
    const [ transaction ] = await getTransaction(params.search);

    return {
        transaction,
    };
}
