<script>
    import AnimEach from "$lib/components/anim-each.svelte";
</script>

<AnimEach each={Array(3)}>
    <div
        class="relative mb-3 flex w-full rounded-lg bg-black bg-opacity-60 p-4"
    >
        <div class="center relative pr-3">
            <div
                class="h-10 w-10 animate-pulse rounded-full bg-gray-300 bg-opacity-10"
            />
        </div>

        <div class="flex-1">
            <div class="flex w-full items-center justify-between">
                <div class="w-3/4">
                    <div
                        class="my-2 h-3 w-1/4 animate-pulse rounded-full bg-gray-300 bg-opacity-10"
                    />
                    <div
                        class="h-2 w-2/4 animate-pulse rounded-full bg-gray-300 bg-opacity-10"
                    />
                </div>
                <div class="flex w-1/4 justify-end">
                    <div
                        class="my-2 h-3 w-10 animate-pulse rounded-full bg-gray-300 bg-opacity-10"
                    />
                </div>
            </div>
        </div>
    </div>
</AnimEach>
