import { Helius } from "helius-sdk";

import { t } from "$lib/trpc/t";

const { HELIUS_API_KEY } = process.env;

export const tps = t.procedure.query(async () => {
    const helius = new Helius(HELIUS_API_KEY || "");

    const tps = await helius.rpc.getCurrentTPS();

    return tps;
});
