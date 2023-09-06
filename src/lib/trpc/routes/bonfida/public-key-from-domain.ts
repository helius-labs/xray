import { z } from "zod";
import { t } from "$lib/trpc/t";
import { connect } from "$lib/xray";
import { owned } from "$lib/util/stores/owner";
import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";

const { HELIUS_API_KEY } = process.env;

export const domain = t.procedure.input(z.string()).query(async ({ input }) => {
    try {
        const connection = connect("mainnet", HELIUS_API_KEY);
        const { pubkey } = await getDomainKey(input);
        const { registry } = await NameRegistryState.retrieve(
            connection,
            pubkey
        );
        const owner = registry.owner.toBase58();
        owned.set(true);
        return {
            owner: owner,
        };
    } catch (error) {
        owned.set(false);
        return null;
    }
});
