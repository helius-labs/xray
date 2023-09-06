<script lang="ts">
    import Icon from "$lib/components/icon.svelte";
    import shortenString from "$lib/util/shorten-string";
    import CopyButton from "$lib/components/copy-button.svelte";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    export let account: string;
</script>

<div class="rounded-lg border p-3">
    <div class="flex justify-between">
        <div class="flex items-center text-neutral">
            <Icon
                id="person"
                size="md"
            />
            <h2 class="ml-2 text-lg font-bold">Account</h2>
        </div>
        <div class="flex items-center gap-2">
            <!-- <Icon id="person" size="md" /> -->
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
    <div />
</div>
