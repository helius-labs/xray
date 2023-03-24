import { t } from "$lib/trpc/t";

import { z } from "zod";

import { SOL } from "@helius-labs/xray-proton";

import type { UITokenMetadata } from "$lib/types";

const { HELIUS_KEY, HELIUS_API_URL } = process.env;

import { tokens } from "@helius-labs/xray-test";

export const token = t.procedure
    .input(z.array(z.string()))
    .query(async ({ input }) => {
        const metadata: UITokenMetadata = {
            address: "",
            attributes: [],
            collectionKey: "",
            creators: [],
            description: "",
            image: "",
            name: "",
        };

        const price = await fetch(
            `https://public-api.birdeye.so/public/price/?address=${input}`
        );

        const priceJson = await price.json();

        if (!HELIUS_KEY) {
            metadata.price = 25;

            const mocked = tokens.find(
                ({ mint, account }) => mint === input[0] || account === input[0]
            );

            return mocked;
        }

        if (input[0] === SOL) {
            metadata.name = "SOL";
            metadata.image = "/media/tokens/solana.png";
            metadata.address = SOL;
            metadata.price = priceJson?.data?.value || 0;
            return {
                isSOL: true,
                metadata,
            };
        } else {
            //check if token is a compressed NFT
            const url = `https://rpc.helius.xyz/?api-key=${HELIUS_KEY}`;

            const response = await fetch(url, {
                body: JSON.stringify({
                    id: "asset",
                    jsonrpc: "2.0",
                    method: "getAsset",
                    params: [...input],
                }),
                headers: {
                    "Content-Type": "application/json",
                },
                method: "POST",
            });

            const data = await response.json();

            if (data?.result?.compression?.compressed === true) {
                const assetData = await fetch(data.result.content.json_uri);
                const returnAssetData = await assetData.json();

                metadata.address = data?.result?.id || "";
                metadata.attributes = returnAssetData?.attributes || [];
                metadata.collectionKey =
                    data?.result?.grouping[0]?.group_value || "";
                metadata.creators = data?.result?.creators || [];
                metadata.description = returnAssetData?.description || "";
                metadata.image = returnAssetData?.image || "";
                metadata.name = returnAssetData?.name || "";

                return {
                    isCompressed: true,
                    metadata,
                };
            } else {
                //Get token metadata
                const response = await fetch(
                    `${HELIUS_API_URL}/v0/token-metadata/?api-key=${HELIUS_KEY}`,
                    {
                        body: JSON.stringify({
                            includeOffChain: true,
                            mintAccounts: input,
                        }),
                        method: "POST",
                    }
                );

                const json = await response.json();

                const data = json?.length ? json[0] : {};

                metadata.address = data?.account;
                metadata.attributes =
                    data?.offChainMetadata?.metadata?.attributes;
                metadata.creators =
                    data?.onChainMetadata?.metadata?.data?.creators;
                metadata.description =
                    data?.offChainMetadata?.metadata?.description;
                metadata.collectionKey =
                    data?.onChainMetadata?.metadata?.collection?.key;
                metadata.image =
                    data?.offChainMetadata?.metadata?.image ||
                    data?.onChainMetadata?.metadata?.data.image ||
                    data?.legacyMetadata?.logoURI;
                metadata.name =
                    data?.offChainMetadata?.metadata?.name ||
                    data?.legacyMetadata?.name ||
                    data?.onChainMetadata?.metadata?.data.name;
                metadata.price = priceJson?.data?.value || 0;

                //Check if token is an NFT
                let isNFT =
                    metadata?.attributes && metadata?.attributes?.length > 0;

                return {
                    isNFT,
                    metadata,
                };
            }
        }
    });
