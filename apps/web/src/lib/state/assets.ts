import { writable, get } from "svelte/store";
import { fetchJson } from "$lib/util/fetch";

import type { FetchModel, Dict } from "$lib/types";

type Asset = FetchModel<{
    id: string;
    name: string;
    symbol: string;
    description: string;
    image: string;
    image_preview: string;
    attributes: {
        traitType: string;
        value: string;
    }[];
}>;

type AssetByOwner = Dict<FetchModel<string[]>>;

type AssetByGroup = Dict<FetchModel<string[]>>;

const assets = writable<Dict<Asset>>(new Map());

const assetsByOwner = writable<AssetByOwner>();

const assetsByGroup = writable<AssetByGroup>();

const addAsset = (asset: { id: string }) => {
    assets.update((assetMap) => {
        assetMap.set(asset.id, {
            data: {
                attributes: [],
                description: "",
                id: asset.id,
                image: "",
                image_preview: "",
                name: "",
                symbol: "",
            },
        });

        return assetMap;
    });
};

const addAssetByOwner = (ownerAddress: string, asset: { id: string }) => {
    assetsByOwner.update((map = new Map()) => {
        let result = map.get(ownerAddress);

        if (!result) {
            result = {
                data: [],
            };
        }

        if (!result.data.includes(asset.id)) {
            result.data.push(asset.id);
        }

        map.set(ownerAddress, result);

        return map;
    });
};

const updateAssetsByOwner = async (ownerAddress: string, page = 1) => {
    const assetsByOwner = (await fetchJson("/api/assets-by-owner", {
        limit: 50,
        ownerAddress,
        page,
        sortBy: {
            sortBy: "created",
            sortDirection: "asc",
        },
    })) as [{ id: string }];

    assetsByOwner.map((asset) => {
        // add details to the main asset map
        addAsset(asset);

        // add keys to the assetsByOwner map
        addAssetByOwner(ownerAddress, asset);
    });

    return assetsByOwner;
};

export { updateAssetsByOwner, assets, assetsByOwner, assetsByGroup };
