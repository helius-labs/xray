/* eslint-disable max-statements */
import type { RequestEvent } from "./$types";

import type { ParsedAccountData } from "@solana/web3.js";

import { redirect } from "@sveltejs/kit";

import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";
import connect from "src/lib/util/solana/connect";

import search from "src/lib/util/search";

import validatePubkey from "$lib/util/solana/validate-pubkey";

// Decide where to go based on the search param.
export async function load({ params, url }: RequestEvent) {
    if (!validatePubkey(params?.search)) {
        throw redirect(307, "/");
    }
}
