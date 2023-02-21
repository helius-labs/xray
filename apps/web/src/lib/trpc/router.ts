import type { Context } from "$lib/trpc/context";

import { initTRPC } from "@trpc/server";

import { transactions } from "$lib/trpc/routes/transactions";
import { price } from "$lib/trpc/routes/price";
import { accountInfo } from "$lib/trpc/routes/account-info";

export const t = initTRPC.context<Context>().create();

export const router = t.router({
    price,
    accountInfo,
    transactions,
});

export type Router = typeof router;
