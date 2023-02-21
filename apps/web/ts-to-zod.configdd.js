// export { TRPCTransactionsInput, TRPCTransactionsOutput } from "./src/lib/types";

module.exports = [
    {
        name: "zod",
        output: "./src/types/trpc.zod.ts",
    },
];

export interface TRPCTransactionsInput {
    address: string;
    before?: string;
    size?: number;
}

export interface TRPCTransactionsOutput {
    data: ProtonTransaction[];
    oldest: string;
}
