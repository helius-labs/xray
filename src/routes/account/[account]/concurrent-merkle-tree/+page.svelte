<script lang="ts">
    import { page } from "$app/stores";
    import CopyButton from "$lib/components/copy-button.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import Icon from "$lib/components/icon.svelte";
    import { trpcWithQuery } from "$lib/trpc/client";
    import shortenString from "$lib/util/shorten-string";
    import { PublicKey } from "@solana/web3.js";

    const client = trpcWithQuery($page);

    const account = $page.params.account;
    const params = new URLSearchParams(window.location.search);
    const network = params.get("network");
    const isMainnetValue = network !== "devnet";
    const cmt = client.concurrentMerkleTree.createQuery({
        address: account,
        isMainnet: isMainnetValue,
    });

    $: currentRoot = new PublicKey($cmt.data?.root.data || []);
</script>

{#if $cmt.data}
    <div class="mb-3">
        <div
            class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
        >
            <div class="col-span-2 p-1 md:col-span-1">
                <div class="center ml-1 h-10 w-10 rounded-full bg-secondary">
                    <Icon
                        id="key"
                        size="sm"
                    />
                </div>
            </div>
            <div
                class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
            >
                <div>
                    <h4 class="text-lg font-semibold md:text-sm">Authority</h4>
                    <h3 class="mr-2 text-xs opacity-50">
                        The account authroized to modify the tree's state.
                    </h3>
                </div>
                <div class="flex items-center">
                    <CopyButton text={$cmt.data?.authority} />
                    <a
                        data-sveltekit-reload
                        href="/account/{$cmt.data
                            ?.authority}?network=${isMainnetValue
                            ? 'mainnet'
                            : 'devnet'}"
                        class="pointer-events-auto text-xs hover:link-success md:text-sm"
                    >
                        {shortenString($cmt.data?.authority)}
                    </a>
                </div>
            </div>
        </div>
        <div>
            <div
                class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
            >
                <div class="col-span-2 p-1 md:col-span-1">
                    <div
                        class="center ml-1 h-10 w-10 rounded-full bg-secondary"
                    >
                        <Icon
                            id="box"
                            size="sm"
                        />
                    </div>
                </div>
                <div
                    class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
                >
                    <div>
                        <h4 class="text-lg font-semibold md:text-sm">
                            Slot Created
                        </h4>
                        <h3 class="mr-2 text-xs opacity-50">
                            The slot this tree was created on.
                        </h3>
                    </div>
                    <a
                        href="/block/{$cmt.data
                            ?.creationSlot}?network=${isMainnetValue
                            ? 'mainnet'
                            : 'devnet'}"
                        class="pointer-events-auto text-xs hover:link-success md:text-sm"
                    >
                        {$cmt.data?.creationSlot.toLocaleString()}
                    </a>
                </div>
            </div>
        </div>
        <div
            class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
        >
            <div class="col-span-2 p-1 md:col-span-1">
                <div class="center ml-1 h-10 w-10 rounded-full bg-secondary">
                    <Icon
                        id="tree"
                        size="sm"
                    />
                </div>
            </div>
            <div
                class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
            >
                <div>
                    <h4 class="text-lg font-semibold md:text-sm">Max Depth</h4>
                    <h3 class="mr-2 text-xs opacity-50">
                        The maximum number of levels the tree can have.
                    </h3>
                </div>
                <p class="text-xs md:text-sm">{$cmt.data.treeHeight}</p>
            </div>
        </div>
        <div
            class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
        >
            <div class="col-span-2 p-1 md:col-span-1">
                <div class="center ml-1 h-10 w-10 rounded-full bg-secondary">
                    <Icon
                        id="cloudTransfer"
                        size="sm"
                    />
                </div>
            </div>
            <div
                class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
            >
                <div>
                    <h4 class="text-lg font-semibold md:text-sm">
                        Max Buffer Size
                    </h4>
                    <h3 class="mr-2 text-xs opacity-50">
                        The maximum number of leaves that can be processed at
                        once.
                    </h3>
                </div>
                <p class="text-xs md:text-sm">{$cmt.data.maxBufferSize}</p>
            </div>
        </div>
        <div
            class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
        >
            <div class="col-span-2 p-1 md:col-span-1">
                <div class="center ml-1 h-10 w-10 rounded-full bg-secondary">
                    <Icon
                        id="trees"
                        size="sm"
                    />
                </div>
            </div>
            <div
                class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
            >
                <div>
                    <h4 class="text-lg font-semibold md:text-sm">
                        Canopy Depth
                    </h4>
                    <h3 class="mr-2 text-xs opacity-50">
                        The subset of the tree that is stored within the tree
                        account.
                    </h3>
                </div>
                <p class="text-xs md:text-sm">{$cmt.data.canopyDepth}</p>
            </div>
        </div>
        <div
            class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
        >
            <div class="col-span-2 p-1 md:col-span-1">
                <div class="center ml-1 h-10 w-10 rounded-full bg-secondary">
                    <Icon
                        id="cycle"
                        size="sm"
                    />
                </div>
            </div>
            <div
                class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
            >
                <div>
                    <h4 class="text-lg font-semibold md:text-sm">
                        Current Sequence Number
                    </h4>
                    <h3 class="mr-2 text-xs opacity-50">
                        The number used to differentiate updates to the tree.
                    </h3>
                </div>
                <p class="text-xs md:text-sm">
                    {parseInt($cmt.data.seq).toLocaleString()}
                </p>
            </div>
        </div>
        <div
            class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
        >
            <div class="col-span-2 p-1 md:col-span-1">
                <div class="center ml-1 h-10 w-10 rounded-full bg-secondary">
                    <Icon
                        id="codeFork"
                        size="sm"
                    />
                </div>
            </div>
            <div
                class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
            >
                <div>
                    <h4 class="text-lg font-semibold md:text-sm">
                        Current Root
                    </h4>
                    <h3 class="mr-2 text-xs opacity-50">
                        The current root hash of the tree.
                    </h3>
                </div>
                <div class="flex items-center">
                    <CopyButton text={String(currentRoot)} />
                    <p class="text-xs md:text-sm">
                        {shortenString(String(currentRoot))}
                    </p>
                </div>
            </div>
        </div>
        <div
            class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
        >
            <div class="col-span-2 p-1 md:col-span-1">
                <div class="center ml-1 h-10 w-10 rounded-full bg-secondary">
                    <Icon
                        id="leaf"
                        size="sm"
                    />
                </div>
            </div>
            <div
                class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
            >
                <div>
                    <h4 class="text-lg font-semibold md:text-sm">
                        Current Number of Leaves
                    </h4>
                    <h3 class="mr-2 text-xs opacity-50">
                        The current number of leaves in the tree.
                    </h3>
                </div>
                <p class="text-xs md:text-sm">
                    {$cmt.data.rightMostIndex.toLocaleString()}
                </p>
            </div>
        </div>
        <div
            class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
        >
            <div class="col-span-2 p-1 md:col-span-1">
                <div class="center ml-1 h-10 w-10 rounded-full bg-secondary">
                    <Icon
                        id="hourglass"
                        size="sm"
                    />
                </div>
            </div>
            <div
                class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
            >
                <div>
                    <h4 class="text-lg font-semibold md:text-sm">
                        Remaining Leaves
                    </h4>
                    <h3 class="mr-2 text-xs opacity-50">
                        The number of leaves that can still be added to the
                        tree.
                    </h3>
                </div>
                <p class="text-xs md:text-sm">
                    {(
                        Math.pow(2, $cmt.data.treeHeight) -
                        $cmt.data.rightMostIndex +
                        1
                    ).toLocaleString()}
                </p>
            </div>
        </div>
        <div
            class="mt-3 grid grid-cols-12 items-center gap-3 rounded-lg border p-1 py-3"
        >
            <div class="col-span-2 p-1 md:col-span-1">
                <div class="center ml-1 h-10 w-10 rounded-full bg-secondary">
                    <Icon
                        id="plus"
                        size="sm"
                    />
                </div>
            </div>
            <div
                class="col-span-10 flex items-center justify-between pr-1 md:col-span-11"
            >
                <div>
                    <h4 class="text-lg font-semibold md:text-sm">
                        Max Possible Leaves
                    </h4>
                    <h3 class="mr-2 text-xs opacity-50">
                        The maximum number of leaves that the tree can
                        accommodate.
                    </h3>
                </div>
                <p class="text-xs md:text-sm">
                    {Math.pow(2, $cmt.data.treeHeight).toLocaleString()}
                </p>
            </div>
        </div>
    </div>
{:else}
    {#each Array(3) as _}
        <div class="py-2">
            <IconCard />
        </div>
    {/each}
{/if}
