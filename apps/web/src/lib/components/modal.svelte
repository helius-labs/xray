<script lang="ts">
    export let id: string;

    export const show = () => (window.location.href = `#modal-${id}`);
    export const hide = () => (window.location.href = `#`);
</script>

<div
    class="modal cursor-pointer"
    id="modal-{id}"
    on:click|self={hide}
    on:keydown|self={hide}
>
    <div class="modal-box cursor-auto">
        <button
            class="btn-sm btn-circle btn absolute right-2 top-2"
            on:click={hide}>✕</button
        >
        <slot />
    </div>
</div>
