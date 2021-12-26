import { writable }          from 'svelte/store';
import type { AuthResponse } from '../models/auth.response'

export type UserStore = AuthResponse & {
    loggedIn?: boolean,
}
const STORE_KEY = 'user-store'

const persisted = localStorage.getItem(STORE_KEY)
export const userStore = writable<UserStore>(persisted ? JSON.parse(persisted) : {user: undefined, loggedIn: false, token: ''} )

userStore.subscribe(store => store ? localStorage.setItem(STORE_KEY, JSON.stringify(store)) : undefined)