<script lang="ts">
    import {navigate}    from "svelte-routing";
    import { userStore } from '../users/store/user-store'

    $: if (!$userStore.loggedIn) {
        setTimeout(() => navigate('login', { replace: true }), 500);
    }
</script>

{#if $userStore.loggedIn}
    <slot />
{/if}
