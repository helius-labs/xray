<script lang="ts">
    import type { EnrichedTransactionResponseV2 } from "$lib/types";

    import type { TokenInfo } from "@solana/spl-token-registry";

    import tokenRegistryQuery from "$lib/state/queries/solana-token-registry";

    const tokenResgistry = tokenRegistryQuery();
    
    import { LAMPORTS_PER_SOL } from "@solana/web3.js";

    export let transaction:EnrichedTransactionResponseV2;
    export let address:string;

    let tokenInfo:TokenInfo;
    let tokenType: "sol" | "spl" | "nft" | undefined;
    let transferType: "send" | "receive" | undefined;
    let batched = false;

    $: account = transaction?.accountData.find(({ account : a }) => a === transaction?.feePayer);

    $: if(transaction?.tokenTransfers?.length) {
        const [ transfer = { mint : "" }, ...rest ] = transaction?.tokenTransfers;

        if(rest) {
            batched = true;
        }

        if($tokenResgistry.data) {
            tokenInfo = $tokenResgistry.data?.find(({ address :  a }) => (a === transfer?.mint)) as TokenInfo;
        }
    }

    $: transferType = Number(account?.nativeBalanceChange) < 0 ? "send" : "receive";

    $: if(transaction?.type === "TRANSFER") {
        if(transaction?.source === "SYSTEM_PROGRAM") {
            tokenType = "sol";
        } else if(transaction?.source === "SOLANA_PROGRAM_LIBRARY") {
            tokenType = "spl";
            console.log({ transaction });
        } else {
            tokenType = undefined;
        }
    }

    $: ([ transfer ] = transaction?.tokenTransfers  || []);
    $: ([ nativeTransfer ] = transaction?.nativeTransfers || []);
</script>

{#if tokenType === "sol" || (tokenType === "spl" && tokenInfo)}
    <div class="card grid grid-cols-8 mb-2">
        <div class="col-span-1">
            <div class="round relative h-10 w-10">
                {#if tokenType === "sol"}
                    <img
                        class="w-full h-full m-0 rounded-full"
                        alt=""
                        src="/media/tokens/solana.png">
                {:else if tokenInfo}
                    <img
                        class="w-full h-full m-0 rounded-full"
                        alt=""
                        src={tokenInfo?.logoURI || "/media/tokensunknown-token.png"}>
                {/if}
    
                <div class="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1.5 pl-8">
                    {#if transferType === "send"}
                        <svg
                            class="h-6 rounded-full fill-white bg-info p-1 shadow-xl"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"><path d="M24 0l-6 22-8.129-7.239 7.802-8.234-10.458 7.227-7.215-1.754 24-12zm-15 16.668v7.332l3.258-4.431-3.258-2.901z" /></svg>
                    {:else if transferType === "receive"}
                        <svg
                            class="h-6 rounded-full fill-black bg-success p-1 shadow-xl"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"><path d="M12 21l-8-9h6v-12h4v12h6l-8 9zm9-1v2h-18v-2h-2v4h22v-4h-2z" /></svg>
                    {/if}
                </div>
            </div>
        </div>
        <div class="col-span-7">
            <div class="flex items-center justify-between h-full">
                <div class="flex opacity-75">
                    {#if transfer?.fromUserAccount === address}
                        <p>Sent</p>
                    {:else if transfer?.toUserAccount === address}
                        <p>Received</p>
                    {/if}
                    
                    <span class="mx-1">
                        {tokenType === "sol" ? "SOL" : tokenInfo?.symbol}
                    </span>
                </div>

                <div
                    class="rounded-full flex items-center justify-center mr-1 text-sm p-1 px-2"
                    class:bg-slate-900={transfer?.fromUserAccount === address}
                    class:bg-success={transfer?.toUserAccount === address}
                    class:text-neutral={transfer?.toUserAccount === address}>
                    {transfer?.fromUserAccount === address ? "-" : "+"}

                    {#if nativeTransfer && tokenType === "sol"}
                        {(nativeTransfer?.amount / LAMPORTS_PER_SOL).toFixed(5).toLocaleString("en-US")}
                    {:else if transfer && tokenType === "spl"}
                        {transfer?.tokenAmount.toFixed(2).toLocaleString("en-US")}
                    {/if}
                </div>
            </div>
        </div>
    </div>
{/if}
