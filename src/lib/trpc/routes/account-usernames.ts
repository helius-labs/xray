import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_KEY } = process.env;

interface Username {
    type: "bonfida" | "backpack";
    username: string;
}

const getSolanaDomain = async (usernames: Username[], address = "") => {
    const data = await fetch(
        `https://api.helius.xyz/v0/addresses/${address}/names?api-key=${HELIUS_KEY}`
    ).then((response) => response.json());

    if (data?.domainNames) {
        for (const domain of data.domainNames) {
            usernames.push({
                type: "bonfida",
                username: `${domain}.sol`,
            });
        }
    }
};

const getBackpackUsername = async (usernames: Username[], address = "") => {
    const data = await fetch(
        `https://xnft-api-server.xnfts.dev/v1/users/fromPubkey?publicKey=${address}&blockchain=solana`
    ).then((response) => response.json());

    if (data?.user?.username) {
        usernames.push({
            type: "backpack",
            username: data.user.username,
        });
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
        await Promise.all([
            getSolanaDomain(usernames, address),
            getBackpackUsername(usernames, address),
        ]);

        return usernames || [];
    });
