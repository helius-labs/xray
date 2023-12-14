import { z } from "zod";

import { t } from "$lib/trpc/t";
import { getAPIUrl } from "$lib/util/get-api-url";
import { HELIUS_API_KEY } from "$env/static/private";

export const deprecatedImage = t.procedure
    .input(z.string())
    .query(async ({ input: account }) => {
        const response = await fetch(
            `https://github.com/solana-labs/token-list/blob/main/assets/mainnet/${account}/logo.png?raw=true`
        );

        const contentType = response.headers.get("content-type");

        if (contentType?.includes("image/png")) {
            return `https://github.com/solana-labs/token-list/blob/main/assets/mainnet/${account}/logo.png?raw=true`;
        } else {
            const url = getAPIUrl(
                `/v0/token-metadata/?api-key=${HELIUS_API_KEY}`,
                true
            );
            const response = await fetch(url, {
                body: JSON.stringify({
                    includeOffChain: true,
                    mintAccounts: [account],
                }),
                method: "POST",
            });
            const json = await response.json();
            return json[0]?.legacyMetadata?.logoURI ?? "";
        }
    });
