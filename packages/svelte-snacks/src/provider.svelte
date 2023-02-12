<script lang="ts">
    import { setContext } from "svelte";

    import { writable } from "svelte/store";

    import { appName, contextKey } from "./config";

    export let config = {};

    // eslint-disable-next-line no-console
    console.log(`Initializing state`);
    
    const queryMap = new Map();

    setContext(contextKey, writable({
        queries : queryMap,
        config,
    }));

</script>

<slot></slot>
