<script>
    import { page } from "$app/stores";
    import query from "$lib/state";

    import Icon from "$lib/icon";

    const transaction = query("solana-transaction");
    const tokenRegistry = query("solana-token-registry");

    let isSent = false;
    
    $: if($transaction?.data?.parsed.primaryUser === $transaction?.data?.parsed.actions[0].from) {
        isSent = true;
    }
    
    $: if($transaction?.load && $page.params.search) {
        $transaction.load($page.params.search);
    }

    $: symbol = $tokenRegistry?.data?.get($transaction?.data?.parsed.actions[0].sent).symbol;
    
</script>

<div class="flex items-center mt-3 p-3 border-t border-gray-900">
    <div class="w-10 h-10 flex justify-center items-center">
        <Icon id="coins" />
    </div>
    <div class="flex">
        <h4
            class:text-green-600={!isSent}
            class:text-red-600={isSent}
        >{isSent ? "-" : "+"} {$transaction?.data?.parsed.actions[0].amount}</h4>
        <h4
            class="ml-2"
            class:text-green-600={!isSent}
            class:text-red-600={isSent}
        >{symbol}</h4>
    </div>
</div>
