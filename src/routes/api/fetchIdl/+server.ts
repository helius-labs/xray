import { grabIdl } from "$lib/util/grab-idl";
import { error } from "@sveltejs/kit";

export async function GET({ url }) {
    const account = url.searchParams.get("account");
    const isMainnetValue = url.searchParams.get("isMainnetValue");

    // Can't use $env/static/private directly in SvelteKit endpoints
    const { HELIUS_API_KEY } = process.env;

    if (!HELIUS_API_KEY || !account) {
        throw error(500, "API key not set");
    }

    try {
        const idl = await grabIdl(
            account,
            isMainnetValue === "true",
            HELIUS_API_KEY
        );

        if (idl) {
            return new Response(JSON.stringify({ idl }), {
                headers: { "Content-Type": "application/json" },
            });
        } else {
            throw error(404, "IDL not found");
        }
    } catch (err) {
        throw error(500, "Failed to fetch IDL");
    }
}
