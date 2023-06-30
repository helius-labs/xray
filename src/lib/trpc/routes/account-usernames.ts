import { t } from "$lib/trpc/t";

import { z } from "zod";

const { HELIUS_API_KEY } = process.env;

interface Username {
    type: "bonfida" | "backpack";
    username: string;
}

const getBackpackUsername = async (usernames: Username[], address = "") => {
    const response = await fetch(
        `https://xnft-api-server.xnfts.dev/v1/users/fromPubkey?publicKey=${address}&blockchain=solana`
    );
    const data = await response.json();

    if (data?.user?.username) {
        usernames.push({
            type: "backpack",
            username: data.user.username,
        });
    }
};

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
        await getBackpackUsername(usernames, address);
        await getSolanaDomain(usernames, address);

        return usernames || [];
    });
