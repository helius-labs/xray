import { t } from "$lib/trpc/t";

import { z } from "zod";

import { connect } from "@helius-labs/xray";
import {
    ANS_PROGRAM_ID,
    TLD_HOUSE_PROGRAM_ID,
    TldParser,
} from "@onsol/tldparser";
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

const getAllTldHouses = async (connection: Connection) => {
    const filters: any = [
        {
            memcmp: {
                bytes: [247, 144, 135, 1, 238, 173, 19, 249],
                offset: 0,
            },
        },
    ];
    const allTldHouses = await connection.getProgramAccounts(
        TLD_HOUSE_PROGRAM_ID,
        {
            filters,
        }
    );
    const allTldHousesPubkeys = allTldHouses.map((data) => {
        return {
            pubkey: data.pubkey,
            tld: data.account.data
                .subarray(108, 116)
                .toString()
                .replace(/\x00/g, ""),
        };
    });
    return allTldHousesPubkeys;
};

async function findAllReverseAccountsForTld(
    connection: Connection,
    nameClassAccount: PublicKey
): Promise<PublicKey[]> {
    const filters: any = [
        {
            memcmp: {
                bytes: nameClassAccount.toBase58(),
                offset: 72,
            },
        },
    ];

    const accounts = await connection.getProgramAccounts(ANS_PROGRAM_ID, {
        filters: filters,
    });
    return accounts.map((a: any) =>
        a.account.data
            .subarray(200, a.account.data.length)
            .toString()
            .replace(/\x00/g, "")
    );
}

const getANSDomain = async (
    usernames: Username[],
    address = "",
    connection: Connection
) => {
    const allTldHousesPubkeys = await getAllTldHouses(connection);
    let reverseLookUps = {};

    // Use a for loop instead of forEach with an async callback function
    for (const { pubkey, tld } of allTldHousesPubkeys) {
        const reverseLookups = await findAllReverseAccountsForTld(
            connection,
            pubkey
        );

        // Make sure the tld key exists in reverseLookUps before pushing to its array
        if (!reverseLookUps[tld]) {
            reverseLookUps[tld] = [];
        }

        reverseLookUps[tld].push(reverseLookups);
    }

    console.log(reverseLookUps);
    // const ans = new TldParser(connection);
    // let domain: MainDomain;
    // console.log(address);

    // try {
    //     domain = await ans.getMainDomain(address);
    //     console.log("ji", domain);
    // } catch (error) {
    //     console.log("a", error);
    //     return "";
    // }

    // if (domain && domain?.domain && domain?.tld) {
    //     usernames.push({
    //         type: "ans",
    //         username: `${domain.domain}${domain.tld}`,
    //     });
    // }

    // return "";
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
