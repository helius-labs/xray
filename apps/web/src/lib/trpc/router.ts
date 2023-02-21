import type { Context } from "$lib/trpc/context";

import { initTRPC } from "@trpc/server";

import { transactions } from "$lib/trpc/routes/transactions";
import { transaction } from "$lib/trpc/routes/transaction";
import { price } from "$lib/trpc/routes/price";
import { accountInfo } from "$lib/trpc/routes/account-info";
import { token } from "$lib/trpc/routes/token";

export const t = initTRPC.context<Context>().create();

export const router = t.router({
    token,
    price,
    accountInfo,
    transactions,
    transaction,
});

export type Router = typeof router;
