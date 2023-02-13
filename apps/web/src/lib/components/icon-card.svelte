<div class="card grid grid-cols-12 gap-3"
>
    <div class="col-span-2 md:col-span-1 center relative">
        <slot name="icon">
            <div class="w-10 h-10 bg-secondary rounded-full animate-pulse"></div>
        </slot>
    </div>

    <div class="col-span-10 md:col-span-11">
        <slot name="title">
            <div class="flex items-center justify-between w-full">
                <div class="w-3/4">
                    <div class="h-3 w-1/4 bg-secondary rounded-full my-2 animate-pulse"></div>
                    <div class="h-2 w-2/4 bg-secondary rounded-full animate-pulse"></div>
                </div>
                <div class="w-1/4 flex justify-end">
                    <div class="h-3 w-10 bg-secondary rounded-full my-2 animate-pulse"></div>
                </div>
            </div>
        </slot>
    </div>

    {#if $$slots.details !== undefined}
        <div class="col-span-12">
            <slot name="details">

            </slot>
        </div>
    {/if}
</div>

<script>
    $: console.log("slots", $$slots.details);
</script>
