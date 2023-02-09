<script lang="ts">
    import {
        type Icon,
        icons,
    } from "./index";

    export let id:Icon;   
</script>

<svg
    class="icon"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    {@html icons[id]}
</svg>
