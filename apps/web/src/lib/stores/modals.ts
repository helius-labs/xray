import type { Modal, Modals } from "$lib/types";

import { writable } from "svelte/store";

import { modals } from "$lib/config";

export const modalsStore = writable<Modal | undefined>();

export const showModal = (id: Modals) => modalsStore.set(modals[id]);

export const hideModal = () => modalsStore.set(undefined);
