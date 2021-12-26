<script lang="ts">
    import { Route, Router } from 'svelte-routing'
    import PrivateRoute      from './components/routing/private-route.svelte'
    import Bookings          from './components/bookings/booking.svelte'
    import Login             from './components/auth/login.svelte'

    export let url = ''
</script>

<style global lang="scss">
    @import "./globals";
</style>

<main class="w-screen h-screen overflow-hidden">
        <Router url="{url}">
            <div>
                <Route path="login">
                    <Login/>
                </Route>
                <PrivateRoute path="/">
                    <Bookings />
                </PrivateRoute>
            </div>
        </Router>
</main>
