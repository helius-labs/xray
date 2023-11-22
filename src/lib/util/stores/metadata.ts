import type { UITokenMetadata } from "$lib/types";
import { writable } from "svelte/store";

export const metadataStore = writable<UITokenMetadata | null>(null);
