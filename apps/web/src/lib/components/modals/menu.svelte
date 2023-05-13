{#each [{ name: "Home", url: "/" }, { name: "Join Discord", url: "https://discord.gg/Wkn3uuSby7" }, { name: "Contribute", url: "https://github.com/helius-labs/xray" }, { name: "Feature Request", url: "https://github.com/helius-labs/xray/issues/new?assignees=&labels=question&projects=&template=FEATURE-REQUEST.yml&title=%F0%9F%92%A1+%5BREQUEST%5D+-+%3Ctitle%3E" }, { name: "Bug Report", url: "https://github.com/helius-labs/xray/issues/new?assignees=&labels=bug&projects=&template=BUG-REPORT.yml&title=%F0%9F%90%9B+%5BBUG%5D+-+%3Ctitle%3E" }, { name: "About Helius", url: "https://helius.xyz" }] as { name, url }}
    <a
        href={url}
        data-sveltekit-reload
        class="btn-ghost btn w-full">{name}</a
    >
{/each}
