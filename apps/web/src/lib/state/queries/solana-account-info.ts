import { createQuery } from "@helius-labs/xray-query";

import getAccountInfo from "$lib/state/actions/get-solana-account-info";

export default (address:string) => createQuery({
    id   : [ "solana-account-info" ],
    load : () => getAccountInfo(address),
});
