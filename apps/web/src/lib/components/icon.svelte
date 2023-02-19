<script lang="ts">
    import { onMount } from "svelte";

    import { type Icon, IconPaths } from "$lib/types";

    export let id: Icon;
    export let fill: string = "current" as "current" | "success" | "base-100";
    export let size = "sm" as "sm" | "md" | "lg";

    let el: SVGElement;

    onMount(() => {
        const icon = IconPaths[id as keyof typeof IconPaths];

        if (icon) {
            // eslint-disable-next-line no-unsanitized/property
            el.innerHTML = icon;
        }
    });
</script>

<svg
    bind:this={el}
    class="icon icon-{size} icon-fill-{fill}"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
/>
