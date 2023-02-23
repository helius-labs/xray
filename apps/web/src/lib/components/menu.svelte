<script>
    import Modal from "$lib/components/modal.svelte";
</script>

<Modal id="menu">
    {#each [{ name: "Home", url: "/" }, { name: "About XRAY", url: "/$/about" }, { name: "About Helius APIs", url: "https://helius.xyz" }, { name: "Contribute", url: "https://github.com/helius-labs/xray" }, { name: "Join Discord", url: "https://discord.gg/Wkn3uuSby7" }] as { name, url }}
        <a
            href={url}
            class="btn-ghost btn w-full">{name}</a
        >
    {/each}
</Modal>
