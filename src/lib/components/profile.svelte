<script lang="ts">
    export let profileName: string;
    import { page } from "$app/stores";
    import { trpcWithQuery } from "$lib/trpc/client";
    const client = trpcWithQuery($page);

    const profile = client.profileFromDomainName.createQuery(profileName);
</script>

<div>
    profile: {$profile.data}
</div>
