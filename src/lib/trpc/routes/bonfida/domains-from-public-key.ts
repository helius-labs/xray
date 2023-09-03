import {
    reverseLookup,
    getAllDomains,
    getPicRecord,
    getUrlRecord,
    getDiscordRecord,
    getEmailRecord,
    getTwitterRecord,
    getGithubRecord,
    getTelegramRecord,
} from "@bonfida/spl-name-service";

import { t } from "$lib/trpc/t";

import { z } from "zod";

import { connect } from "$lib/xray";

import { PublicKey, type Connection } from "@solana/web3.js";

const { HELIUS_API_KEY } = process.env;

const getProfileRecords = async (connection: Connection, name: string) => {
    const [discord, email, github, pic, twitter, url, telegram] =
        await Promise.allSettled([
            getDiscordRecord(connection, name),
            getEmailRecord(connection, name),
            getGithubRecord(connection, name),
            getPicRecord(connection, name),
            getTwitterRecord(connection, name),
            getUrlRecord(connection, name),
            getTelegramRecord(connection, name),
        ]);

    return {
        discord: discord.status === "fulfilled" ? discord.value : null,
        email: email.status === "fulfilled" ? email.value : null,
        github: github.status === "fulfilled" ? github.value : null,
        pic: pic.status === "fulfilled" ? pic.value : null,
        telegram: telegram.status === "fulfilled" ? telegram.value : null,
        twitter: twitter.status === "fulfilled" ? twitter.value : null,
        url: url.status === "fulfilled" ? url.value : null,
    };
};

const getDomains = async (publicKey: string) => {
    const connection = connect("mainnet", HELIUS_API_KEY);

    try {
        const pubKey = new PublicKey(publicKey);

        const domains = await getAllDomains(connection, pubKey);

        return Promise.allSettled(
            domains.map(async (domain) => {
                try {
                    const name = await reverseLookup(connection, domain);
                    const result = await getProfileRecords(connection, name);

                    return {
                        name,
                        publicKey: domain,
                        records: result,
                    };
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                }
            })
        );
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);

        return null;
    }
};

export const domainsFromPublicKey = t.procedure
    .input(z.string())
    .query(async ({ input }) => {
        const domains = await getDomains(input);

        const result = domains?.map(({ value }) => value);

        return result;
    });
