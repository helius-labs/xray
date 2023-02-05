// // WIP boilerplate for getting events by type
// import type { RequestEvent } from "@sveltejs/kit";

// import PrismaClient from "@helius/xray-database";

// export async function GET({ params }:RequestEvent) {
//     const prisma = new PrismaClient();
    
//     const events = await prisma.event.findMany({
//         where : {
//             type : params.type,
//         },
//     });

//     return new Response(JSON.stringify({
//         data : events || {},
//     }));
// }
