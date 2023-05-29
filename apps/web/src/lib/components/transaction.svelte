<script lang="ts">
    import type { ProtonTransaction } from "@helius-labs/xray";

    export let transaction: ProtonTransaction;

    // $: console.log("transaction", { transaction });
</script>

<div class="relative">
    {JSON.stringify(transaction)}
</div>
