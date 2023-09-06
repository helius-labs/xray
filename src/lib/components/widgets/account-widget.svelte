<script lang="ts">
    import CopyButton from "$lib/components/copy-button.svelte";

    export let account: string;
</script>

<div class="rounded-lg border p-3">
    <div class="flex justify-between">

        <div class="flex items-center">
            <h2 class="text-2xl font-bold">Account</h2>
        </div>
        <div class="flex items-center gap-2">
            <span class="text-md"
                >{account.slice(0, 4)}...<span class="opacity-50"
                    >{account.slice(account.length - 4, account.length)}</span
                ></span
            >
            <div class="flex items-center">
                <div class="relative flex items-center">
                    <div class="my-2">
                        <CopyButton text={account} />
                        <CopyButton
                            text="https://xray.helius.xyz/account/{account}"
                            icon="link"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
