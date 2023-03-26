import { t } from "$lib/trpc/t";

import { z } from "zod";

import { getAllDomains, reverseLookup } from "@bonfida/spl-name-service";
// import { TldParser } from "@onsol/tldparser";
import { Connection, PublicKey } from "@solana/web3.js";
import connect from "src/lib/util/solana/connect";

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

const getSolanaDomain = async (
    usernames: Username[],
    address = "",
    connection: Connection
) => {
    const domainKey = new PublicKey(address);
    const allDomainKeys = await getAllDomains(connection, domainKey);
    const domains: string[] = [];
    if (allDomainKeys) {
        for (const key of allDomainKeys) {
            const domainName = await reverseLookup(connection, key);
            usernames.push({
                type: "bonfida",
                username: `${domainName}.sol`,
            });
        }
    }
    return domains;
};

// const getANSDomain = async (address = "", connection: Connection) => {
//     const ans = new TldParser(connection);
//     let domain;

//     try {
//         domain = await ans.getMainDomain(address);
//     } catch (error) {
//         return "";
//     }

//     if (domain && domain?.domain && domain?.tld) {
//         return `${domain.domain}${domain.tld}`;
//     }

//     return "";
// };

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
        const usernames: Username[] = [];
        await getBackpackUsername(usernames, address);
        await getSolanaDomain(usernames, address, connection);
        // const ansDomain = await getANSDomain(address, connection);

        // if (ansDomain) {
        //     usernames.push({
        //         type: "ans",
        //         username: ansDomain,
        //     });
        // }
        return usernames || [];
    });
