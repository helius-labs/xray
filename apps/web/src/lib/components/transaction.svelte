<script lang="ts">
    import { onMount } from "svelte";

    import type {
        ProtonTransaction,
        ProtonActionType,
    } from "@helius-labs/xray-proton";

    import {
        transactionActionsMetadata,
        type TransactionActionMetadata,
    } from "$lib/types";
    // import { state } from "svelte-snacks";

    // const tokenRegistry = state("solanaTokenRegistry");

    // onMount(() => {
    //     $tokenRegistry.load();
    // });

    // TODO: lol
    export let transaction: ProtonTransaction;

    import IconCard from "$lib/components/icon-card.svelte";
    import Icon from "$lib/components/icon.svelte";

    const key = transaction.type as ProtonActionType;

    const supported = Object.keys(transactionActionsMetadata).includes(
        transaction.type
    );

    const metadata = supported
        ? transactionActionsMetadata[transaction.type as ProtonActionType]
        : transactionActionsMetadata["UNKNOWN"];
</script>

<div class="mb-2">
    <!-- <pre>{JSON.stringify(transaction, null, 4)}</pre> -->
    <div class="flex justify-between">
        <div class="mb-1 flex items-center">
            <Icon
                id={metadata.icon}
                size="md"
            />
            <h3 class="ml-2">
                {metadata.label}
            </h3>
        </div>
        <div class="mb-1">
            <h3 class="ml-2 text-xs">
                {transaction?.timestamp}
            </h3>
        </div>
    </div>

    <div class="rounded-lg border bg-black p-2" />
</div>
