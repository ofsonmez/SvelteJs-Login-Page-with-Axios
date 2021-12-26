import type { User } from '../../users/models/user'

export type AuthResponse = {
    token: string,
    user: User
}
