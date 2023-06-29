export type Fetchable<T> = {
    data: T;
    error?: string;
    loading?: boolean;
    hasFetched?: boolean;
    pages?: any[][];
    cursor?: string | number;
};

export type Balance = {
    amount: number;
    id: string;
    exchangeRate: {
        USD: number | null;
    };
};

export type Attribute = {
    traitType: string;
    value: string;
};

export type Creator = {
    address: string;
    share: number;
    verified: boolean;
};

export type Authorities = {
    address: string;
    scopes: string[];
};

export type Grouping = {
    groupKey: string;
    groupValue: string;
};

export type Asset = {
    id: string;
    compressed: boolean;
    name: string;
    symbol: string;
    image: string;
    authorities: Authorities[];
    grouping: Grouping[];
    files: {
        images: string[];
        videos: string[];
        htmlFiles: string[];
    };
    royalty: {
        basisPoints: number;
        locked: boolean;
        percent: number;
        primarySaleHappened: boolean;
        royaltyModel: string;
        target: string;
    };
    burnt: boolean;
    thumbnail: string;
    animationUrl: string;
    htmlFile: string;
    description: string;
    owner: string;
    mutable: boolean;
    frozen: boolean;
    delegate: string;
    attributes: Attribute[];
    creators: Creator[];
    dataHash: string;
    creatorHash: string;
    assetHash: string;
    tree: string;
    seq: number;
    leafId: number;
    collectionKey: string;
    jsonUri: string;
    ownershipModel: string;
    interface: string;
    type: "token" | "asset" | null;
};

export type AssetsState = Fetchable<Map<string, Asset>>;

export type BalancesState = Fetchable<Map<string, Balance>>;
