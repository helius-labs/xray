<script lang="ts">
    export let domain: Array<string>;
    import { goto } from '$app/navigation';
    import { hideModal } from "$lib/state/stores/modals";
    let url = '/domains?search=' + domain;
    // Function to goto the url and close the modal
    function gotoUrl() {
        goto(url);
        hideModal();
    }
</script>

<!-- Button to redirect to "/domains/{domain}" -->
<div class="flex flex-col items-center justify-between h-full p-4 gap-1">
    <div class="text-center">
        The domain:
    </div>
    <div
        class="text-5xl"
        style="background: linear-gradient(to right, #00FFA3, #DC1FFF); -webkit-background-clip: text; color: transparent;">
        <strong>{domain}</strong>
    </div>
    <div class="text-center">
        is available on Bonfida.
    </div>
    <button
        on:click={gotoUrl}
        class="rounded-[18px] h-[56px] p-3 btn bg-gradient-to-r from-[#00F0FF] to-[#CBFF5E] mt-4">
        <div 
            class="normal-case flex items-center text-[#03001A] space-x-2 font-azeret text-[16px]">
            <span>REGISTER NOW</span>
        </div>

    </button>
</div>


