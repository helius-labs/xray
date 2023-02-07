import { createQuery } from "@tanstack/svelte-query";

import getSplTokenRegistry from "src/lib/state/actions/get-solana-token-registry";

export default () => createQuery({
    queryKey : [ "spl-token-registry" ],
    queryFn  : getSplTokenRegistry,
});
