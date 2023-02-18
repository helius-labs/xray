import { json, type RequestEvent } from "@sveltejs/kit";

import connect from "$lib/util/solana/connect";

import { getDomainKey, NameRegistryState } from "@bonfida/spl-name-service";

export async function GET({ params }: RequestEvent) {
    const connection = connect();

    const domain = params?.domain as string;

    const { pubkey } = await getDomainKey(domain);

    const data = await NameRegistryState.retrieve(connection, pubkey);

    // const address = data.registry.owner;

    return json({
        data,
    });
}
