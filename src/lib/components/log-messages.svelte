<style>
    .text-sky {
        color: text-info-content;
    }

    .text-tangerine {
        color: text-#e8a034;
    }
</style>

<script lang="ts">
    import { parseProgramLogs } from "$lib/util/program-logs";
    export let logs: string[];

    const parsedLogs = parseProgramLogs(logs);

    const totalComputeUnits = parsedLogs.reduce(
        (sum, log) => sum + log.computeUnits,
        0
    );

    // Check if there is at least one entry with non-empty logs
    const hasNonEmptyLogs = parsedLogs.some(
        (instruction) => instruction.logs.length > 0
    );
</script>

<div class="pt-0">
    {#if hasNonEmptyLogs}
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
                <p class="px-3 pb-1 pt-3">
                    <span class="mb-1">
                        {`#${idx + 1} - `}
                    </span>

                    <span>
                        {`${instruction.invokedProgram} Instruction`}
                    </span>
                </p>
            {/if}
            {#each instruction.logs as log}
                <p class={`px-3 pb-1 text-sm text-${log.style}`}>
                    <span class={`mr-1 text-${log.style}`}>{log.prefix}</span
                    ><span class={``}>{log.text}</span>
                </p>
            {/each}
        {/each}
    {:else}
        <p class="px-3 pb-1 text-sm">This transaction does not have any logs</p>
    {/if}
</div>

{#if totalComputeUnits > 0}
    <hr class="mx-3 my-1 border border-neutral opacity-80" />
    <div class="px-3 pt-1 text-sm">
        {`${totalComputeUnits} compute units consumed`}
    </div>
{/if}
