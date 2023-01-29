import { createQuery } from "@tanstack/svelte-query";

import getAccountInfo from "src/lib/state/actions/get-solana-account-info";

export default (address:string) => createQuery({
    queryKey : [ "solana-account-info" ],
    queryFn  : () => getAccountInfo(address),
});
