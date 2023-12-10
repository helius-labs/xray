<script lang="ts">
    import type { UITokenMetadata } from "$lib/types";
    import { SOL } from "$lib/xray";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    import IntersectionObserver from "svelte-intersection-observer";

    export let address: string;

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

    const asset = client.asset.createQuery([address, isMainnetValue], {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    let element: HTMLDivElement;

    $: if (address === SOL) {
        metadata.name = "SOL";
        metadata.image = "/media/tokens/solana.png";
        metadata.address = SOL;
    } else if ($asset?.data?.compressed) {
        const data = $asset?.data;
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
    } else if ($asset?.data?.result.compression.compressed == false) {
        const data = $asset?.data.result;

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
    }

    $: assetIsLoading = address !== SOL && $asset.isLoading;
    $: assetFailed = $asset.isError;

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
                {assetIsLoading}
                {assetFailed}
                {isNFT}
            />
        {/if}
    </IntersectionObserver>
</div>
