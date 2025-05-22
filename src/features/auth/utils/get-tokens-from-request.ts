import { AuthToken } from '@/features/auth/types/auth.types' // Константи для назв токенів (access/refresh)
import { NextRequest } from 'next/server' // Тип запиту Next.js (Edge/Server Middleware)
import { getNewTokensByRefresh } from './get-new-tokens-by-refresh' // Функція для оновлення accessToken через refreshToken

/**
 * Асинхронна функція для отримання accessToken і refreshToken з куків запиту.
 * Якщо accessToken відсутній, але є refreshToken — намагається оновити accessToken.
 * Якщо refreshToken відсутній або невалідний — видаляє accessToken і повертає null.
 *
 * @param {NextRequest} request - Запит Next.js (містить куки)
 * @returns {Promise<{ accessToken: string, refreshToken: string } | null>} - Об'єкт з токенами або null
 */
export async function getTokensFromRequest(request: NextRequest) {
	const refreshToken = request.cookies.get(AuthToken.REFRESH_TOKEN)?.value // Отримуємо refreshToken з куків
	let accessToken = request.cookies.get(AuthToken.ACCESS_TOKEN)?.value // Отримуємо accessToken з куків

	// Якщо refreshToken відсутній — видаляємо accessToken і повертаємо null (немає сесії)
	if (!refreshToken) {
		request.cookies.delete(AuthToken.ACCESS_TOKEN)
		return null
	}

	// Якщо accessToken відсутній — пробуємо оновити через refreshToken
	if (!accessToken) {
		try {
			const data = await getNewTokensByRefresh(refreshToken) // Отримуємо новий accessToken з бекенду
			accessToken = data.accessToken
		} catch (error) {
			// Якщо помилка — перевіряємо, чи це невалідний токен
			if (error instanceof Error) {
				if (error.message === 'invalid token') {
					console.log('не валидный токен')
					request.cookies.delete(AuthToken.ACCESS_TOKEN)
					return null
				}
			}
			return null // Інші помилки — повертаємо null
		}
	}

	// Повертаємо об'єкт з accessToken та refreshToken (обидва гарантовано є)
	return { accessToken, refreshToken }
}
