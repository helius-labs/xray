<script>
    import {
        QrCode,
        Copy,
        Link,
        Home,
        Receipt,
        Gem,
        Coins,
    } from "lucide-svelte";

    import { page } from "$app/stores";
</script>

<div class="account-nav my-5 flex flex-wrap items-center justify-between">
    <div class="relative flex">
        <div>
            <button class="btn-ghost btn mr-2 h-full p-0">
                <QrCode size={38} />
            </button>
        </div>
        <div>
            <div class="flex">
                <h2 class="m-0 mr-2 text-2xl font-bold">Account</h2>
                <div class="flex">
                    <button class="btn-ghost btn-sm btn">
                        <Copy size={16} />
                    </button>
                    <button class="btn-ghost btn-sm btn">
                        <Link size={16} />
                    </button>
                </div>
            </div>
            <p class="text-sm opacity-50">
                {$page.params.account}
            </p>
        </div>
    </div>
    <div>
        {#each [{ icon: Home, label: "" }, { icon: Gem, label: "Assets" }, { icon: Coins, label: "Tokens" }, { icon: Receipt, label: "Transactions" }] as { label, icon }}
            <button class="btn-outline btn-sm btn md:ml-1">
                <svelte:component
                    this={icon}
                    size={16}
                />
                <span>
                    {label}
                </span>
            </button>
        {/each}
    </div>
</div>
