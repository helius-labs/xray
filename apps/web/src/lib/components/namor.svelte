<script lang="ts">
    import {
        nameFromString,
        getSolanaName
    } from "@helius-labs/helius-namor";

    import shortenString from "$lib/util/shorten-string";

    export let text:string = "";
    let shortened:string = "";
    let shortenedOriginal:string = "";
    let result:string = "";

    $: {
        result = getSolanaName(text) || nameFromString(text);
        shortened = shortenString(result, 8);
        shortenedOriginal = shortenString(text, 6);
    }
</script>

<slot
    {result}
    {shortened}
    {shortenedOriginal}
>
</slot>
