<script lang="ts">
    export let transaction:any;
</script>
<!-- <div class="card grid-cols-12">
    <div class="col-span-4">

    </div>
    <div class="col-span-8">
        
    </div>
</div> -->
<a
    class="card text-xs hover:cursor-pointer hover:bg-gray-800"
    href="/{transaction?.raw?.signature}">
    <pre>{JSON.stringify(transaction?.parsed, null, 4)}</pre>
</a>
 
