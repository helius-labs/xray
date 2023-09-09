{#each [{ name: "Home", url: "/" }, { name: "About Helius APIs", url: "https://helius.xyz" }, { name: "Contribute", url: "https://github.com/helius-labs/xray" }, { name: "Join Discord", url: "https://discord.gg/mV3dNPwDnZ" }] as { name, url }}
    <a
        href={url}
        data-sveltekit-reload
        class="btn btn-ghost w-full">{name}</a
    >
{/each}
