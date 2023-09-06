import { writable } from "svelte/store";

export let owned = writable(false);
export let submitted = writable(false);
export let registry = writable(null);
