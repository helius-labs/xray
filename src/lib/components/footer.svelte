<script>
    import Icon from "$lib/components/icon.svelte";
    import PoweredByHelius from "$lib/components/powered-by-helius.svelte";
</script>

<footer
    class="footer mt-0 grid w-full grid-cols-2 items-center border bg-black p-3"
>
    <div class="col-span-1 flex items-center">
        <PoweredByHelius />
    </div>

    <div class="col-span-1 flex w-full justify-end">
        <div class="mr-12">
            <a
                href="https://discord.com/invite/6GXdee3gBj"
                class="btn-ghost btn"
            >
                <Icon
                    id="discord"
                    size="md"
                />
            </a>
            <a
                href="https://twitter.com/heliuslabs"
                class="btn-ghost btn"
            >
                <Icon
                    id="twitter"
                    size="md"
                />
            </a>
        </div>
    </div>
</footer>
