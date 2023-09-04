import {
    reverseLookup,
    getAllDomains,
    getRecord,
} from "@bonfida/spl-name-service";

import { t } from "$lib/trpc/t";

import { z } from "zod";

import { connect } from "$lib/xray";

import { PublicKey, type Connection } from "@solana/web3.js";

import { SOCIAL_BONFIDA_RECORDS, type SocialBonfidaRecord } from "$lib/types";

const { HELIUS_API_KEY } = process.env;

const getSocialRecords = async (connection: Connection, name: string) => {
    const socialRecords = Object.keys(SOCIAL_BONFIDA_RECORDS);

    const getRecordByType = async (record: SocialBonfidaRecord) => {
        const resolved = await getRecord(connection, name, record, true);

        return {
            [record]: resolved,
        };
    };

    const results = await Promise.allSettled(
        socialRecords.map((record) => getRecordByType(record))
    );

    return results.reduce((acc, result) => {
        if (result.status === "fulfilled") {
            return {
                ...acc,
                ...result.value,
            };
        }

        return acc;
    }, {});
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
                    const records = await getSocialRecords(connection, name);

                    return {
                        name,
                        publicKey: domain,
                        records,
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
