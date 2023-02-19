<div class="grid grid-cols-12 gap-3">
    <div class="col-span-12">
        <div class="flex w-full justify-center h-7">
            <div
                class="my-2 h-3 w-20 animate-pulse rounded-full bg-secondary"
            />
        </div>
    </div>
    <div class="col-span-12">
        <div class="flex justify-center w-full">
            <div class="card center w-full md:w-1/2">
                <div class="h-56 w-56 animate-pulse rounded-full bg-secondary" />
            </div>
        </div>
    </div>

    <div class="col-span-10 mt-3">
        <div class="flex w-full items-center justify-between">
            <div class="w-3/4">
                <div
                    class="my-2 h-3 w-1/4 animate-pulse rounded-full bg-secondary"
                />
                <div
                    class="h-2 w-2/4 mt-3 animate-pulse rounded-full bg-secondary"
                />
            </div>
        </div>
    </div>

    <div class="col-span-10">
        <div class="flex w-full items-center justify-between">
            <div class="w-3/4">
                <div
                    class="my-2 h-3 w-1/4 animate-pulse rounded-full bg-secondary"
                />
                <div
                    class="h-2 w-2/4 mt-3 animate-pulse rounded-full bg-secondary"
                />
            </div>
        </div>
    </div>

    <div class="col-span-12">
        <div class="flex w-full items-center justify-between">
            <div class="w-3/4">
                <div
                    class="my-2 h-3 w-1/4 animate-pulse rounded-full bg-secondary"
                />
                <div class="flex flex-wrap">
                    {#each [1, 2, 3, 4, 5] as i}   
                    <div class="card w-fit mt-2 mr-2">
                        <div
                            class="h-3 w-14 animate-pulse rounded-full bg-secondary"
                        />
                        <div
                            class="h-2 w-20 mt-2 animate-pulse rounded-full bg-secondary"
                        />
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
    <div class="col-span-12">
        <div class="flex w-full items-center justify-between">
            <div class="w-3/4">
                <div
                    class="my-2 h-3 w-1/4 animate-pulse rounded-full bg-secondary"
                />
                <div class="flex flex-wrap">
                    {#each [1, 2] as i}   
                    <div class="card w-fit mt-2 mr-2">
                        <div
                            class="h-3 w-14 animate-pulse rounded-full bg-secondary"
                        />
                        <div
                            class="h-2 w-20 mt-2 animate-pulse rounded-full bg-secondary"
                        />
                    </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</div>