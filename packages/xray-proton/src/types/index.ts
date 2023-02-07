import { Source } from "@helius-labs/helius-types";

export interface Transfer {
    sendingUser: string | null,
    receivingUser: string | null,
    tokenTransferQuantity: number,
    tokenTransferMintAddress: string,
    source: Source;
    timestamp: number;
}
