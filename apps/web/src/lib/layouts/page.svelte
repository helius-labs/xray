<style>
    .header-contents :global(> :first-child) {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        background-color: black;
    }
    .header-sub-contents :global(> :first-child) {
        margin-bottom: 1.25rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .header-contents,
    .header-sub-contents,
    .content :global() {
        max-width: 42rem;
        margin: 0 auto 0 auto;
    }
</style>

<div class="sticky top-16 z-20 bg-base-100 py-1">
    <div class="header-contents">
        <slot name="header-contents" />
    </div>
</div>
<div class="header-sub-contents">
    <slot name="header-sub-contents" />
</div>

<div class="content">
    <slot name="content-above" />
    <div class="pl-5 md:pl-0">
        <slot name="transactions" />
    </div>
    <slot name="content-below" />
</div>
