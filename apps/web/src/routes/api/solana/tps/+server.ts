import {
    json,
} from "@sveltejs/kit";

import { Helius } from "helius-sdk";

const {
    HELIUS_KEY,
} = process.env;

// Consume a search, return what to do with it
export async function GET() {
    const heliusAPI = new Helius(HELIUS_KEY || "");

    const tps = await heliusAPI.getCurrentTPS();
    
    return json({
        data : {
            tps,
        },
    });
}
