<script lang="ts">
    import shortenString from "$lib/util/shorten-string";

    import IconCard from "$lib/components/icon-card.svelte";
    import Icon from "$lib/components/icon.svelte";
    import CopyButton from "$lib/components/copy-button.svelte";

    export let icon: IconType;
</script>

<IconCard>
    <div slot="icon">
        <div class="center h-10 w-10 rounded-full bg-secondary">
            <Icon
                id="person"
                size="sm"
            />
        </div>
    </div>
    <div
        slot="title"
        class="flex items-center justify-between"
    >
        <div>
            <h3 class="fond-bold">Address</h3>
            <p class="text-xs opacity-50">
                {shortenString($page.params.search)}
            </p>
        </div>
        <div>
            <CopyButton text={$page.params.search} />
        </div>
    </div>
</IconCard>
