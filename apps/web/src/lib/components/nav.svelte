<script lang="ts">
    import { page } from "$app/stores";

    import { state } from "svelte-snacks";

    import { fly } from "svelte/transition";

    import formatMoney from "$lib/util/format-money";

    import Icon from "$lib/icon";

    import Menu from "$lib/components/menu.svelte";
    import Search from "$lib/components/search.svelte";
    import DevBanner from "$lib/components/dev-banner.svelte";

    const solanaPrice = state(
        "tokenPrice",
        "So11111111111111111111111111111111111111112"
    );
    const solanaTPS = state("solanaTps");
    const xrayConfig = state("xrayConfig");

    let backUrl = "";

    $: if (
        $page.url.pathname.endsWith("/tx") &&
        $page.url.searchParams.has("wallet")
    ) {
        backUrl = `/${$page.url.searchParams.get("wallet")}/wallet`;
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

        <div class="ml-1 hidden text-xs md:block">
            <div class="mr-5">
                <span class="font-bold">TPS </span>
                {#if $solanaTPS.hasFetched}
                    <span class="ml-1 opacity-50"
                        >{$solanaTPS?.data?.tps.toFixed(0)}</span
                    >
                {/if}
            </div>
            <div>
                <span class="font-bold">SOL/USD </span>
                {#if $solanaPrice?.hasFetched}
                    <span class="ml-1 opacity-50"
                        >{formatMoney($solanaPrice?.data)}</span
                    >
                {/if}
            </div>
        </div>
    </div>

    <div class="hidden justify-center lg:flex">
        {#if $page.url.pathname !== "/"}
            <Search />
        {/if}
    </div>

    <div class="flex justify-end pr-2">
        <a href="#menu">
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
