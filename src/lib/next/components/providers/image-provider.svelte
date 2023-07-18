<script lang="ts">
    import { onMount } from "svelte";

    import { createEventDispatcher } from "svelte";

    export let src: string;

    export const onError = () => {};

    export const onLoad = () => {};

    const dispatch = createEventDispatcher();

    let error = false;

    let loading = true;

    const img = new Image();

    img.onload = () => {
        loading = false;
        error = false;

        dispatch("load");
    };

    img.onerror = () => {
        loading = false;
        error = true;

        dispatch("error");
    };

    const loadImage = (srcIndex = 0) => {
        loading = true;
        error = false;

        img.src = "";

        setTimeout(() => {
            img.src = src;
        }, 100);
    };

    onMount(loadImage);
</script>

<slot
    image={{
        error,
        loading,
        retry: loadImage,
        src,
    }}
/>
