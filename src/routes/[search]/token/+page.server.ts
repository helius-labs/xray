import getTransaction from "$lib/solana/get-transactions";

export async function load({ params, url }) {
    const transaction = await getTransaction(params.search);

    console.log({ transaction });

    return {
        data : {
            transaction,
        },
    };
}
