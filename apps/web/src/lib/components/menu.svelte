<script>
    import Icon from "$lib/components/icon.svelte";

    import { state } from "svelte-snacks";

    const config = state("xrayConfig");

    let devMode = false;
    let ready = false;

    $: if ($config?.hasFetched && ready) {
        devMode = $config.data.devMode;

        ready = true;
    }

    $: if (devMode && ready) {
        $config.mutate({ devMode });
    }
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
                    <a href="/#">
                        <Icon
                            id="cancel"
                            size="lg"
                        />
                    </a>
                </tr>
            </thead>
            <tbody class="text-center">
                <!-- <tr>
                    <td>
                        <div class="w-full">
                            <div class="hidden justify-center lg:flex">
                                <Search />
                            </div>
                        </div>
                    </td>
                </tr> -->
                {#each [{ name: "About XRAY", url: "/$/about" }, { name: "About Helius APIs", url: "https://helius.xyz" }, { name: "Contribute", url: "https://github.com/helius-labs/xray" }, { name: "Join Discord", url: "https://discord.gg/Wkn3uuSby7" }] as { name, url }}
                    <tr>
                        <a
                            href={url}
                            class="btn-ghost btn w-full">{name}</a
                        >
                    </tr>
                {/each}
                <tr>
                    <div class="form-control pt-4">
                        <label class="label cursor-pointer">
                            <span class="label-text">Developer mode</span>
                            <input
                                bind:checked={devMode}
                                type="checkbox"
                                class="toggle-success toggle"
                            />
                        </label>
                    </div>
                </tr>
            </tbody>
        </table>
    </div>
</div>
