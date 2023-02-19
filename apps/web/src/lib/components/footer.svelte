<footer
    class="footer bottom-0 w-full items-center border bg-black p-3"
    class:fixed={$page.url.pathname === "/"}
>
    <div class="grid-flow-col items-center">
        <PoweredByHelius />
    </div>
    <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
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
            href="https://discord.gg/Wkn3uuSby7"
            class="btn-ghost btn"
        >
            <Icon
                id="twitter"
                size="md"
            />
        </a>
    </div>
</footer>
