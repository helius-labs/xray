<script lang="ts">
    import { QrCode, Copy, Link } from "lucide-svelte";

    import { page } from "$app/stores";

    import { onMount } from "svelte";
    import shortenString from "$lib/util/shorten-string";

    let qrElement: HTMLCanvasElement;
    let qrModal: HTMLDialogElement;
</script>

<div class="account-nav my-2 rounded-xl p-4">
    <!-- <h2 class="font-semibold text-xl">Account</h2> -->
    <div class="flex items-center justify-between">
        <div class="flex items-center">
            <div
                class="badge-outline badge border-green-400 text-xs font-bold text-green-400 opacity-80"
            >
                ACCOUNT
            </div>

            <p class="ml-3 text-xs opacity-80">
                {shortenString($page.params.account)}
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
