<script lang="ts">
    import type { Icon as IconType } from "src/lib/types";
    import Icon from "$lib/components/icon.svelte";
    const supportedSearches: Array<[IconType, string]> = [
        ["backpack", "xNFT Backpack usernames like @username"],
        ["globe", ".sol, .abc, .poor, .bonk domains"],
        ["person", "Wallet/Account addresses"],
        ["coins", "Token addresses"],
        ["lightning", "Transaction signatures"],
    ];
</script>

<p class="mb-3">Use the search bar to look up any of the following.</p>

<strong class="uppercase">Supported Searches</strong>

{#each supportedSearches as [icon, text]}
    <div class="my-2 grid grid-cols-6 items-center">
        <div class="center col-span-1">
            <Icon
                id={icon}
                size="md"
            />
        </div>
        <div class="col-span-5">
            <p>{text}</p>
        </div>
    </div>
{/each}
