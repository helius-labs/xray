import { SOL } from "$lib/xray";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

let getTokenValue = (
    token: any,
    solData: any,
    lamports: any
): number | undefined => {
    if (token.id !== SOL) {
        if (!token.token_info.price_info) {
            return undefined;
        }
        return (
            (token.token_info?.price_info?.price_per_token *
                token.token_info.balance) /
            10 ** token.token_info.decimals
        );
    } else {
        if (!lamports) {
            return undefined;
        }
        return (solData * lamports) / LAMPORTS_PER_SOL;
    }
};

export default (tokens: any[], solData: any, lamports: any): any[] => {
    //add individual SOL entry for edge case handling
    tokens.push({ id: SOL });

    return tokens.sort((a, b) => {
        const valueA = getTokenValue(a, solData, lamports);
        const valueB = getTokenValue(b, solData, lamports);

        if (a.id === SOL || b.id === SOL) {
            // eslint-disable-next-line no-console
            console.log(valueA, valueB);
        }

        if (valueA === undefined) {
            return 1;
        } else if (valueB === undefined) {
            return -1;
        } else if (valueA === undefined && valueB === undefined) {
            return 0;
        } else {
            return valueB - valueA;
        }
    });
};
