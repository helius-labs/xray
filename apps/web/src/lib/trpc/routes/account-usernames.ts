import { t } from "$lib/trpc/t";

import { z } from "zod";

// import { getAllDomains, reverseLookup } from "@bonfida/spl-name-service";
import { connect } from "@helius-labs/xray";
import { TldParser } from "@onsol/tldparser";
import type { MainDomain } from "@onsol/tldparser/dist/types/state/main-domain";
import { Connection, PublicKey } from "@solana/web3.js";

const { HELIUS_KEY } = process.env;

interface Username {
    type: "bonfida" | "backpack" | "ans";
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
    const url = `https://api.helius.xyz/v0/addresses/${address}/names?api-key=${HELIUS_KEY}`;
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

const getANSDomain = async (
    usernames: Username[],
    address = "",
    connection: Connection
) => {
    const ans = new TldParser(connection);
    let domain: MainDomain;
    console.log(address);

    try {
        domain = await ans.getMainDomain(address);
        console.log("ji", domain);
    } catch (error) {
        console.log("a", error);
        return "";
    }

    if (domain && domain?.domain && domain?.tld) {
        usernames.push({
            type: "ans",
            username: `${domain.domain}${domain.tld}`,
        });
    }

    return "";
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
        const connection = connect("mainnet", HELIUS_KEY);
        const usernames: Username[] = [];
        await getBackpackUsername(usernames, address);
        await getSolanaDomain(usernames, address);
        await getANSDomain(usernames, address, connection);

        return usernames || [];
    });
