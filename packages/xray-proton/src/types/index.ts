import { Source } from "@helius-labs/helius-types";

export interface ProtonTransfer {
    sendingUser: string | null,
    receivingUser: string | null,
    tokenTransferQuantity: number,
    tokenTransferMintAddress: string,
    source: Source;
    timestamp: number;
}

export type ProtonTokensBurned = {
    tokenBurned: string;
    tokenBurnedAmount: number;
}

export interface ProtonBurn {
    sendingUser: string | null;
    tokensBurned: ProtonTokensBurned[];
    source: Source;
    timestamp: number;
}
