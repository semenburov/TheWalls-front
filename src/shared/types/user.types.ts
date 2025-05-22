import { UserRole } from '@features/auth/types/auth.types' // Імпорт типу ролей користувача (наприклад, 'admin', 'user', 'premium')

/**
 * IUser — основний тип (інтерфейс) користувача у системі.
 * Визначає структуру об'єкта користувача, який повертається з бекенду та використовується у фронтенді.
 *
 * @property {number} id — Унікальний числовий ідентифікатор користувача
 * @property {string} [name] — Ім'я користувача (необов'язкове)
 * @property {string} email — Email користувача (унікальний, обов'язковий)
 * @property {string} [avatarPath] — Шлях до аватарки користувача (необов'язковий)
 * @property {string} [verificationToken] — Токен для підтвердження email (якщо не підтверджено)
 * @property {UserRole[]} rights — Масив ролей/прав користувача (наприклад, ['admin', 'user'])
 */
export interface IUser {
	id: number // Унікальний ID користувача
	name?: string // Ім'я (може бути відсутнє)
	email: string // Email (обов'язковий)
	avatarPath?: string // Шлях до аватарки (може бути відсутній)
	verificationToken?: string // Токен для підтвердження email (якщо не підтверджено)
	rights: UserRole[] // Масив ролей/прав (наприклад, ['admin', 'user'])
}
