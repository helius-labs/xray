import { z } from "zod";

import { t } from "$lib/trpc/t";

import { connect } from "$lib/xray";

import { LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const { HELIUS_API_KEY } = process.env;

import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";

export const accountInfo = t.procedure
    .input(z.string())
    .query(async ({ input: address }) => {
        const connection = connect("mainnet", HELIUS_API_KEY);

        const domainName = "bonfida"; // With or without the .sol at the end

        // Step 1
        const { pubkey } = await getDomainKey(domainName);

        // Step 2
        // The registry object contains all the info about the domain name
        // The NFT owner is of type PublicKey | undefined
        const { registry, nftOwner } = await NameRegistryState.retrieve(
            connection,
            pubkey
        );

        // Subdomain derivation
        // const subDomain = "dex.bonfida"; // With or without the .sol at the end
        // const { pubkey: subKey } = await getDomainKey(subDomain);

        // // Record derivation (e.g IPFS record)
        // const record = "IPFS.bonfida"; // With or without the .sol at the end
        // const { pubkey: recordKey } = await getDomainKey(record, true);

        return {};
    });
