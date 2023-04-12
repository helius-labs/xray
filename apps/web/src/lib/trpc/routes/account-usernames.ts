import { t } from "$lib/trpc/t";

import { z } from "zod";

// import { getAllDomains, reverseLookup } from "@bonfida/spl-name-service";
import { HELIUS_KEY } from "$env/static/private";
import { connect } from "@helius-labs/xray";
import { TldParser } from "@onsol/tldparser";
import type { MainDomain } from "@onsol/tldparser/dist/types/state/main-domain";
import { Connection, PublicKey } from "@solana/web3.js";

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
    address = ""
    // connection: Connection
) => {
    const domainKey = new PublicKey(address);
    // const allDomainKeys = await getAllDomains(connection, domainKey);
    // const domains: string[] = [];
    // if (allDomainKeys) {
    //     for (const key of allDomainKeys) {
    //         const domainName = await reverseLookup(connection, key);
    //         username     s.push({
    //             type: "bonfida",
    //             username: `${domainName}.sol`,
    //         });
    //     }
    // }
    const response = await fetch(
        `https://sns-sdk-proxy.bonfida.workers.dev/reverse-lookup/${address}`
    );
    const { result = "" } = await response.json();
    console.log(result);
    // return domains;
};

const getANSDomain = async (address = "", connection: Connection) => {
    // const RPC_URL =
    //     "https://newest-intensive-choice.solana-mainnet.discover.quiknode.pro/b14717fce4a4f1e59e7287e5ac9bdf40fdada346/";
    // connection = new Connection(RPC_URL);
    console.log(new PublicKey("7hPhaUpydpvm8wtiS3k4LPZKUmivQRs7YQmpE1hFshHx"));
    // const owner = new PublicKey("7hPhaUpydpvm8wtiS3k4LPZKUmivQRs7YQmpE1hFshHx");
    // const owner = new PublicKey(address);
    const ans = new TldParser(connection);
    // const owner = await ans.getAllUserDomains(address);
    // const owner = new PublicKey(address);
    let domain: MainDomain;
    // let domain = await ans.getMainDomain(address);

    try {
        domain = await ans.getMainDomain(owner);
        console.log("ji", domain);
    } catch (error) {
        console.log("a", error);
        return "";
    }

    if (domain && domain?.domain && domain?.tld) {
        return `${domain.domain}${domain.tld}`;
    }

    console.log("d", domain);

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
        const ansDomain = await getANSDomain(address, connection);

        if (ansDomain) {
            usernames.push({
                type: "ans",
                username: ansDomain,
            });
        }
        return usernames || [];
    });
