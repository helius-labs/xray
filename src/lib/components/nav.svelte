<script lang="ts">
    import { page } from "$app/stores";

    import { fly } from "svelte/transition";

    import Icon from "$lib/components/icon.svelte";
    import Search from "$lib/components/search.svelte";
    import Stats from "$lib/components/stats.svelte";

    import { showModal } from "$lib/state/stores/modals";
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
</script>

<Stats />
<nav
    class="sticky left-0 top-0 z-40 grid h-full grid-cols-6 items-center justify-between border bg-black p-1 px-0"
>
    <div class="col-span-4 flex items-center md:col-span-2">
        <div
            class="mx-2 flex items-center"
            in:fly={{
                duration: 750,
                x: -50,
            }}
        >
            <a
                class="btn-ghost btn px-2"
                href="/?network={isMainnetValue ? 'mainnet' : 'devnet'}"
                rel="noreferrer"
            >
                <span class="text-3xl">XRAY</span>
            </a>
        </div>

        <div class="ml-2" />
    </div>

    <div class="col-span-2 hidden items-center justify-end md:block">
        {#if $page.url.pathname !== "/"}
            <Search />
        {/if}
    </div>

    <div class="col-span-2 flex items-center justify-end">
        <div class="flex justify-end pr-2">
            {#if $page.url.pathname == "/"}
                <div
                    class="tooltip"
                    data-tip="Docs"
                >
                    <a
                        href="https://docs.helius.dev/welcome/what-is-helius"
                        rel="noreferrer"
                        target="_blank"
                        class="btn-ghost btn"
                    >
                        <img
                            class="h-6 opacity-90"
                            src="docs.svg"
                            alt=""
                        />
                    </a>
                </div>
            {/if}
            {#if $page.url.pathname !== "/"}
                <div
                    class="tooltip"
                    data-tip="Back"
                >
                    <button
                        class="btn-ghost btn"
                        on:click={() => window.history.back()}
                    >
                        <Icon
                            id="arrowLeft"
                            size="lg"
                        />
                    </button>
                </div>
            {/if}
            <div
                class="tooltip"
                data-tip="Help"
            >
                <button
                    class="btn-ghost btn"
                    on:click={() => showModal("HELP")}
                >
                    <Icon
                        id="question"
                        size="md"
                    />
                </button>
            </div>
            <div
                class="tooltip"
                data-tip="Menu"
            >
                <button
                    class="btn-ghost btn"
                    on:click={() => showModal("MENU")}
                >
                    <Icon
                        id="hamburger"
                        size="lg"
                    />
                </button>
            </div>
        </div>
    </div>
</nav>

{#if $page.url.pathname !== "/"}
    <button
        class="btn-secondary btn-sm btn fixed bottom-4 right-3 z-10 cursor-pointer rounded-full"
        on:click={() => window.scrollTo({ behavior: "smooth", top: 0 })}
    >
        <Icon
            id="arrowUp"
            size="sm"
        />
    </button>
{/if}
