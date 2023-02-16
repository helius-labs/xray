import { json } from "@sveltejs/kit";

import { Helius } from "helius-sdk";

import randomBetween from "$lib/util/random-between";

const { HELIUS_KEY } = process.env;

// Consume a search, return what to do with it
export async function GET() {
    if (!HELIUS_KEY) {
        return json({
            data: {
                tps: randomBetween(1000, 7000),
            },
        });
    }

    const heliusAPI = new Helius(HELIUS_KEY || "");

    const tps = await heliusAPI.getCurrentTPS();

    return json({
        data: {
            tps,
        },
    });
}
