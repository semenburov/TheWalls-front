import { axiosClassic } from '@/api/axios' // Інстанс axios для HTTP-запитів
import { IFormData } from '@/features/auth/types/auth.types' // Тип даних для форми логіну/реєстрації
import { IUser } from '@shared/types/user.types' // Тип користувача
import authTokenService from './auth-token.service' // Сервіс для роботи з accessToken

/**
 * Інтерфейс відповіді від бекенду при логіні/реєстрації.
 * @property {IUser} user - Дані користувача
 * @property {string} accessToken - Access токен для авторизації
 */
interface IAuthResponse {
	user: IUser
	accessToken: string
}

/**
 * Сервіс для роботи з авторизацією користувача.
 * Містить методи для логіну, реєстрації, оновлення токену та логауту.
 */
class AuthService {
	/**
	 * Основний метод для логіну або реєстрації.
	 * Відправляє POST-запит на /auth/login або /auth/register.
	 *
	 * @param {'login' | 'register'} type - Тип операції (логін або реєстрація)
	 * @param {IFormData} data - Дані форми (email, password, тощо)
	 * @param {string | null} [recaptchaToken] - Токен Google reCAPTCHA (опціонально)
	 * @returns {Promise<AxiosResponse<IAuthResponse>>} - Відповідь від сервера
	 */
	async main(
		type: 'login' | 'register',
		data: IFormData,
		recaptchaToken?: string | null
	) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`, // Динамічний endpoint: /auth/login або /auth/register
			data,
			{
				headers: {
					recaptcha: recaptchaToken, // Додаємо токен reCAPTCHA у заголовки (якщо є)
				},
			}
		)

		// Якщо у відповіді є accessToken — зберігаємо його у cookie
		if (response.data.accessToken) {
			authTokenService.saveAccessToken(response.data.accessToken)
		}

		return response
	}

	/**
	 * Оновлення accessToken через refresh token.
	 * Викликається при простроченому токені (401).
	 * @returns {Promise<AxiosResponse<IAuthResponse>>} - Відповідь з новим accessToken
	 */
	async getNewTokens() {
		const response = await axiosClassic.post<IAuthResponse>(
			'/auth/access-token'
		)

		// Якщо отримали новий accessToken — зберігаємо його
		if (response.data.accessToken)
			authTokenService.saveAccessToken(response.data.accessToken)

		return response
	}

	/**
	 * Логаут користувача (видалення accessToken).
	 * @returns {Promise<AxiosResponse<boolean>>} - Відповідь з результатом логауту
	 */
	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout')

		// Якщо логаут успішний — видаляємо accessToken з cookie
		if (response.data) authTokenService.removeAccessToken()

		return response
	}
}

// Експортуємо синглтон сервісу для використання у всьому застосунку
export default new AuthService()
