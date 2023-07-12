import { ASSET } from "$lib/next/constants";

const filterMime = (filter: string = "image" | "video" | "text/html", files = []) =>
    files
        .filter(({ mime = "" }) => mime.startsWith(filter))
        .map((file) => file.uri);

export const assetFromDas = (das) => {

    const str = JSON.stringify({das}, null, 2);

    const asset: Asset = ASSET();

    asset.type = "asset";

    // Extract details from DAS
    asset.id = das?.id;

    asset.externalUrl = das?.content?.links?.external_url || das?.content?.metadata?.external_url || "";
    asset.name = das?.content?.metadata?.name || "";
    asset.description = das?.content?.metadata?.description || "";
    asset.jsonUri = das?.content?.jsonUri || "";
    asset.mutable = das?.mutable || false;
    asset.interface = das?.content?.interface || "";
    asset.burnt = das?.burnt || false;

    // Files
    asset.files.images = filterMime("image", das?.content?.files);
    asset.files.videos = filterMime("video", das?.content?.files);
    asset.files.htmlFiles = filterMime("text/html", das?.content?.files);

    asset.image = asset.files.images[0] || das?.content?.metadata?.image || "";



    asset.thumbnail = asset.image
        ? `https://cdn.helius.services/cdn-cgi/image/width=100/${asset.image}`
        : "";
    asset.animationUrl = asset.files.videos[0] || das?.content?.metadata?.animation_url || das?.content?.metadata?.animationUrl || "";
    asset.htmlFile = asset.files.htmlFiles[0] || "";

    // Standardize attribute properties to camelCase
    asset.attributes =
        das?.content?.metadata?.attributes?.map(
            ({ traitType, trait_type, value }) => ({
                traitType: traitType || trait_type,
                value,
            })
        ) || [];

    // Creators
    asset.creators = das?.creators;

    // Royalty
    asset.royalty = {
        basisPoints: das?.royalty?.basisPoints || 0,
        locked: das?.royalty?.locked || false,
        percent: das?.royalty?.percent || 0,
        primarySaleHappened: das?.royalty?.primarySaleHappened || false,
        target: das?.royalty?.target || "",
    };

    // Ownership
    asset.owner = das?.ownership?.owner || "";
    asset.delegate = das?.ownership?.delegate || "";
    asset.delegated = das?.ownership?.delegated || false;
    asset.frozen = das?.ownership?.frozen || false;
    asset.ownershipModel = das?.ownership?.ownership_model || "";

    // Commpression
    asset.compressed = das?.compression?.compressed || false;
    asset.assetHash = das?.compression?.asset_hash || "";
    asset.creatorHash = das?.compression?.creator_hash || "";
    asset.dataHash = das?.compression?.data_hash || false;
    asset.leafId = das?.compression?.data_hash || false;
    asset.seq = das?.compression?.seq || false;
    asset.tree = das?.compression?.tree || "";

    // Authorities
    asset.authorities = das?.authorities || [];

    // Grouping
    asset.grouping = das?.grouping || [];

    // if(str.includes("Mask On")) {
    //     console.log(asset)
    //   }
    return asset;
};
