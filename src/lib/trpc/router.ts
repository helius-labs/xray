import type { Context } from "$lib/trpc/context";

import { initTRPC } from "@trpc/server";

import { accountInfo } from "$lib/trpc/routes/account-info";
import { accountUsernames } from "$lib/trpc/routes/account-usernames";
import { asset } from "$lib/trpc/routes/asset";
import { balances } from "$lib/trpc/routes/balances";
import { concurrentMerkleTree } from "$lib/trpc/routes/concurrent-merkle-tree";
import { currentSlot } from "$lib/trpc/routes/current-slot";
import { deprecatedImage } from "./routes/deprecated-image";
import { niftyAsset } from "$lib/trpc/routes/nifty-asset";
import { price } from "$lib/trpc/routes/price";
import { rawTransaction } from "$lib/trpc/routes/raw-transaction";
import { searchAssets } from "./routes/search-assets";
import { token } from "$lib/trpc/routes/token";
import { tps } from "$lib/trpc/routes/tps";
import { transaction } from "$lib/trpc/routes/transaction";
import { transactions } from "$lib/trpc/routes/transactions";
import { blockTransactions } from "$lib/trpc/routes/block-transactions";
import { assets } from "$lib/trpc/routes/assets";
import { cnftTransactions } from "./routes/cnft-transactions";

export const t = initTRPC.context<Context>().create();

export const router = t.router({
    accountInfo,
    accountUsernames,
    asset,
    assets,
    balances,
    blockTransactions,
    cnftTransactions,
    concurrentMerkleTree,
    currentSlot,
    deprecatedImage,
    niftyAsset,
    price,
    rawTransaction,
    searchAssets,
    token,
    tps,
    transaction,
    transactions,
});

export type Router = typeof router;
