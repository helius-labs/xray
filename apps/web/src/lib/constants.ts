import type { modals } from "$lib/config";
import type {
    FetchModel,
    Asset,
    Assets,
    AssetMedia,
    OwnedAssets,
} from "$lib/types";

export const SOL = "So11111111111111111111111111111111111111112";

export const HELIUS_IMAGE_CDN = "https://cdn.helius.services/cdn-cgi/image";
export const PREVIEW_CDN = `${HELIUS_IMAGE_CDN}/width=300`;

// Hard coded details for frequestly used tokens.
// These get added to the initial assets dict below.
export const STATIC_TOKEN_DETAILS = [
    {
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png",
        id: "So11111111111111111111111111111111111111112",
        name: "SOL",
        symbol: "SOL",
    },
    {
        icon: "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png",
        id: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        name: "USDC",
        symbol: "USDC",
    },
];

export const OWNED_ASSETS = (): OwnedAssets => ({
    token: [],
    das: [],
    unknown: [],
});

export const ASSET_MEDIA = () =>
    ({
        htmlFiles: [],
        images: [],
        other: [],
        videos: [],
    } as AssetMedia);

export const ASSET = () =>
    ({
        attributes: [],
        creators: [],
        description: "",
        externalUrl: "",
        frozen: false,
        id: "",
        imagePreview: "",
        media: ASSET_MEDIA(),
        name: "",
        symbol: "",
        type: "unknown",
        uri: "",
        isEnriching: false,
    } as Asset);

export const FETCH_MODEL = () =>
    ({
        data: undefined,
        enriched: false,
        hasFetched: undefined,
        isLoading: false,
        nextCursor: undefined,
    } as FetchModel<any>);

// Populate default value for main assets dict
export const ASSETS = (): Assets =>
    new Map(
        STATIC_TOKEN_DETAILS.map((token) => [
            token.id,
            {
                ...FETCH_MODEL(),
                data: {
                    ...ASSET(),
                    id: token.id,
                    imagePreview: token.icon,
                    media: {
                        ...ASSET().media,
                        images: [token.icon],
                    },
                    name: token.name,
                    symbol: token.name,
                    type: "token",
                },
            },
        ])
    );

export type Modals = keyof typeof modals;
