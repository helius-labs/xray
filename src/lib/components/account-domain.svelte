<script lang="ts">
    import Username from "$lib/components/providers/username-provider.svelte";
    import shortenString from "$lib/util/shorten-string";

    export let address: string = "";
</script>

<Username
    {address}
    let:usernames
    let:usernameIsLoading
>
    {#if !usernameIsLoading && usernames.length}
        {usernames[0].username}
    {:else}
        {shortenString(address)}
    {/if}
</Username>
