// https://github.com/solana-labs/explorer/blob/master/app/components/account/ConcurrentMerkleTreeCard.tsx

import { t } from "$lib/trpc/t";
import { getRPCUrl } from "$lib/util/get-rpc-url";
import { connect } from "$lib/xray";
import { ConcurrentMerkleTreeAccount } from "@solana/spl-account-compression";
import { PublicKey, Connection } from "@solana/web3.js";
import { z } from "zod";

import { HELIUS_API_KEY } from "$env/static/private";

export const concurrentMerkleTree = t.procedure
    .input(z.object({ address: z.string(), isMainnet: z.boolean() }))
    .query(async ({ input }) => {
        const connection = new Connection(
            getRPCUrl(`?api-key=${HELIUS_API_KEY}`, input.isMainnet),
            "confirmed"
        );

        const pubkey = new PublicKey(input.address);
        const cmt = await ConcurrentMerkleTreeAccount.fromAccountAddress(
            connection,
            pubkey
        );

        const authority = cmt.getAuthority();
        const root = cmt.getCurrentRoot();
        const seq = cmt.getCurrentSeq().toString();
        const canopyDepth = cmt.getCanopyDepth();
        const maxBufferSize = cmt.getMaxBufferSize();
        const treeHeight = cmt.getMaxDepth();
        const creationSlot = cmt.getCreationSlot().toNumber();
        const rightMostIndex = cmt.tree.rightMostPath.index;

        return {
            authority,
            canopyDepth,
            creationSlot,
            maxBufferSize,
            rightMostIndex,
            root,
            seq,
            treeHeight,
        };
    });
