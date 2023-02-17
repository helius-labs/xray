import {
    json,
    type RequestEvent
} from "@sveltejs/kit";

const {
    HELIUS_KEY,
} = process.env;

export async function GET({ params }: RequestEvent) {
    const address = params?.address as string;
    const response = await fetch(`https://api.helius.xyz/v0/addresses/${address}/names?api-key=${HELIUS_KEY}`);

    const [ data ] = await response.json();

    return json({ data });
}
