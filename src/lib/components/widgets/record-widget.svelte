<script lang="ts">
    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";
    import cap from "$lib/util/cap";

    export let record;
</script>

<div>
    <a
        href={record.returnedData.url}
        target="_blank"
        class="gradient relative block w-full rounded-lg border border-transparent bg-black p-2 text-left hover:border-primary"
    >
        <div class="pointer-events-none relative rounded-lg">
            <div class="flex w-full justify-between">
                <div class="flex items-center">
                    <div class="mr-2 opacity-50 -left-4">
                        <Icon
                            id={record.record ? record.record : "link"}
                            size="md"
                        />
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold md:text-sm">
                            {cap(record.record)}
                        </h3>
                        <div class="flex text-xs">
                                <div class="mr-2 rounded text-neutral">
                                    {record.returnedData.url}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </a>
</div>


