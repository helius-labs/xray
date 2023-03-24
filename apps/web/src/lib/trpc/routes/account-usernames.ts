import { t } from "$lib/trpc/t";

import { z } from "zod";

import { getAllDomains, reverseLookup } from "@bonfida/spl-name-service";
import { TldParser } from "@onsol/tldparser";
import { Connection, PublicKey } from "@solana/web3.js";
import connect from "src/lib/util/solana/connect";

const getBackpackUsername = async (address = "") => {
    const response = await fetch(
        `https://xnft-api-server.xnfts.dev/v1/users/fromPubkey?publicKey=${address}&blockchain=solana`
    );
    const data = await response.json();

    return data?.user?.username || "";
};

const getSolanaDomain = async (address = "", connection: Connection) => {
    const domainKey = new PublicKey(address);
    const allDomainKeys = await getAllDomains(connection, domainKey);
    if (allDomainKeys) {
        const domainName = await reverseLookup(connection, allDomainKeys[0]);
        return domainName;
    }

    return "";
};

const getANSDomain = async (address = "", connection: Connection) => {
    const ans = new TldParser(connection);
    const domain = await ans.getMainDomain(address);

    if (domain?.domain) {
        return `${domain.domain}${domain.tld}`;
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
        const connection = connect();
        const usernames = [];
        const backpackUsername = await getBackpackUsername(address);
        const solanaDomain = await getSolanaDomain(address, connection);
        const ansDomain = await getANSDomain(address, connection);

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
        if (ansDomain) {
            usernames.push({
                type: "ans",
                username: ansDomain,
            });
        }
        return usernames || [];
    });
