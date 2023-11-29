import { t } from "$lib/trpc/t";
import { z } from "zod";

import { Connection } from "@solana/web3.js";
import { getRPCUrl } from "$lib/util/get-rpc-url";

const { HELIUS_API_KEY } = process.env;

export const currentSlot = t.procedure
    .input(z.tuple([z.boolean()]))
    .query(async ({ input }) => {
        const [isMainnet] = input;

        const connection = new Connection(
            getRPCUrl(`?api-key=${HELIUS_API_KEY}`, isMainnet),
            "confirmed"
        );

        const slot = await connection.getSlot();

        return slot;
    });
