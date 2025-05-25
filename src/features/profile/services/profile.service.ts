import { instance } from '@/api/axios' // Інстанс axios з інтерцепторами для авторизованих запитів
import { IUserProfile } from '@features/profile/types/profile.types' // Тип користувача

/**
 * Сервіс для роботи з користувачами.
 * Містить методи для отримання профілю, преміум-контенту, контенту менеджера, списку користувачів, оновлення email та логауту.
 */
class UserProfileService {
	private _BASE_URL = '/profile' // Базовий шлях для всіх user-запитів

	/**
	 * Отримати профіль поточного користувача.
	 * @returns {Promise<AxiosResponse<IUserProfile>>} - Дані профілю користувача
	 */
	async getProfile() {
		return instance.get<IUserProfile>('/users/profile')
	}
}

// Експортуємо синглтон сервісу для використання у всьому застосунку
export default new UserProfileService()
