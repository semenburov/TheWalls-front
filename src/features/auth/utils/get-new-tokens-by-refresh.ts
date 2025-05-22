'use server' // Директива Next.js: функція виконується лише на сервері (Server Actions)

/**
 * Імпорт константи з базовою адресою API.
 */
import { API_URL } from '@/constants'

/**
 * Імпорт типу користувача для типізації відповіді.
 */
import { IUser } from '@shared/types/user.types'

/**
 * IAuthResponse — інтерфейс відповіді від бекенду при оновленні токенів.
 * @property {IUser} user - Дані користувача
 * @property {string} accessToken - Новий accessToken
 */
interface IAuthResponse {
	user: IUser
	accessToken: string
}

/**
 * Асинхронна функція для отримання нових accessToken по refreshToken.
 * Використовується для автоматичного оновлення сесії користувача.
 *
 * @param {string} refreshToken - Refresh токен користувача (з cookie або локального сховища)
 * @returns {Promise<IAuthResponse>} - Новий accessToken та дані користувача
 * @throws {Error} - Якщо запит не вдався
 */
export async function getNewTokensByRefresh(refreshToken: string) {
	const response = await fetch(`${API_URL}/auth/access-token`, {
		method: 'POST', // POST-запит для оновлення токену
		headers: {
			'Content-Type': 'application/json', // Вказуємо тип контенту
			Cookie: `refreshToken=${refreshToken}`, // Передаємо refreshToken через cookie (для бекенду)
		},
		credentials: 'include', // Додаємо credentials для передачі cookie
	})

	// Якщо відповідь не успішна — кидаємо помилку
	if (!response.ok) {
		throw new Error('Failed to fetch new tokens')
	}

	// Парсимо відповідь як IAuthResponse (user + accessToken)
	const data: IAuthResponse = await response.json()
	return data
}
