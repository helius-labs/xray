<script>
    import Icon from "$lib/icon";
</script>

<div
    class=" modal"
    id="menu"
>
    <div class="modal-box">
        <table class="table w-full">
            <!-- head -->
            <thead>
                <tr class="flex justify-between pb-4">
                    <h1 class="text-2xl">MENU</h1>
                    <a href="#">
                        <Icon
                            id="cancel"
                            size="lg"
                        />
                    </a>
                </tr>
            </thead>
            <tbody class="text-center">
                {#each [{ name: "About XRAY", url: "/$/about" }, { name: "About Helius APIs", url: "https://helius.xyz" }, { name: "Contribute", url: "https://github.com/helius-labs/xray" }, { name: "Join Discord", url: "https://discord.gg/Wkn3uuSby7" }] as { name, url }}
                    <tr>
                        <a
                            href={url}
                            class="btn-ghost btn w-full">{name}</a
                        >
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
