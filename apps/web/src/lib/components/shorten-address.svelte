<script lang="ts">
    export let address: string = "";
</script>

<span class="font-bold">{address.substring(0, 4)}</span><span class="opacity-50"
    >...{address.slice(-4)}</span
>
