<script lang="ts">
    import { getSolanaName } from "$lib/xray";

    import shortenString from "$lib/util/shorten-string";

    export let text: string = "";

    let shortened: string = "";
    let shortenedOriginal: string = "";
    let result: string = "";

    $: {
        result = getSolanaName(text) || shortenString(text);
        shortened = shortenString(result, 8);
        shortenedOriginal = shortenString(text, 6);
    }
</script>

<slot
    {result}
    {shortened}
    {shortenedOriginal}
/>
