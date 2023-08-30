{#each [{ name: "Home", url: "/" }, { name: "About XRAY", url: "/about" }, { name: "Contribute", url: "https://github.com/helius-labs/xray" }, { name: "Join Discord", url: "https://discord.gg/mV3dNPwDnZ" }] as { name, url }}
    <a
        href={url}
        class="btn btn-ghost w-full">{name}</a
    >
{/each}
