import { grabIdl } from "$lib/util/grab-idl";
import { error } from "@sveltejs/kit";

export async function GET({ url }) {
    const account = url.searchParams.get("account");
    const isMainnetValue = url.searchParams.get("isMainnetValue");

    // Can't use $env/static/private directly in SvelteKit endpoints
    const { HELIUS_API_KEY } = process.env;

    if (!HELIUS_API_KEY || !account) {
        return new Response(
            JSON.stringify({
                error: "API key or account parameter not set",
                success: false,
            }),
            {
                headers: { "Content-Type": "application/json " },
                status: 400,
            }
        );
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
            return new Response(
                JSON.stringify({
                    error: "IDL not found",
                    success: false,
                }),
                {
                    headers: { "Content-Type": "application/json " },
                    status: 404,
                }
            );
        }
    } catch (err) {
        return new Response(
            JSON.stringify({
                error: "Failed to fetch IDL",
                success: false,
            }),
            {
                headers: { "Content-Type": "application/json " },
                status: 500,
            }
        );
    }
}
