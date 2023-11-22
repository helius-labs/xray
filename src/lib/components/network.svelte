<script lang="ts">
    import { onMount } from "svelte";

    let isMainnetValue = true;

    onMount(() => {
        const savedIsMainnet = localStorage.getItem("isMainnet");
        if (savedIsMainnet !== null) {
            isMainnetValue = JSON.parse(savedIsMainnet);
        }
    });
    onMount(() => {
        const params = new URLSearchParams(window.location.search);
        const network = params.get("network");
        isMainnetValue = network !== "devnet";
        localStorage.setItem("isMainnet", JSON.stringify(isMainnetValue));
    });
    function toggleNetwork(event: Event) {
        isMainnetValue = (event.target as HTMLInputElement).checked;
        localStorage.setItem("isMainnet", JSON.stringify(isMainnetValue));
        const params = new URLSearchParams(window.location.search);
        params.set("network", isMainnetValue ? "mainnet" : "devnet");
        history.replaceState({}, "", "?" + params.toString());
        history.go(0);
    }
</script>

<div
    class="toggle-container m-auto mt-2 flex w-full flex-col justify-center p-4"
>
    <label class="toggle-label m-auto flex flex-col">
        <input
            type="checkbox"
            class="toggle flex justify-center"
            bind:checked={isMainnetValue}
            on:change={toggleNetwork}
        />
        <span class="toggle-mark" />
    </label>
    <span class="network-text m-auto my-1 flex font-bold"
        >{isMainnetValue ? "Mainnet" : "Devnet"}</span
    >
</div>
