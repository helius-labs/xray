<script lang="ts">
    import JSONTree from "svelte-json-tree";
    
    export let transaction:Record<string, any> = {};
</script>
<div class="card">
    <JSONTree value={transaction} />
</div>
