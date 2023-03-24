import { t } from "$lib/trpc/t";

import { z } from "zod";

import { getAllDomains, reverseLookup } from "@bonfida/spl-name-service";
import { PublicKey } from "@solana/web3.js";
import connect from "src/lib/util/solana/connect";

const getBackpackUsername = async (address = "") => {
    const response = await fetch(
        `https://xnft-api-server.xnfts.dev/v1/users/fromPubkey?publicKey=${address}&blockchain=solana`
    );
    const data = await response.json();

    return data?.user?.username || "";
};

const getSolanaDomain = async (address = "") => {
    const connection = connect();
    const domainKey = new PublicKey(
        "7hPhaUpydpvm8wtiS3k4LPZKUmivQRs7YQmpE1hFshHx"
    );
    const allDomainKeys = await getAllDomains(connection, domainKey);
    const domainName = await reverseLookup(connection, allDomainKeys[0]);

    return domainName || "";
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
        const usernames = [];
        const backpackUsername = await getBackpackUsername(address);
        const solanaDomain = await getSolanaDomain(address);

        if (backpackUsername) {
            usernames.push({
                type: "backpack",
                username: backpackUsername,
            });
        }
        if (solanaDomain) {
            usernames.push({
                type: "bonfida",
                username: `${solanaDomain}.sol`,
            });
        }
        return usernames || [];
    });
