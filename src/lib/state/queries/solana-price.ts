import { createQuery } from "@tanstack/svelte-query";

import getPrice from "$lib/state/actions/get-solana-price";

export default () => createQuery({
    queryKey : [ "solana-price" ],
    queryFn  : getPrice,
});
