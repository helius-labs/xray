import { createQuery } from "@helius-labs/xray-query";

import getTransactions from "$lib/state/actions/get-solana-transactions";

export default (address:string) => createQuery({
    queryKey : [ "solana-account-transactions" ],
    queryFn  : () => getTransactions(address),
});
