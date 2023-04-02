import { Helius } from "helius-sdk";

import { t } from "$lib/trpc/t";

const { HELIUS_KEY } = process.env;

export const tps = t.procedure.query(async () => {
    const heliusAPI = new Helius(HELIUS_KEY || "");

    const tps = await heliusAPI.getCurrentTPS();

    return tps;
});
