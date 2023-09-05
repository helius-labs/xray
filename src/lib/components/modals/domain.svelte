<script lang="ts">
    export let domain: String;
    import { goto } from "$app/navigation";
    import { hideModal } from "$lib/state/stores/modals";
    import bonfidaemoji from "$lib/assets/bonfida/bonfida-emoji.svg";
    import bonfidiarare from "$lib/assets/bonfida/bonfida-rare.svg";
    import bonfidaregular from "$lib/assets/bonfida/bonfida-regular.svg";
    import cart from "$lib/assets/bonfida/cart.svg";
    const thisDomain = domain.split(".")[0];
    let url = "/domains?search=" + domain;
    // Function to goto the url and close the modal
    function gotoUrl() {
        goto(url);
        hideModal();
    }
    const prices = {
        1: "$750",
        2: "$700",
        3: "$640",
        4: "$160",
        5: "$20"
    }
    // Function to check the length of the domain and return the price
    function getPrice() {
        // Remove the .sol from the domain
        if (thisDomain.length === 1) {
            return prices[1];
        } else if (thisDomain.length === 2) {
            return prices[2];
        } else if (thisDomain.length === 3) {
            return prices[3];
        } else if (thisDomain.length === 4) {
            return prices[4];
        } else {
            return prices[5];
        }
    }
    // Function to change the background depending on the content of the domain
    function changeBackground() {
        if (thisDomain.length === 1) {
            return bonfidaemoji;
        } else if (thisDomain.length <= 4) {
            return bonfidiarare;
        } else {
            return bonfidaregular;
        }
    }
</script>

<!-- Button to redirect to "/domains/{domain}" -->
<div class="text-xs absolute -translate-y-[20px] opacity-70">This domain is available on Bonfida for purchase. Click register to claim it.</div>
<div 
    class="flex w-[352px] h-[352px] flex-col items-center justify-between p-4 relative rounded-3xl mx-auto mt-8"
    style="background-image: url({changeBackground()}); background-size: cover; background-position: center;">
    <div class="text-center"></div>
    <div 
        class="cursor-pointer font-semibold text-text-domain-card font-azeret text-[24px] break-all flex justify-center items-center text-center translate-y-[20px]"
        style="color: rgb(3, 0, 17);">
        {domain}
    </div>
        <div 
            class="w-[336px] max-h-[96px] h-fit bg-white/30 p-[8px] rounded-[20px] relative">
            <div 
                class="w-[320px] max-h-[80px] h-fit rounded-[16px] py-[16px] px-4 flex justify-between text-white"
                style="background-color: rgb(19, 18, 43);"
                >
                    <div>
                        <span 
                            class="text-[#CECED8] text-[12px] font-azeret">
                            Price
                        </span>
                        <div 
                            class="flex items-center">
                                <picture>
                                    <img src="https://raw.githubusercontent.com/trustwallet/assets/f3ffd0b9ae2165336279ce2f8db1981a55ce30f8/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png" alt="" class="h-[15px] w-[15px] mr-[5px]">
                                </picture>
                                <span class="font-medium font-azeret break-all text-[16px]">
                                    {getPrice()}
                                </span>
                            </div>
                        </div>
                        <button 
                            on:click={gotoUrl}
                            class="rounded-[16px] text-white font-azeret font-medium text-[14px] flex justify-center items-center space-x-2 h-[48px] normal-case no-animation w-[130px] p-[1px] btn bg-[#7C7CFF] border-[0px] hover:bg-red" type="button" data-dashlane-rid="e72b2308e9483e7f" data-dashlane-label="true" data-form-type="">
                            <img alt="" loading="lazy" width="16" height="16" decoding="async" data-nimg="1" src={cart} style="color: transparent;">
                            <span>Register</span>
                        </button>
                    </div>
                </div>
</div>
