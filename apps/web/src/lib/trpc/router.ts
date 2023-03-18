import type { Context } from "$lib/trpc/context";

import { initTRPC } from "@trpc/server";

import { accountInfo } from "$lib/trpc/routes/account-info";
import { asset } from "$lib/trpc/routes/asset";
import { balances } from "$lib/trpc/routes/balances";
import { price } from "$lib/trpc/routes/price";
import { rawTransaction } from "$lib/trpc/routes/raw-transaction";
import { token } from "$lib/trpc/routes/token";
import { tps } from "$lib/trpc/routes/tps";
import { transaction } from "$lib/trpc/routes/transaction";
import { transactions } from "$lib/trpc/routes/transactions";
import { blockTransactions } from "src/lib/trpc/routes/block-transactions";
import { currentSlot } from "src/lib/trpc/routes/current-slot";

export const t = initTRPC.context<Context>().create();

export const router = t.router({
    accountInfo,
    asset,
    balances,
    blockTransactions,
    currentSlot,
    price,
    rawTransaction,
    token,
    tps,
    transaction,
    transactions,
});

export type Router = typeof router;
