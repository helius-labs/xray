<script>
    import { page } from "$app/stores";
    import query from "$lib/state";

    import shortenString from "src/lib/util/shorten-string";
    import Icon from "$lib/icon";

    const transaction = query("solana-transaction");

    let isSent = false;
    
    $: if($transaction?.load && $page.params.search) {
        $transaction.load($page.params.search);
    }
    
    $: if($transaction?.data?.parsed.primaryUser === $transaction?.data?.parsed.actions[0].from) {
        isSent = true;
    }

    $: sender = $transaction?.data?.parsed.actions[0].from;

    $: recipient = $transaction?.data?.parsed.actions[0].to;
    
</script>

<div class="flex flex-col justify-center mt-5 p-3 border-t border-gray-900">
    <div class="flex">
        <div class="w-10 h-10 flex justify-center items-center">
            <Icon id="avatar" />
        </div>
        <div class="flex flex-col ml-3">
            {#if isSent}
                <p>You</p>
            {:else}
                <p>Sent from</p>
            {/if}
                <h4>{shortenString(sender)}</h4>
        </div>
    </div>
    <div class="mt-5 ml-3">
        <Icon id="transfer-arrow" />
    </div>
    <div class="flex mt-5">
        <div class="w-10 h-10 flex justify-center items-center">
            <Icon id="avatar" />
        </div>
        <div class="flex flex-col ml-3">
            {#if isSent}
                <p>Sent to</p>
            {:else}
                <p>Received by</p>
            {/if}
            <h4>{shortenString(recipient)}</h4>
        </div>
    </div>
</div>
