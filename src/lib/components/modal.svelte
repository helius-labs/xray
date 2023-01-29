<script>
    import { fly, fade } from "svelte/transition";

    import modals, { close } from "src/stores/modals";

    $: currentModal = $modals.length > 0 ? $modals[$modals.length - 1] : false;
</script>

<style>
    .modal {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.8);
    }

    .content {
        width: 90%;
        max-width: 40rem;
        position: relative;
        background: rgb(0, 0, 0);
    }
</style>

{#if currentModal}
    {#key currentModal}
        <div
            class="modal flex-center"
            on:click|self={() => close(currentModal.id)}
            transition:fade={{ duration : 250 }}
        >
            <div
                class="content border border-radius container"
                transition:fly={{
                    duration : 250,
                    y        : 100,
                }}
            >
                <div class="flex-between align-items-end mb-2">
                    <h3 class="m-0">{currentModal.title}</h3>
                    <button
                        class="button button-outline flex-center close-button"
                        on:click={() => close(currentModal.id)}
                    >
                        <svg
                            class="icon"
                            clip-rule="evenodd"
                            fill-rule="evenodd"
                            stroke-linejoin="round"
                            stroke-miterlimit="2"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"><path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" /></svg>
                    </button>
                </div>
                <svelte:component
                    this={currentModal.component}
                    {...currentModal}
                ></svelte:component>
            </div>
        </div>
    {/key}
{/if}
