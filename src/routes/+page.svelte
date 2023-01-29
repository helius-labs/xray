<style>
    .input {
        background: rgba(0, 0, 0, 0.25);
    }

</style>

<script lang="ts">
    import { onMount } from "svelte";
    import { fly } from "svelte/transition";

    import search from "$lib/search";

    let inputEl:HTMLInputElement;
    let inputValue:string = "";

    let searchError = "";
    let isSearching = false;

    const focus = () => inputEl.focus();

    const newSearch = async () => {
        searchError = "";
        isSearching = true;

        const minSearch = 750;

        const beforeSearch = Date.now();

        try {
            await search(inputValue);
        } catch(error) {
            if(Date.now() - beforeSearch < minSearch) {
                await new Promise((resolve) => setTimeout(resolve, minSearch - (Date.now() - beforeSearch)));
            }

            isSearching = false;

            searchError = "Search failed. Make sure you've provided a valid Solana  account address or transaction signature.";
        }
    };

    onMount(focus);
</script>

<div
    class="flex justify-center items-center px-3 min-h-screen flex-wrap"
    on:click={focus}
    on:keydown={focus}>
    <div class="absolute bottom-1/2 translate-y-1/2">
        <div class="blob"></div>
    </div>
    <div class="w-full max-w-2xl">
        <div class="w-full">
            <h1 class="text-8xl text-white text-center font-bold">
                XRAY
            </h1>
        </div>
        {#if searchError && !isSearching}
            <div class="flex items-center mt-4 opacity-50">
                <svg
                    class="fill-white h-10 mr-3"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"><path
                    d="m12.002 2.005c5.518 0 9.998 4.48 9.998 9.997 0 5.518-4.48 9.998-9.998 9.998-5.517 0-9.997-4.48-9.997-9.998 0-5.517 4.48-9.997 9.997-9.997zm0 1.5c-4.69 0-8.497 3.807-8.497 8.497s3.807 8.498 8.497 8.498 8.498-3.808 8.498-8.498-3.808-8.497-8.498-8.497zm0 6.5c-.414 0-.75.336-.75.75v5.5c0 .414.336.75.75.75s.75-.336.75-.75v-5.5c0-.414-.336-.75-.75-.75zm-.002-3c.552 0 1 .448 1 1s-.448 1-1 1-1-.448-1-1 .448-1 1-1z"
                    fill-rule="nonzero" /></svg>
                <p
                    class="text-slate-100"
                    in:fly={{
                        y        : -10,
                        duration : 500,
                    }}>
                    {searchError}
                </p>
            </div>
        {/if}
        <form
            class="py-10 flex justify-center relative"
            on:submit|preventDefault={newSearch}>
            <svg
                class="fill-white opacity-50 h-7 absolute left-4 bottom-1/2 translate-y-1/2"
                clip-rule="evenodd"
                fill-rule="evenodd"
                stroke-linejoin="round"
                stroke-miterlimit="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"><path
                d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
                fill-rule="nonzero" /></svg>
            
            <input
                bind:this={inputEl}
                class="input input-bordered rounded-lg w-full text-lg h-16 focus:input-secondary px-14"
                placeholder="Search Solana"
                type="text"
                bind:value={inputValue}>

            <button
                class="absolute right-4 bottom-1/2 translate-y-1/2 btn btn-ghost px-0"
                class:loading={isSearching}>
                {#if !isSearching}
                    <svg
                        class="fill-white opacity-50 h-8"
                        clip-rule="evenodd"
                        fill-rule="evenodd"
                        stroke-linejoin="round"
                        stroke-miterlimit="2"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"><path
                        d="m14.523 18.787s4.501-4.505 6.255-6.26c.146-.146.219-.338.219-.53s-.073-.383-.219-.53c-1.753-1.754-6.255-6.258-6.255-6.258-.144-.145-.334-.217-.524-.217-.193 0-.385.074-.532.221-.293.292-.295.766-.004 1.056l4.978 4.978h-14.692c-.414 0-.75.336-.75.75s.336.75.75.75h14.692l-4.979 4.979c-.289.289-.286.762.006 1.054.148.148.341.222.533.222.19 0 .378-.072.522-.215z"
                        fill-rule="nonzero" /></svg>
                {/if}
            </button>
        </form>
        <div>
            <a
                class="flex justify-center items-center opacity-50"
                href="https://helius.xyz/">
                <p class="text-xs mr-1 ">Powered by </p>
                <img
                    class="h-5"
                    alt=""
                    src="/media/helius/helius.png">
            </a>
        </div>
    </div>
</div>
