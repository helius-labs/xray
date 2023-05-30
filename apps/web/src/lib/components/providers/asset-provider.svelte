<script lang="ts">
    import { type Asset, defaultAsset } from "$lib/types";

    import { assets } from "$lib/state/assets";

    export let id: string = "";

    $: asset = $assets.get(id) || { data: defaultAsset };

    $: console.log({ asset });
</script>

<slot {asset} />
