<script lang="ts">
    import { onMount } from "svelte";
    import {
        type Icon,
        icons,
    } from "./index";

    export let id:Icon;
    export let fill:string = "current" as "current" | "success";
    export let size = "sm" as "sm" | "md" | "lg";

    let el:SVGElement;

    onMount(() => {
        const icon = icons[id];

        if(icon) {
            el.innerHTML = icon;
        }
    });
</script>

<svg
    bind:this={el}
    class="icon icon-{size} icon-fill-{fill}"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
</svg>
