<script>
    import Icon from "$lib/components/icon.svelte";
    import PoweredByHelius from "$lib/components/powered-by-helius.svelte";
</script>

<footer
    class="footer fixed bottom-0 grid w-full grid-cols-2 items-center border bg-black p-3 pb-5"
>
    <div class="flex items-center">
        <PoweredByHelius />
    </div>

    <div class="flex w-full justify-end">
        <div>
            <a
                href="https://discord.gg/Wkn3uuSby7"
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
