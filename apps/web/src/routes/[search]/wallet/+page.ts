// import { trpcWithQuery } from "$lib/trpc/client";

// import type { PageLoad } from "./$types";

// export const load: PageLoad = async (event) => {
//     const { queryClient } = await event.parent();

//     const client = trpcWithQuery(event, queryClient);

//     const adddress = event.params.search;

//     return {
//         transactions: client.transactions.createServerQuery({
//             address: [adddress],
//         }),

//         account: client.accountInfo.createServerQuery(adddress),
//     };
// };
