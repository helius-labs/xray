import { createQuery } from "@tanstack/svelte-query";

import getToken from "$lib/state/actions/get-solana-token";

export default (address:string) => createQuery({
    queryKey : [ "solana-account-token" ],
    queryFn  : () => getToken(address),
});
