import { createQuery } from "@tanstack/svelte-query";

import getAccountInfo from "$lib/state/actions/get-solana-account-info";

export default (address:string) => createQuery({
    queryKey : [ "solana-account-info" ],
    queryFn  : () => getAccountInfo(address),
});
