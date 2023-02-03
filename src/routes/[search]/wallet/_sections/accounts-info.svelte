<script>
    import { page } from "$app/stores";

    import { tweened } from "svelte/motion";

    import { fly, fade } from "svelte/transition";

    import shortenAddress from "$lib/util/shorten-string";

    const tweenedBalance = tweened(0, {
        duration : 1000,
    });

    import accountInfoQuery from "$lib/state/queries/solana-account-info";

    const accountInfo = accountInfoQuery($page.params.search);

    $: tweenedBalance.set($accountInfo?.data?.balance || 0);
</script>
     
{#if $accountInfo.isSuccess}
    <div class="relative">
        <div
            class="absolute bottom-1/2 translate-y-1/2 pointer-events-none"
            in:fade={{
                duration : 2000,
            }}>
            <div class="blob"></div>
        </div>
        <div
            class="flex items-center justify-between mb-6"
            in:fly={{
                y        : -50,
                duration : 500,
            }}>
            <h2 class="font-bold text-3xl mr-2">
                {shortenAddress($page.params.search, 6)}
            </h2>
            <button class="btn-ghost rounded p-1">
                <svg
                    class="h-8 fill-current"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"><path
                    d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z"
                    fill-rule="nonzero" /></svg>
            </button>
        </div>
        <div
            class="card"
            in:fly={{
                y        : 50,
                duration : 500,
            }}>
            <div class="w-full flex items-center justify-between">
                <div class="flex items-center">
                    <img
                        class="h-9 rounded-full mr-1"
                        alt=""
                        src="/media/tokens/solana.png">
                    <p class="opacity-50">
                        Balance
                    </p>
                </div>
                <p>
                    {$tweenedBalance.toFixed(5)}
                </p>
            </div>
        </div>
    </div>
{/if}

