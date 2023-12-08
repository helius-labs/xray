import { t } from "$lib/trpc/t";

import { z } from "zod";

import { HELIUS_API_KEY } from "$env/static/private";

interface Username {
    type: "bonfida";
    username: string;
}

const getSolanaDomain = async (usernames: Username[], address = "") => {
    const url = `https://api.helius.xyz/v0/addresses/${address}/names?api-key=${HELIUS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data?.domainNames) {
        for (const domain of data.domainNames) {
            usernames.push({
                type: "bonfida",
                username: `${domain}.sol`,
            });
        }
    }
};

export const accountUsernames = t.procedure
    .input(z.string())
    .output(
        z.array(
            z.object({
                type: z.string(),
                username: z.string(),
            })
        )
    )
    .query(async ({ input: address }) => {
        const usernames: Username[] = [];
        await getSolanaDomain(usernames, address);

        return usernames || [];
    });
