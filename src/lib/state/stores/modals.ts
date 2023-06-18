import type { Modal, Modals } from "$lib/types";

import { writable } from "svelte/store";

import { modals } from "$lib/config";

export const modalsStore = writable<Modal | undefined>();

export const showModal = (id: Modals, props?: Record<string, any>) =>
    modalsStore.set({
        ...modals[id],
        props,
    });

export const hideModal = () => modalsStore.set(undefined);
