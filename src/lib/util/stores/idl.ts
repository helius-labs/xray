import { writable } from "svelte/store";
import type { Idl } from "@coral-xyz/anchor";

export const idlStore = writable<Idl | null>(null);
