<script lang="ts">
    import { page } from "$app/stores";

    import { fly } from "svelte/transition";

    import Icon from "$lib/components/icon.svelte";

    import Menu from "$lib/components/menu.svelte";
    import Search from "$lib/components/search.svelte";
    import DevBanner from "$lib/components/dev-banner.svelte";
    import Stats from "$lib/components/stats.svelte";

    let backUrl = "";

    $: if ($page.url.searchParams.has("wallet")) {
        backUrl = `/${$page.url.searchParams.get("wallet")}/wallet`;
    } else if ($page.url.searchParams.has("tx")) {
        backUrl = `/${$page.url.searchParams.get("tx")}/tx`;
    } else if ($page.url.searchParams.has("token")) {
        backUrl = `/${$page.url.searchParams.get("token")}/token`;
    } else if ($page.url.pathname !== "/") {
        backUrl = "/";
    } else {
        backUrl = "";
    }
</script>

<nav
    class="sticky top-0 left-0 z-10 grid h-full grid-cols-2 items-center border bg-black p-1 px-0 lg:grid-cols-3"
>
    <DevBanner />

    <div class="flex items-center">
        {#if backUrl}
            <div
                class="ml-2 flex items-center"
                in:fly={{
                    delay: 500,
                    duration: 750,
                    x: -25,
                }}
            >
                <a
                    class="btn-ghost btn px-2"
                    href={backUrl}
                    rel="noreferrer"
                >
                    <span class="text-3xl">
                        <Icon
                            id="arrowLeft"
                            size="md"
                        />
                    </span>
                </a>
            </div>
            <div
                class="mx-2 flex items-center"
                in:fly={{
                    duration: 750,
                    x: -50,
                }}
            >
                <a
                    class="mr- btn-ghost btn px-2"
                    href="/"
                    rel="noreferrer"
                >
                    <span class="text-3xl">XRAY</span>
                </a>
            </div>
        {/if}

        <Stats />
    </div>

    <div class="hidden justify-center lg:flex">
        {#if $page.url.pathname !== "/"}
            <Search />
        {/if}
    </div>

    <div class="flex justify-end pr-2">
        <a href="#modal-menu">
            <div class="btn-ghost btn">
                <Icon
                    id="hamburger"
                    size="lg"
                />
            </div>
        </a>
    </div>
</nav>

<Menu />
