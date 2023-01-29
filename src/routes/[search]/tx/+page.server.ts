import type { RequestEvent } from "../$types";

import getTransaction from "$lib/state/actions/get-solana-transaction";

export async function load({ params } : RequestEvent) {
    const transaction = await getTransaction(params.search);

    return transaction;
}
