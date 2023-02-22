<script>
    import Icon from "$lib/components/icon.svelte";
    import Modal from "$lib/components/modal.svelte";

    // import { state } from "svelte-snacks";

    // const config = state("xrayConfig");

    let devMode = false;
    let ready = false;
</script>

<Modal id="menu">
    <div slot="title">
        <h1 class="text-2xl font-bold">Menu</h1>
    </div>

    {#each [{ name: "About XRAY", url: "/$/about" }, { name: "About Helius APIs", url: "https://helius.xyz" }, { name: "Contribute", url: "https://github.com/helius-labs/xray" }, { name: "Join Discord", url: "https://discord.gg/Wkn3uuSby7" }] as { name, url }}
        <a
            href={url}
            class="btn-ghost btn w-full">{name}</a
        >
    {/each}
    <!-- 
    <div class="form-control pt-4">
        <label class="label cursor-pointer">
            <span class="label-text">Developer mode</span>
            <input
                bind:checked={devMode}
                type="checkbox"
                class="toggle-success toggle"
            />
        </label>
    </div> -->
</Modal>
