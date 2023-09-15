<script lang="ts">
    import { modalsStore, hideModal } from "$lib/state/stores/modals";

    import { fly, fade } from "svelte/transition";

    import Icon from "$lib/components/icon.svelte";
</script>

{#if $modalsStore}
    <div
        class="bg-faint modal modal-open cursor-pointer"
        in:fade={{ duration: 250 }}
        on:click|self={hideModal}
        on:keydown|self={hideModal}
    >
        <div
            class="modal-box cursor-auto overflow-y-auto border p-1 pb-10"
            in:fly={{
                duration: 500,
                y: 100,
            }}
            style={$modalsStore.fullscreen
                ? "max-width: 80%; max-height:100vh;"
                : ""}
        >
            <div class="title flex items-center justify-between">
                <h3 class="ml-3 text-xl font-bold">{$modalsStore.title}</h3>
                <div>
                    <button
                        class="btn-ghost btn-md btn"
                        on:click={hideModal}
                    >
                        <Icon
                            id="cancel"
                            size="md"
                        />
                    </button>
                </div>
            </div>

            <div class="p-3">
                <svelte:component
                    this={$modalsStore.component}
                    {...$modalsStore.props}
                />
            </div>
        </div>
    </div>
{/if}
