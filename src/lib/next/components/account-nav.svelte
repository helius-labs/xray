<script lang="ts">
    import {
        QrCode,
        Copy,
        Link,
    } from "lucide-svelte";

    import { page } from "$app/stores";

    import { onMount } from "svelte";

    let qrElement:HTMLCanvasElement;
    let qrModal:HTMLDialogElement;
</script>

<div class="account-nav rounded-xl p-4   my-2">
    <!-- <h2 class="font-semibold text-xl">Account</h2> -->
    <div class="flex items-center justify-between">
        <div class="flex items-center">
            <div class="badge border-green-400 text-green-400 badge-outline text-xs font-bold opacity-80">ACCOUNT</div>

            <p class="opacity-80 ml-3 text-xs">
                {$page.params.account}
            </p>
        </div>                   
        <div class="flex">
            <button class="btn-ghost btn-sm btn">
                <Copy size={16} />
            </button>
            <button class="btn-ghost btn-sm btn">
                <Link size={16} />
            </button>
        </div>
    </div>
</div>