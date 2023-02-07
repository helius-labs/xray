import { createQuery } from "@helius-labs/xray-query";

import getPrice from "$lib/state/actions/get-solana-price";

export default () => createQuery({
    queryKey : [ "solana-price" ],
    queryFn  : getPrice,
});
