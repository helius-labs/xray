// // WIP boilerplate for creating events
// import type { RequestEvent } from "@sveltejs/kit";

// import PrismaClient from "@helius/xray-database";

// export async function POST({ request }: RequestEvent) {
//     const {
//         type = "view-tracker",
//         data = {},
//     } = await request.json();

//     const prisma = new PrismaClient();

//     await prisma.event.create({
//         type,
//         detail : JSON.stringify(data),
//     });

//     return new Response(JSON.stringify({}));
// }
