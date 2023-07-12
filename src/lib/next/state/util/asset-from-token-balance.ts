import { ASSET, BALANCE } from "$lib/next/constants";

export const assetFromBalance = (tokenBalance) => {
    const asset: Asset = ASSET();

    // Extract details from DAS
    asset.id = tokenBalance.mint;

    asset.type = tokenBalance.decimals > 0 ? "asset" : "token";

    return asset;
};
