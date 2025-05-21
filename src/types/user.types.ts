import { UserRole } from '../features/auth/types/auth.types'

export interface IUser {
	id: number
	name?: string
	email: string
	avatarPath?: string
	verificationToken?: string
	rights: UserRole[]
}
