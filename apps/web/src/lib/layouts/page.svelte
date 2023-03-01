<div class="sticky top-16 z-20 bg-base-100 py-1">
    <div class="max-w-2xl mx-auto">
        <slot name="header-contents" />
    </div>
</div>
<div class="max-w-2xl mx-auto">
    <slot name="header-sub-contents" />
    <slot name="body" />
</div>