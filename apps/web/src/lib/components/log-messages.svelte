<script lang="ts">
    import { parseProgramLogs } from "$lib/util/program-logs";

    import { page } from "$app/stores";

    import { trpcWithQuery } from "$lib/trpc/client";

    const client = trpcWithQuery($page);

    export let logs: string[];

    const parsedLogs = parseProgramLogs(logs);

    // const anchorProgramNames = client.anchorProgramName.createQuery(
    //     parsedLogs.map((log) => log.programAddress)
    // );

    // $: console.log($anchorProgramNames.data);
</script>

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
            <span class="mr-1 text-neutral">{log.prefix}</span><span
                class={`text-${log.style}`}>{log.text}</span
            >
        </p>
    {/each}
{/each}
