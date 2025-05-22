import { instance } from '@/api/axios' // Інстанс axios з інтерцепторами для авторизованих запитів
import { IUser } from '@shared/types/user.types' // Тип користувача
import authTokenService from './auth-token.service' // Сервіс для роботи з accessToken

/**
 * Сервіс для роботи з користувачами.
 * Містить методи для отримання профілю, преміум-контенту, контенту менеджера, списку користувачів, оновлення email та логауту.
 */
class UserService {
	private _BASE_URL = '/users' // Базовий шлях для всіх user-запитів

	/**
	 * Отримати профіль поточного користувача.
	 * @returns {Promise<AxiosResponse<IUser>>} - Дані профілю користувача
	 */
	async fetchProfile() {
		return instance.get<IUser>(`${this._BASE_URL}/profile`)
	}

	/**
	 * Отримати преміум-контент для користувача.
	 * @returns {Promise<AxiosResponse<{ text: string }>>} - Текст преміум-контенту
	 */
	async fetchPremium() {
		return instance.get<{ text: string }>(`${this._BASE_URL}/premium`)
	}

	/**
	 * Отримати контент для менеджера.
	 * @returns {Promise<AxiosResponse<{ text: string }>>} - Текст для менеджера
	 */
	async fetchManagerContent() {
		return instance.get<{ text: string }>(`${this._BASE_URL}/manager`)
	}

	/**
	 * Отримати список всіх користувачів (для адмін-панелі).
	 * @returns {Promise<AxiosResponse<IUser[]>>} - Масив користувачів
	 */
	async fetchList() {
		return instance.get<IUser[]>(`${this._BASE_URL}/list`)
	}

	/**
	 * Оновити email користувача (наприклад, після соц-авторизації).
	 * @param {string} email - Новий email користувача
	 * @returns {Promise<AxiosResponse<any>>} - Відповідь сервера
	 */
	async updateUserEmail(email: string) {
		return instance.patch(`${this._BASE_URL}/update-email`, { email })
	}

	/**
	 * Логаут користувача (видалення accessToken).
	 * @returns {Promise<AxiosResponse<boolean>>} - Відповідь з результатом логауту
	 */
	async logout() {
		const response = await instance.post<boolean>('/auth/logout')

		// Якщо логаут успішний — видаляємо accessToken з cookie
		if (response.data) authTokenService.removeAccessToken()

		return response
	}
}

// Експортуємо синглтон сервісу для використання у всьому застосунку
export default new UserService()
