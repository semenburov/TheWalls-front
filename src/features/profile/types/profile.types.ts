export interface IUserProfile {
	id: string
	email: string
	name: string
	roles: string[] // ['ADMIN', 'USER', ...]
	societies: {
		id: string
		name: string
		role: string // 'MANAGER', 'ADMIN', 'USER'
	}[]
	// Додай інші потрібні поля, які повертає бекенд
}
