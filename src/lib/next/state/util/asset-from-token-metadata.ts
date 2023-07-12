import { ASSET } from "$lib/next/constants";
import type { Asset } from "$lib/next/types";

const fileType = (files, t) => files?.filter(({ type = "" }) => type.startsWith(t)).map((file) => file.uri);

export const assetFromTokenMetadata = (tokenMetadata) => {
    const {
        onChainAccountInfo : accountInfo = {},
        onChainMetadata = {},
        offChainMetadata,
        legacyMetadata,
    } = tokenMetadata;

    const onChain = onChainMetadata?.metadata?.data;

    const { metadata, uri } = offChainMetadata || {};

    const asset: Asset = ASSET(tokenMetadata);

    asset.type = legacyMetadata ? "token" : "asset";

    asset.compressed = false;

    asset.id = tokenMetadata.account;

    asset.name = legacyMetadata?.name || metadata?.name || onChain?.name;

    asset.description = metadata?.description;

    asset.symbol = metadata?.name || legacyMetadata?.symbol;

    asset.uri =  onChainMetadata?.metadata?.data?.uri || uri;

    asset.image = metadata?.image || legacyMetadata?.logoURI;
    
    if(metadata?.files) {
        asset.files.videos.push(
            ...fileType(metadata.files, "video"),
        )

        asset.files.images.push(
            ...fileType(metadata.files, "image"),
        );

        asset.files.html.push(
            ...fileType(metadata.files, "text/html"),
        );
    }

    if(!metadata?.files) {
        asset.files.images.push(asset.image);
        asset.files.videos.push(asset.animationUrl);
    }
    
    asset.htmlFile = asset?.files?.htmlFiles[0];

    asset.animationUrl = metadata?.animation_url || asset?.files?.videos[0];

    asset.creators = metadata?.creators;

    asset.attributes = metadata?.attributes?.map(({ traitType, trait_type, value } : {
        traitType?: string,
        trait_type?: string,
        value: string,
    }) => ({
        traitType: traitType || trait_type,
        value,
    }));

    console.log({asset})

    return asset;
};
