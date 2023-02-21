<script lang="ts">
    import { onMount } from "svelte";

    import Icon from "$lib/components/icon.svelte";

    export let id: string;
    export let fullScreenModal = false;

    export const show = () => (window.location.href = `#modal-${id}`);
    export const hide = () => (window.location.href = `#`);

    onMount(() => {
        if (window.location.hash === `#modal-${id}`) {
            show();
        }
    });
</script>

<div
    class="modal cursor-pointer"
    id="modal-{id}"
    on:click|self={hide}
    on:keydown|self={hide}
>
    <div
        class="modal-box cursor-auto"
        class:max-w-3xl={fullScreenModal}
    >
        <div class="title flex items-center justify-between">
            <div>
                <slot name="title" />
            </div>
            <div>
                <button
                    class="btn-ghost btn-md btn"
                    on:click={hide}
                >
                    <Icon
                        id="cancel"
                        size="md"
                    />
                </button>
            </div>
        </div>

        <slot />
    </div>
</div>
