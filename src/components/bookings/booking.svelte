<script lang="ts">
import { userStore } from "../users/store/user-store";
    function signout() {
        userStore.set({loggedIn: false});
    }
</script>

<div class="flex h-screen">
  <div class="m-auto">
    <h1 class="font-bold text-xl">Welcome to bookings...</h1>
    <button on:click|once={signout} class="bg-blue-500 text-white hover:bg-blue-400 font-bold text-lg p-2 mt-5">Sign Out</button>
  </div>
</div>