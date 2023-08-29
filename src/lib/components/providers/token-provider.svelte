<script lang="ts">
    import type { UITokenMetadata } from "$lib/types";
    import { SOL } from "$lib/xray";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    import IntersectionObserver from "svelte-intersection-observer";

    export let address: string;

    let intersecting = false;

    const client = trpcWithQuery($page);

    const token = client.token.createQuery([address], {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const accountInfo = client.accountInfo.createQuery(address, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
    });

    const token2022Metadata: {
        [key: string]: {
            description: string;
            image: string;
            name: string;
        };
    } = {
        "2kMpEJCZL8vEDZe7YPLMCS9Y3WKSAMedXBn7xHPvsWvi": {
            description: "Solana's 1 true moonshot. TW: @SolarMoonSol",
            image: "https://gateway.ipfscdn.io/ipfs/bafkreifwdwgcv6fnh5icz3wkefokatsemsojck4hftsnuf4xcfjcvagsva/",
            name: "SolarMoon (MOON)",
        },
        CKfatsPMUf8SkiURsDXs7eK6GWb4Jsd6UDbs7twMCWxo: {
            description:
                "BonkEarn is the first of many experiments on the Token2022 standard, Bernzy sends his regards",
            image: "https://i.imgur.com/nd9AVZ4.jpeg",
            name: "BonkEarn (BERN)",
        },
    };

    const metadata: UITokenMetadata = {
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

    const asset = client.asset.createQuery(address, {
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
        metadata.dataHash = data?.dataHash || "";
        metadata.creatorHash = data?.creatorHash || "";
        metadata.assetHash = data?.assetHash || "";
        metadata.tree = data?.tree || "";
        metadata.seq = data?.seq || 0;
        metadata.leafId = data?.leafId || 0;
    }
    // TODO Property 'program' does not exist on type 'Buffer | ParsedAccountData'.
    // @ts-ignore
    else if ($accountInfo?.data?.value?.data?.program === "spl-token-2022") {
        // const data = $accountInfo?.data?.value;
        const data = token2022Metadata[address];
        metadata.name = data?.name || "";
        metadata.description = data?.description || "";
        metadata.image = data?.image || "";
        metadata.address = address || "";
    } else {
        // Kicks off the query
        const data = $token?.data?.length ? $token.data[0] : {};

        metadata.address = data?.account;
        metadata.attributes = data?.offChainMetadata?.metadata?.attributes;
        metadata.sellerFeeBasisPoints =
            data?.onChainMetadata?.metadata?.data?.sellerFeeBasisPoints || 0;
        metadata.creators = data?.onChainMetadata?.metadata?.data?.creators;
        metadata.description = data?.offChainMetadata?.metadata?.description;
        metadata.collectionKey =
            data?.onChainMetadata?.metadata?.collection?.key;
        metadata.image =
            data?.offChainMetadata?.metadata?.image ||
            data?.onChainMetadata?.metadata?.data.image ||
            data?.legacyMetadata?.logoURI;
        metadata.name =
            data?.offChainMetadata?.metadata?.name ||
            data?.legacyMetadata?.name ||
            data?.onChainMetadata?.metadata?.data.name;
    }

    $: tokenIsLoading = address !== SOL && $token.isLoading;
    $: tokenFailed = $token.isError;

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
