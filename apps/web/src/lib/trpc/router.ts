import type { Context } from "$lib/trpc/context";

import { initTRPC } from "@trpc/server";

import { accountInfo } from "$lib/trpc/routes/account-info";
import { accountUsernames } from "$lib/trpc/routes/account-usernames";
import { asset } from "$lib/trpc/routes/asset";
import { currentSlot } from "$lib/trpc/routes/current-slot";
import { price } from "$lib/trpc/routes/price";
import { token } from "$lib/trpc/routes/token";
import { tps } from "$lib/trpc/routes/tps";
import { transaction } from "$lib/trpc/routes/transaction";
import { transactions } from "$lib/trpc/routes/transactions";
import { balances } from "./routes/balances";
import { rawTransaction } from "./routes/raw-transaction";

export const t = initTRPC.context<Context>().create();

export const router = t.router({
    accountInfo,
    accountUsernames,
    asset,
    balances,
    currentSlot,
    price,
    rawTransaction,
    token,
    tps,
    transaction,
    transactions,
});

export type Router = typeof router;
