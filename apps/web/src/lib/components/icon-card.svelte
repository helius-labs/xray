<div class="grid grid-cols-12 gap-3 bg-black bg-opacity-90">
    {#if $$slots.details !== undefined}
        <div class="col-span-12">
            <slot name="details" />
        </div>
    {/if}
</div>
