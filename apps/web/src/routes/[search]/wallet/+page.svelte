<script lang="ts">
    import type {
        ProtonTransaction,
        ProtonActionType,
    } from "@helius-labs/xray-proton";

    import { onMount } from "svelte";

    import { trpcWithQuery } from "$lib/trpc/client";

    import { page } from "$app/stores";

    import { transactionActionsMetadata } from "$lib/types";

    import shortenString from "$lib/util/shorten-string";

    import { tweened } from "svelte/motion";

    import Transactions from "$lib/components/transactions.svelte";
    import IconCard from "$lib/components/icon-card.svelte";
    import DetailsPage from "$lib/components/details-page.svelte";
    import Namor from "$lib/components/providers/namor-provider.svelte";
    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";
    import TokenProvider from "src/lib/components/providers/token-provider.svelte";
    import type { PageData } from "./$types";
    import AccountInfo from "src/lib/components/account-info.svelte";

    let transactionPages: ProtonTransaction[] = [];

    const account = $page.params.search;

    const client = trpcWithQuery($page);

    const accountInfo = client.accountInfo.createQuery(account);

    const balance = tweened(0, {
        duration: 1000,
    });

    $: if ($accountInfo?.data?.balance) {
        balance.set($accountInfo.data.balance);
    }
</script>

<Transactions {account} />
