import { t } from "$lib/trpc/t";
import connect from "src/lib/util/solana/connect";

export const currentSlot = t.procedure.query(async () => {
    const connection = connect();

    const slot = await connection.getSlot();

    return slot;
});
