import { z } from "zod";

import { t } from "$lib/trpc/t";

import { connect } from "$lib/xray";
import { LAMPORTS_PER_SOL, PublicKey, Connection } from "@solana/web3.js";
import { getRPCUrl } from "$lib/util/get-rpc-url";

import { HELIUS_API_KEY } from "$env/static/private";
import { getAssetAccountDataSerializer } from "@nifty-oss/asset";

export const niftyAsset = t.procedure
    .input(z.tuple([z.string(), z.boolean()]))
    .query(async ({ input }) => {
        const [address, isMainnet] = input;
        const connection = new Connection(
            getRPCUrl(`?api-key=${HELIUS_API_KEY}`, isMainnet),
            "confirmed"
        );

        const pubKey = new PublicKey(address);

        const accountInfo = await connection.getAccountInfo(pubKey);

        if (accountInfo) {
            return getAssetAccountDataSerializer().deserialize(
                accountInfo.data
            );
        }

        return null;
    });
