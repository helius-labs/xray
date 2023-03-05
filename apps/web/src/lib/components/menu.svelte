<script>
    import Modal from "$lib/components/modal.svelte";
</script>

<Modal id="menu">
    {#each [{ name: "Home", url: "/" }, { name: "About Helius APIs", url: "https://helius.xyz" }, { name: "Join Discord", url: "https://discord.gg/8Qxk7PmArt" }, { name: "Twitter", url: "https://twitter.com/xray_explorer" }] as { name, url }}
        <a
            href={url}
            class="btn-ghost btn w-full">{name}</a
        >
    {/each}
</Modal>
