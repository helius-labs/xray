<script>
    import { page } from "$app/stores";
    import query from "$lib/state";

    import shortenString from "$lib/util/shorten-string";

    import Icon from "$lib/icon";

    const transaction = query("solana-transaction");

    const { signature } = $transaction.data.raw;

    $: if($transaction?.load) {
        $transaction.load($page.params.search);
    }

</script>
<div class="flex flex-col border-t border-gray-900">
    <div class="flex justify-between p-3">
        <div class="flex items-center">
            <div class="w-10 h-10 flex items-center justify-center">
                <Icon id="network" />
            </div>
            <p class="text-xs ml-1">Network Fee</p>
        </div>
        <div class="flex items-center">
            <!--hardcoded for now till I figure out where to get this data-->
            <p class="text-xs">0.000001 SOL</p>
        </div>
    </div>
    <div class="flex justify-between px-3">
        <div class="flex items-center">
            <div class="w-10 h-10 flex items-center justify-center">
                <Icon id="signature" />
            </div>
            <p class="text-xs ml-1">Signature</p>
        </div>
        <div class="flex items-center">
            <p class="text-xs">{shortenString(signature)}</p>
        </div>
    </div>
    <div class="flex justify-center my-5">
        <a
            class="btn"
            href={`https://explorer.solana.com/tx/${signature}`}
        >View on Solana Explorer</a>
    </div>
</div>
