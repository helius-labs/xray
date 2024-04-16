<script lang="ts">
    import type { UINiftyAsset, UITokenMetadata } from "$lib/types";
    import { SOL } from "$lib/xray";
    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";
    import IntersectionObserver from "svelte-intersection-observer";
    import { ExtensionType, getExtension } from "@nifty-oss/asset";

    export let address: string | undefined = undefined;

    export let asset: UINiftyAsset | undefined = undefined;

    export let status: { isLoading: boolean; isError: boolean } = {
        isError: false,
        isLoading: true,
    };

    let intersecting = false;
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
    const client = trpcWithQuery($page);

    let account: any | undefined;

    if (address) {
        account = client.niftyAsset.createQuery([address, isMainnetValue], {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        });
    }

    $: if ($account && $account.data) {
        status = { isError: $account.isError, isLoading: $account.isLoading };
        updateAsset($account.data[0]);
    }

    const updateAsset = (data: UINiftyAsset) => {
        asset = data;

        if (asset) {
            const metadata = getExtension(asset, ExtensionType.Metadata);

            if (metadata && metadata.uri) {
                (async () => {
                    try {
                        asset.json = await fetchJsonMetadata(metadata.uri);
                    } catch (error) {
                        // eslint-disable-next-line no-console
                        console.error("Error in fetchJsonMetadata:", error);
                    }
                })();
            }
        }
    };

    const fetchJsonMetadata = async (jsonUri: string) => {
        try {
            const response = await fetch(jsonUri);
            if (!response.ok) {
                throw new Error(`Status ${response.status}`);
            }
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new TypeError("Received non-JSON content type");
            }
            return await response.json();
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error fetching or parsing JSON metadata:", error);
            return "";
        }
    };

    let element: HTMLDivElement;

    $: loading = address !== SOL && status.isLoading;

    $: failed = status.isError;
</script>

<div>
    <IntersectionObserver
        once={true}
        {element}
        bind:intersecting
    >
        <div bind:this={element} />

        {#if intersecting}
            <slot
                {asset}
                {loading}
                {failed}
            />
        {/if}
    </IntersectionObserver>
</div>
