export const ASSET = (asset?: Asset) => ({
    animationUrl: "",
    assetHash: "",
    attributes: [],
    burnt: false,
    collectionKey: "",
    compressed: false,
    creatorHash: "",
    creators: [],
    dataHash: "",
    delegate: "",
    description: "",
    files: {
        htmlFiles: [],
        images: [],
        videos: [],
    },
    frozen: false,
    htmlFile: "",
    id: "",
    image: "",
    jsonUri: "",
    leadId: 0,
    mutable: false,
    name: "",
    owner: "",
    seq: 0,
    symbol: "",
    tree: "",
    type: null,
    ...asset,
});

export const BALANCE = (balance?: Balance) => ({
    amount: 0,
    exchangeRate: {
        USD: null,
    },
    mint: "",
    ...asset,
});

export const SOL = "So11111111111111111111111111111111111111112";
