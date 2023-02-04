// WIP boilerplate for getting events by type
import PrismaClient from "@helius/xray-database";
import type { RequestEvent } from "@sveltejs/kit";

export async function GET({ params }:RequestEvent) {
    const prisma = new PrismaClient();
    
    const events = await prisma.event.findMany({
        where : {
            type : params.type,
        },
    });

    return new Response(JSON.stringify({
        data : events || {},
    }));
}
