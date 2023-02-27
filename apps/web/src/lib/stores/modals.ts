import { writable } from "svelte/store";

import type { Modal } from "$lib/types";

export const modals = writable<Modal>();
