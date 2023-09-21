import fetch from "node-fetch";
import type { JupiterToken, TokenMap } from "$lib/types";

const getJupiterTokens = async (): Promise<TokenMap> => {
    try {
        const data = await fetch(`https://token.jup.ag/all`);
        const jsonData = await data.json();

        if (!Array.isArray(jsonData)) {
            throw new Error("Unexpected data format from Jupiter API");
        }

        const tokens: JupiterToken[] = jsonData as JupiterToken[];
        const tokenMap = tokens.reduce((acc: TokenMap, token: JupiterToken) => {
            acc[token.symbol] = token.address;
            return acc;
        }, {});

        return tokenMap;
    } catch (error: any) {
        throw new Error("Failed to fetch tokens from Jupiter");
    }
};

export default getJupiterTokens;
