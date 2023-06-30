import { t } from "$lib/trpc/t";

import { connect } from "$lib/xray";

const { HELIUS_API_KEY } = process.env;

export const currentSlot = t.procedure.query(async () => {
    const connection = connect("mainnet", HELIUS_API_KEY);

    const slot = await connection.getSlot();

    return slot;
});
