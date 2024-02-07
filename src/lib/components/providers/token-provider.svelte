<script lang="ts">
    import type { UITokenMetadata } from "$lib/types";
    import { SOL } from "$lib/xray";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    import IntersectionObserver from "svelte-intersection-observer";

    export let address: string | undefined = undefined;

    export let token: any | undefined = undefined;

    export let status: { isLoading: boolean; isError: boolean } | undefined =
        undefined;

    let intersecting = false;
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
    const client = trpcWithQuery($page);

    export const metadata: UITokenMetadata = {
        address: "",
        attributes: [],
        collectionKey: "",
        creators: [],
        delegate: "",
        description: "",
        image: "",
        name: "",
        owner: "",
        sellerFeeBasisPoints: 0,
    };

    let asset: any | undefined;

    let deprecatedImage: any;

    if (address) {
        asset = client.asset.createQuery([address, isMainnetValue], {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
        });
    }

    $: data = $asset?.data || token;

    let element: HTMLDivElement;

    $: if (address === SOL) {
        metadata.name = "SOL";
        metadata.image = "/media/tokens/solana.png";
        metadata.address = SOL;
    } else if (data?.compressed) {
        metadata.address = data?.address || "";
        metadata.attributes = data?.attributes || [];
        metadata.creators = data?.creators || [];
        metadata.description = data?.description || "";
        metadata.collectionKey = data?.collectionKey || "";
        metadata.image = data?.image || "";
        metadata.name = data?.name || "";
        metadata.owner = data?.owner || "";
        metadata.delegate = data?.delegate || "";
        metadata.frozen = data?.frozen || false;
        metadata.mutable = data?.mutable || false;
        metadata.compressed = data?.compressed || false;
        metadata.sellerFeeBasisPoints = data?.sellerFeeBasisPoints || 0;
        metadata.dataHash = data?.dataHash || "";
        metadata.creatorHash = data?.creatorHash || "";
        metadata.assetHash = data?.assetHash || "";
        metadata.tree = data?.tree || "";
        metadata.seq = data?.seq || 0;
        metadata.leafId = data?.leafId || 0;
    } else if (data?.compression.compressed == false) {
        metadata.address = data?.id;
        // metadata.attributes = data?.offChainMetadata?.metadata?.attributes;
        metadata.sellerFeeBasisPoints = data?.royalty.basis_points || 0;
        metadata.creators = data?.creators;
        metadata.description = data?.content.metadata?.description;
        // metadata.collectionKey =
        //     data?.onChainMetadata?.metadata?.collection?.key;
        metadata.image =
            data?.content.links?.image ||
            data?.content.files?.find((file: any) =>
                file.mime?.startsWith("image/")
            )?.uri;
        metadata.name = data?.content.metadata?.name;
        metadata.files = data?.content.files;
        // Checking all files to see if a video exists
        metadata.video_uri = data?.content.files?.find((file: any) =>
            file.mime?.startsWith("video/")
        )?.uri;
        metadata.burnt = data?.burnt;
        metadata.mintExtensions = data?.mint_extensions;
    }

    $: if (data?.id && !metadata.image) {
        deprecatedImage = client.deprecatedImage.createQuery(data?.id);

        metadata.image = $deprecatedImage?.data;
    }

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
            const jsonData = await response.json();
            return jsonData.image;
        } catch (error) {
            // eslint-disable-next-line no-console
            console.error("Error fetching or parsing JSON metadata:", error);
            return "";
        }
    };

    $: if (metadata.mintExtensions) {
        const name = metadata.mintExtensions?.metadata?.name;
        const jsonUri = metadata.mintExtensions?.metadata?.uri;

        if (name) {
            metadata.name = name;
        }

        if (jsonUri && jsonUri.endsWith(".json")) {
            (async () => {
                try {
                    const imageUrl = await fetchJsonMetadata(jsonUri);
                    if (imageUrl) {
                        metadata.image = imageUrl;
                    }
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error("Error in fetchJsonMetadata:", error);
                }
            })();
        } else if (jsonUri) {
            metadata.image = jsonUri;
        }
    }

    $: tokenIsLoading =
        (address !== SOL && $asset?.isLoading) ||
        (address !== SOL && status?.isLoading);
    $: tokenFailed = $asset?.isError || status?.isError;

    // This could be better
    $: isNFT = metadata?.attributes && metadata?.attributes?.length > 0;
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
                {metadata}
                {tokenIsLoading}
                {tokenFailed}
                {isNFT}
            />
        {/if}
    </IntersectionObserver>
</div>
