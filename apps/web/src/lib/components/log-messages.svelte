<script lang="ts">
    import { parseProgramLogs } from "$lib/util/program-logs";

    export let logs: string[];

    const parsedLogs = parseProgramLogs(logs);
    console.log(parsedLogs);
</script>

{#each parsedLogs as instruction, idx}
    <p class="px-3">
        <span class="mb-1">
            {`#${idx + 1} - `}
        </span>

        <span>
            {instruction.invokedProgram}
        </span>
    </p>
    {#each instruction.logs as log}
        <p class="mb-1 px-3 text-sm">
            <span class="mr-1 text-neutral">{log.prefix}</span><span
                class={`text-${log.style}`}>{log.text}</span
            >
        </p>
    {/each}
{/each}
