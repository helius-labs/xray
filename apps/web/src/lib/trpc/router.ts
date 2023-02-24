import type { Context } from "$lib/trpc/context";

import { initTRPC } from "@trpc/server";

import { accountInfo } from "$lib/trpc/routes/account-info";
import { price } from "$lib/trpc/routes/price";
import { token } from "$lib/trpc/routes/token";
import { transaction } from "$lib/trpc/routes/transaction";
import { transactions } from "$lib/trpc/routes/transactions";
import { rawTransaction } from "./routes/raw-transaction";

export const t = initTRPC.context<Context>().create();

export const router = t.router({
    accountInfo,
    price,
    rawTransaction,
    token,
    transaction,
    transactions,
});

export type Router = typeof router;
