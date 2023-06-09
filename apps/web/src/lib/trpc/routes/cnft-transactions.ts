import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

type SignaturesResponse = {
    total: number;
    limit: number;
    page: number;
    items: string[][];
};

export const signature = t.procedure
    .input(z.string())
    .query(async ({ input }) => {
        const url = `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`;

        const response: SignaturesResponse = await fetch(url, {
            body: JSON.stringify({
                id: "signatures",
                jsonrpc: "2.0",
                method: "getSignaturesForAsset",
                params: {
                    id: input,
                    page: 1,
                },
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        }).then((res) => res.json());

        const signatures = response.items.map((signature) => {
            return signature[0];
        });
    });
