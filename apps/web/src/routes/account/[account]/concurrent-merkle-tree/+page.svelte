<script lang="ts">
    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";
    import { PublicKey } from "@solana/web3.js";

    const client = trpcWithQuery($page);
    const account = $page.params.account;

    const cmt = client.concurrentMerkleTree.createQuery(account);
</script>

{#if $cmt.data}
    <div>
        <div>
            <p>Authority</p>
            <div>{$cmt.data?.authority}</div>
        </div>
        <div>
            <p>Creation Slot</p>
            <a
                data-sveltekid-reload
                href="/block/{$cmt.data?.creationSlot}"
                class="pointer-events-auto hover:link-success"
                >{$cmt.data?.creationSlot}</a
            >
        </div>
        <div>
            <p>Max Depth</p>
            <div>{$cmt.data.treeHeight}</div>
        </div>
        <div>
            <p>Max Buffer Size</p>
            <div>{$cmt.data.maxBufferSize}</div>
        </div>
        <div>
            <p>Canopy Depth</p>
            <div>{$cmt.data.canopyDepth}</div>
        </div>
        <div>
            <p>Current Sequence Number</p>
            <div>{$cmt.data.seq.toLocaleString()}</div>
        </div>
        <div>
            <p>Current Root</p>
            <div>{new PublicKey($cmt.data.root.data)}</div>
        </div>
        <div class="flex flex-col border p-2">
            <div>Leaves</div>
            <div class="flex justify-around">
                <div>
                    <p>Current</p>
                    <div>{($cmt.data.rightMostIndex - 1).toLocaleString()}</div>
                </div>
                <div>
                    <p>Max Possible</p>
                    <div>
                        {Math.pow(2, $cmt.data.treeHeight).toLocaleString()}
                    </div>
                </div>
                <div>
                    <p>Remaining</p>
                    <div>
                        {(
                            Math.pow(2, $cmt.data.treeHeight) -
                            $cmt.data.rightMostIndex +
                            1
                        ).toLocaleString()}
                    </div>
                </div>
            </div>
        </div>
    </div>
{:else}
    <div />
{/if}
