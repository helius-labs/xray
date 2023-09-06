<script lang="ts">
    export let domain: Array<string>;
    import { goto } from "$app/navigation";
    import { hideModal } from "$lib/state/stores/modals";
    let url = "/domains?search=" + domain;
    // Function to goto the url and close the modal
    function gotoUrl() {
        goto(url);
        hideModal();
    }
</script>

<!-- Button to redirect to "/domains/{domain}" -->
<div class="flex h-full flex-col items-center justify-between gap-1 p-4">
    <div class="text-center">The domain:</div>
    <div
        class="text-5xl"
        style="background: linear-gradient(to right, #00FFA3, #DC1FFF); -webkit-background-clip: text; color: transparent;"
    >
        <strong>{domain}</strong>
    </div>
    <div class="text-center">is available on Bonfida.</div>
    <button
        on:click={gotoUrl}
        class="btn mt-4 h-[56px] rounded-[18px] bg-gradient-to-r from-[#00F0FF] to-[#CBFF5E] p-3"
    >
        <div
            class="font-azeret flex items-center space-x-2 text-[16px] normal-case text-[#03001A]"
        >
            <span>REGISTER NOW</span>
        </div>
    </button>
</div>
