import { createQuery } from "@tanstack/svelte-query";

import getTransaction from "$lib/state/actions/get-solana-transaction";

export default (address:string) => createQuery({
    queryKey : [ `solana-account-transaction` ],
    queryFn  : () => getTransaction(address),
});
