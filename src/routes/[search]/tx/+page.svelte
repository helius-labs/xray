<script lang="ts">
    import { page } from "$app/stores";
    import { onMount } from "svelte";

    import hljs from "highlight.js";
    import javascript from "highlight.js/lib/languages/javascript";
    
    import tokenRegistryQuery from "$lib/state/queries/solana-token-registry";

    const tokenResgistry = tokenRegistryQuery();

    let metadataHTML = "";

    onMount(() => {
        hljs.registerLanguage("javascript", javascript);
    });

    $: if($page.data.transaction) {
        metadataHTML = hljs.highlight(JSON.stringify($page.data.transaction, null, 4), { language : "json" }).value;
    }
    
    $: fromAccount = $page.data.transaction.accountData.find(({ nativeBalanceChange }) => nativeBalanceChange < 0);
    $: toAccount = $page.data.transaction.accountData.find(({ nativeBalanceChange }) => nativeBalanceChange > 0);
    $: tokenAccount = $page.data.transaction.accountData.find(({ nativeBalanceChange }) => nativeBalanceChange === 0);
    $: tokenInfo = $tokenResgistry?.data?.find(({ address }) =>
        // console.log({ address });

        address === tokenAccount?.tokenBalanceChanges[0]?.mint
    );

    $: console.log({ tokenInfo, tokenAccount }, $tokenResgistry?.data);
</script>

<div class="card glass rounded-lg p-3 w-full">
    <div class="flex justify-center my-4">
        <img
            class="h-32 rounded-full"
            alt=""
            src={tokenInfo?.logoURI}>
    </div>

    <div class="flex justify-between">
        <h1 class="font-bold text-2xl text-center text-secondary">{tokenInfo?.name} Transfer</h1>
    </div>

    <p class="text-xs font-bold text-primary">From</p>
    <p class="text-xs font-bold text-gray-900">{fromAccount?.account}</p>
    <p class="text-xs font-bold text-primary">To</p>
    <p class="text-xs font-bold text-gray-900">{toAccount?.account}</p>
    <p class="text-xs font-bold text-primary">Token</p>
    <p class="text-xs font-bold text-gray-900">{tokenAccount?.account}</p>
    <p class="text-xs font-bold text-primary">Transaction</p>
    <p class="text-xs font-bold text-gray-900">{$page.data.transaction?.signature}</p>

</div>

<!--
<a
    class="card grid grid-cols-6 prose border-neutral mb-8 border py-3 hover:border-accent"
    href="/{$page.data.transaction.feePayer}/wallet">
    <div class="col-span-1 flex items-center justify-center">
        <svg
            class="fill-white h-8 opacity-75"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"><path d="M20.822 18.096c-3.439-.794-6.641-1.49-5.09-4.418 4.719-8.912 1.251-13.678-3.732-13.678-5.082 0-8.465 4.949-3.732 13.678 1.598 2.945-1.725 3.641-5.09 4.418-2.979.688-3.178 2.143-3.178 4.663l.005 1.241h1.995c0-3.134-.125-3.55 1.838-4.003 2.851-.657 5.543-1.278 6.525-3.456.359-.795.592-2.103-.338-3.815-2.058-3.799-2.578-7.089-1.423-9.026 1.354-2.275 5.426-2.264 6.767-.034 1.15 1.911.639 5.219-1.403 9.076-.91 1.719-.671 3.023-.31 3.814.99 2.167 3.707 2.794 6.584 3.458 1.879.436 1.76.882 1.76 3.986h1.995l.005-1.241c0-2.52-.199-3.975-3.178-4.663z" /></svg>
    </div>
    <div class="col-span-5">
        <h4 class=" m-0">Fee Payer</h4>
        <p class="text-xs m-0 opacity-50">{$page.data.transaction.feePayer}</p>
    </div>
</a>

<div class="card grid grid-cols-6 prose border-neutral mb-8 border py-3">
    <div class="col-span-1 flex items-center justify-center px-1">
        <svg
            class="fill-white h-7 opacity-75"
            height="24"
            viewBox="0 0 24 24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"><path d="M8 24l2.674-9h-9.674l16-15-2.674 9h8.674l-15 15zm-1.586-11h6.912l-1.326 4 5.739-6h-6.065l1.304-4-6.564 6z" /></svg>
    </div>
    <div class="col-span-5 pr-4">
        <h4 class=" m-0">Transaction</h4>
        <p class="text-xs m-0 break-words opacity-50">{$page.params.search}</p>
    </div>
</div>

<div class="card p-3 code border border-neutral text-xs overflow-hidden">
    <pre><code>{@html metadataHTML}</code></pre>
</div> -->

