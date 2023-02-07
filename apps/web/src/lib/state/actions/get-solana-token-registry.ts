import type { TokenInfo } from "@solana/spl-token-registry";

import { TokenListProvider } from "@solana/spl-token-registry";

export default async ():Promise<TokenInfo[]> => {
    const tokenListProvider = new TokenListProvider();

    const tokenList = await tokenListProvider.resolve();

    return tokenList.filterByClusterSlug("mainnet-beta").getList();
};
