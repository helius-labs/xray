import type { UINiftyAsset } from "$lib/types";
import { writable } from "svelte/store";

export const niftyAssetStore = writable<UINiftyAsset | null>(null);
