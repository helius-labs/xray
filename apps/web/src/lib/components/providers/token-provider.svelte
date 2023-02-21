<script lang="ts">
    import type { UITokenMetadata } from "$lib/types";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    export let address: string;

    const client = trpcWithQuery($page);

    const token = client.token.createQuery([address]);

    const metadata: UITokenMetadata = {
        address: "",
        attributes: [],
        collectionKey: "",
        creators: [],
        description: "",
        image: "",
        name: "",
    };

    $: data = $token?.data?.length ? $token.data[0] : {};

    $: !data?.offChainMetadata?.metadata?.name && console.log({ data });

    $: {
        metadata.address = data?.account;
        metadata.attributes = data?.offChainMetadata?.metadata?.attributes;
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
</script>

<slot {metadata} />
<!-- {JSON.stringify(metadata)} -->
