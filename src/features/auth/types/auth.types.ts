import { IUser } from '@shared/types/user.types'

// Почему ENUM именно так (7:16) - https://www.youtube.com/watch?v=XdhhCIIksPw

/**
 * AuthToken — перелік ключів для токенів авторизації.
 * Використовується для роботи з access/refresh токенами у cookie, localStorage тощо.
 */
export const AuthToken = {
	ACCESS_TOKEN: 'accessToken', // Ключ для accessToken
	REFRESH_TOKEN: 'refreshToken', // Ключ для refreshToken
} as const

/**
 * Тип, який дозволяє використовувати лише значення з AuthToken.
 * Наприклад: 'accessToken' | 'refreshToken'
 */
export type AuthToken = (typeof AuthToken)[keyof typeof AuthToken]

/**
 * UserRole — перелік ролей користувача.
 * Використовується для контролю доступу, авторизації, відображення UI.
 */
export const UserRole = {
	USER: 'USER', // Звичайний користувач
	PREMIUM: 'PREMIUM', // Користувач з преміум-доступом
	MANAGER: 'MANAGER', // Менеджер (може мати додаткові права)
	ADMIN: 'ADMIN', // Адміністратор
} as const

/**
 * Тип, який дозволяє використовувати лише значення з UserRole.
 * Наприклад: 'USER' | 'PREMIUM' | 'MANAGER' | 'ADMIN'
 */
export type UserRole = (typeof UserRole)[keyof typeof UserRole]

/**
 * ITokenInside — структура даних, які містяться всередині JWT-токена.
 * @property {number} id - ID користувача
 * @property {UserRole[]} rights - Масив ролей користувача
 * @property {number} iat - Час створення токена (issued at)
 * @property {number} exp - Час закінчення дії токена (expiration)
 */
export interface ITokenInside {
	id: number
	rights: UserRole[]
	iat: number
	exp: number
}

/**
 * TProtectUserData — тип для захищених даних користувача (без iat та exp).
 * Використовується для передачі даних користувача без метаданих токена.
 */
export type TProtectUserData = Omit<ITokenInside, 'iat' | 'exp'>

/**
 * IFormData — тип для даних форми логіну/реєстрації.
 * Наслідує email з IUser, додає password, confirm (опціонально) та recaptchaToken (опціонально).
 * @property {string} email - Email користувача
 * @property {string} password - Пароль
 * @property {string} [confirm] - Підтвердження пароля (тільки для реєстрації)
 * @property {string | null} [recaptchaToken] - Токен Google reCAPTCHA (опціонально)
 */
export interface IFormData extends Pick<IUser, 'email'> {
	password: string
	confirm?: string // ← Зробити опціональним
	recaptchaToken?: string | null
}
