<script lang="ts">
    import { parseProgramLogs } from "$lib/util/program-logs";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    const client = trpcWithQuery($page);

    export let logs: string[];

    const parsedLogs = parseProgramLogs(logs);

    const totalComputeUnits = parsedLogs.reduce(
        (sum, log) => sum + log.computeUnits,
        0
    );

    // const anchorProgramNames = client.anchorProgramName.createQuery(
    //     parsedLogs.map((log) => log.programAddress)
    // );

    // $: console.log($anchorProgramNames.data);
</script>

<div class="pt-0">
    {#each parsedLogs as instruction, idx}
        {#if idx === 0}
            <p class="px-3">
                <span class="mb-1">
                    {`#${idx + 1} - `}
                </span>

                <span>
                    {`${instruction.invokedProgram} Instruction`}
                </span>
            </p>
        {:else}
            <p class="px-3 pt-3 pb-1">
                <span class="mb-1">
                    {`#${idx + 1} - `}
                </span>

                <span>
                    {`${instruction.invokedProgram} Instruction`}
                </span>
            </p>
        {/if}
        {#each instruction.logs as log}
            <p class="px-3 pb-1 text-sm">
                <span class={`mr-1 text-${log.style}`}>{log.prefix}</span><span
                    class={`text-${log.style}`}>{log.text}</span
                >
            </p>
        {/each}
    {/each}
</div>

{#if totalComputeUnits > 0}
    <hr class="px-3 py-1 opacity-60" />
    <div class="px-3 text-sm">
        {`${totalComputeUnits} compute units consumed`}
    </div>
{/if}
