<script>
    import { page } from "$app/stores";
    import query from "$lib/state";
    import convertTimestamp from "src/lib/util/pretty-date";

    import Icon from "$lib/icon";

    const transaction = query("solana-transaction");

    const tokenRegistry = query("solana-token-registry");

    let isSent = false;

    const {
        year, month, day, clockHours, minutes, suffix,
    } = convertTimestamp($transaction?.data?.parsed.timestamp);
    
    $: if($transaction?.load && $page.params.search) {
        $transaction.load($page.params.search);
    }
    
    $: if($transaction?.data?.parsed.primaryUser === $transaction?.data?.parsed.actions[0].from) {
        isSent = true;
    }

    $: symbol = $tokenRegistry?.data?.get($transaction?.data?.parsed.actions[0].sent).symbol;
    
</script>
<div class="w-full flex flex-col justify-center items-center mt-14">
    <div
        class="flex justify-center items-center w-12 h-12 rounded-full"
        class:bg-green-700={!isSent}
        class:bg-red-700={isSent}
    >
        {#if isSent}
            <Icon id="arrow-up" />
            
        {:else}
            <Icon id="arrow-down" />
        {/if}
    </div>
    <div class="mt-3">
        {#if isSent}
            <h1 class="font-bold">Sent</h1>
        {:else}
            <h1 class="font-bold">Received</h1>
        {/if}
    </div>
    <h1>{$transaction.data.parsed.actions[0].amount} {symbol}</h1>
    <div class="mt-3 text-xs">
        <p> {month} { day }, {year} at {clockHours}:{minutes}{suffix}</p>
    </div>
</div>
