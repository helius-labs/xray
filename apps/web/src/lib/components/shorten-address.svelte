<script lang="ts">
    export let address: string = "";
</script>

<h3 class="text-md mr-1">
    <span class="font-bold">{address.substring(0, 4)}</span><span
        class="opacity-50">...{address.slice(-4)}</span
    >
</h3>
