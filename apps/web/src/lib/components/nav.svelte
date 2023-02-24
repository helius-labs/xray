<script lang="ts">
    import { page } from "$app/stores";

    import { fly } from "svelte/transition";

    import Icon from "$lib/components/icon.svelte";

    import Menu from "$lib/components/menu.svelte";
    import Search from "$lib/components/search.svelte";
    import DevBanner from "$lib/components/dev-banner.svelte";
    import Stats from "$lib/components/stats.svelte";
    import PoweredByHelius from "$lib/components/powered-by-helius.svelte";

    let backUrl = "";

    $: refs = $page.url.searchParams.get("ref")?.split("@") || ["", ""];

    $: restOfRefs = refs.slice(2).join("@");

    $: [refType, refValue] = refs[1].split(":") || [];

    $: ref = restOfRefs.length ? "@" + restOfRefs : "";

    $: backUrl = refType
        ? `/${refValue}/${refType}${ref ? "?ref=" + ref : ""}`
        : "/";
</script>

<nav
    class="sticky top-0 left-0 z-20 grid h-full grid-cols-6 items-center justify-between border bg-black p-1 px-0"
>
    <DevBanner />
    <div class="col-span-5 flex items-center lg:col-span-4">
        {#if backUrl}
            {#if backUrl !== "/"}
                <div
                    class="ml-2 flex items-center"
                    in:fly={{
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
            {/if}

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
                    <!-- <span class="text-3xl">XRAY</span> -->
                </a>
            </div>
        {/if}

        <Stats />
    </div>

    <div class="col-span-1 flex items-center justify-end lg:col-span-2">
        <div class="hidden flex-1 justify-center lg:flex">
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
    </div>
</nav>

<Menu />
