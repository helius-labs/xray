<script lang="ts">
    import { page } from "$app/stores";
    // @ts-ignore
    import { idlStore } from "$lib/util/stores/idl";
    import type { Idl } from "@coral-xyz/anchor";

    import { PROGRAM_ID as ACCOUNT_COMPRESSION_ID } from "@solana/spl-account-compression";

    import Icon from "$lib/components/icon.svelte";
    import AccountHeader from "$lib/components/account-header.svelte";
    import { showModal } from "$lib/state/stores/modals";
    import { trpcWithQuery } from "$lib/trpc/client";
    import { onMount, onDestroy } from "svelte";

    const client = trpcWithQuery($page);

    const account = $page.params.account;
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network === "mainnet";
    const selectedNetwork = `network=${isMainnetValue ? "mainnet" : "devnet"}`;
    const accountInfo = client.accountInfo.createQuery([
        account,
        isMainnetValue,
    ]);

    const assets = client.assets.createQuery({
        account,
        isMainnet: isMainnetValue,
    });

    $: endsWith = (str: string) => $page.url.pathname.endsWith(str);
    $: hasAssets = $assets?.data?.total > 0;

    let programIDL: Idl | null = null;

    const unsubscribe = idlStore.subscribe((value) => {
        programIDL = value;
    });

    onMount(async () => {
        try {
            const response = await fetch(
                `/api/fetchIdl?account=${account}&isMainnetValue=${isMainnetValue}`
            );

            if (response.ok) {
                const data = await response.json();

                if (data.idl) {
                    idlStore.set(data.idl);
                } else {
                    programIDL = null;
                }
            } else {
                programIDL = null;
            }
        } catch (e) {
            programIDL = null;
        }
    });

    onDestroy(() => {
        unsubscribe();
    });
</script>

<div class="relative mx-auto w-full max-w-2xl pb-32">
    <AccountHeader
        {account}
        link={$page.url.href}
    />

    <div>
        <div
            class="mx-3 mb-5 mt-3 flex items-center justify-between rounded-lg border"
        >
            <div class="tabs w-full pt-1 md:w-auto">
                <div />
                <a
                    href={`/account/${account}?${selectedNetwork}`}
                    class="tab-bordered tab"
                    class:tab-active={endsWith(`${account}`)}>Transactions</a
                >
                <a
                    href={`/account/${account}/tokens?${selectedNetwork}`}
                    class="tab-bordered tab"
                    class:tab-active={endsWith("/tokens")}>Tokens</a
                >
                {#if hasAssets}
                    <a
                        href={`/account/${account}/assets?${selectedNetwork}`}
                        class="tab-bordered tab"
                        class:tab-active={endsWith("/assets")}>Assets</a
                    >
                {/if}
                {#if $accountInfo?.data?.value?.owner === ACCOUNT_COMPRESSION_ID.toBase58()}
                    <a
                        href={`/account/${account}/concurrent-merkle-tree?${selectedNetwork}`}
                        class="tab-bordered tab"
                        class:tab-active={endsWith("concurrent-merkle-tree")}
                        >Concurrent Merkle Tree
                    </a>
                {/if}
                {#if programIDL}
                    <a
                        href={`/account/${account}/idl?${selectedNetwork}`}
                        class="tab-bordered tab"
                        class:tab-active={endsWith("/idl")}>IDL</a
                    >
                {/if}
            </div>
            {#if !endsWith("/tokens") && !endsWith("/assets") && !endsWith("/idl")}
                <button
                    class="btn-ghost btn-sm btn"
                    on:click={() => showModal("TRANSACTION_FILTER")}
                >
                    <Icon id="settings" />
                </button>
            {/if}
        </div>
    </div>

    <div class="content px-3">
        <slot />
    </div>
</div>
