import { AuthToken } from '@/features/auth/types/auth.types' // Enum/константи для назв токенів (наприклад, 'accessToken')
import Cookies from 'js-cookie' // Бібліотека для роботи з cookie у браузері

/**
 * Сервіс для роботи з accessToken у cookie.
 * Інкапсулює логіку збереження, отримання та видалення токена.
 */
class AuthTokenService {
	/**
	 * Отримати accessToken з cookie.
	 * @returns {string | null} - Значення токена або null, якщо токен не знайдено
	 */
	getAccessToken() {
		const accessToken = Cookies.get(AuthToken.ACCESS_TOKEN) // Читаємо токен з cookie за ключем
		return accessToken || null // Якщо токена немає — повертаємо null
	}

	/**
	 * Зберегти accessToken у cookie.
	 * @param {string} accessToken - Токен для збереження
	 * Встановлює cookie з такими параметрами:
	 * - domain: 'localhost' (тільки для локальної розробки, для продакшну треба змінити)
	 * - sameSite: 'strict' (тільки з того ж сайту)
	 * - expires: 1 (1 день)
	 */
	saveAccessToken(accessToken: string) {
		Cookies.set(AuthToken.ACCESS_TOKEN, accessToken, {
			domain: 'localhost', // Домен cookie (змінити для продакшну)
			sameSite: 'strict', // Безпечний режим (тільки з того ж сайту)
			expires: 1, // Термін дії — 1 день
		})
	}

	/**
	 * Видалити accessToken з cookie.
	 */
	removeAccessToken() {
		Cookies.remove(AuthToken.ACCESS_TOKEN)
	}
}

// Експортуємо синглтон сервісу для використання у всьому застосунку
export default new AuthTokenService()
