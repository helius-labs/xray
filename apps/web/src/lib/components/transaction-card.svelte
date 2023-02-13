<script lang="ts">
    export let transaction:any;
</script>
<a
    class="card text-xs hover:cursor-pointer hover:bg-gray-800"
    href="/{transaction?.raw?.signature}">
    <pre>{JSON.stringify(transaction?.parsed, null, 4)}</pre>
</a>
 
