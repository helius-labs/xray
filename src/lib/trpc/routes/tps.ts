import { Helius } from "helius-sdk";

import { t } from "$lib/trpc/t";
import { z } from "zod";

const { HELIUS_API_KEY } = process.env;

export const tps = t.procedure
.input(z.boolean())
.query(async ({input}) => {
    let helius;
    if (input == true ) { 
    helius = new Helius(HELIUS_API_KEY || "");

    } else { 
    helius = new Helius(HELIUS_API_KEY || "", "devnet");

    }
    const tps = await helius.rpc.getCurrentTPS();
    return tps;
});
