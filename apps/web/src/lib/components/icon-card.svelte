<div class="card grid grid-cols-12 gap-3">
    <div class="center relative col-span-2 md:col-span-1">
        <slot name="icon">
            <div class="h-10 w-10 animate-pulse rounded-full bg-secondary" />
        </slot>
    </div>

    <div class="col-span-10 md:col-span-11">
        <slot name="title">
            <div class="flex w-full items-center justify-between">
                <div class="w-3/4">
                    <div
                        class="my-2 h-3 w-1/4 animate-pulse rounded-full bg-secondary"
                    />
                    <div
                        class="h-2 w-2/4 animate-pulse rounded-full bg-secondary"
                    />
                </div>
                <div class="flex w-1/4 justify-end">
                    <div
                        class="my-2 h-3 w-10 animate-pulse rounded-full bg-secondary"
                    />
                </div>
            </div>
        </slot>
    </div>

    {#if $$slots.details !== undefined}
        <div class="col-span-12">
            <slot name="details" />
        </div>
    {/if}
</div>
