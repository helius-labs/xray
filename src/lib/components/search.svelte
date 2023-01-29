<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";

    export let focus = true;

    let inputEl:HTMLInputElement;

    const loading = false;
    
    const dispatch = createEventDispatcher();

    let inputValue = "qudoGprpXXPMwV2TaVgwWbPD7c2GBydfoc6AUr4oWmq";

    const search =

        onMount(() => {
            if(focus) {
                inputEl.focus();
            }
        });

</script>

<form on:submit|preventDefault={search}>
    <div class="grid grid-cols-6 gap-3">
        <input
            bind:this={inputEl}
            class="input input-bordered focus:input-accent w-full col-span-6 md:col-span-5"
            placeholder="Search"
            type="text"
            bind:value={inputValue}>
        <button
            class="btn btn-gradient col-span-6 md:col-span-1"
            class:loading>
            {#if !loading}
                <svg
                    class="fill-white h-6"
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    stroke-linejoin="round"
                    stroke-miterlimit="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"><path
                    d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z"
                    fill-rule="nonzero" /></svg>
            {/if}
        </button>
    </div>
</form>
