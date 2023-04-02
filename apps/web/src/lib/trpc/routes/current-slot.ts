import { t } from "$lib/trpc/t";

import { connect } from "@helius-labs/xray";

const { HELIUS_KEY } = process.env;

export const currentSlot = t.procedure.query(async () => {
    const connection = connect("mainnet", HELIUS_KEY);

    const slot = await connection.getSlot();

    return slot;
});
