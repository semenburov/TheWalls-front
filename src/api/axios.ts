import { API_URL } from '@/constants' // Базова адреса API
import authTokenService from '@/features/auth/services/auth-token.service' // Сервіс для роботи з токенами
import authService from '@/features/auth/services/auth.service' // Сервіс для авторизації (оновлення токенів)
import axios, { CreateAxiosDefaults } from 'axios' // Основна бібліотека axios та типи
import { errorCatch, getContentType } from './api.helper' // Хелпери для обробки помилок і заголовків

// Об'єкт з налаштуваннями для створення інстансів axios
const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL, // Базова адреса для всіх запитів
	headers: getContentType(), // Заголовок Content-Type: application/json
	withCredentials: true, // Додавати cookie до запитів (для роботи з сесіями)
}

// Класичний інстанс axios без інтерцепторів (для простих запитів)
export const axiosClassic = axios.create(axiosOptions)

// Основний інстанс axios з інтерцепторами (для авторизованих запитів)
export const instance = axios.create(axiosOptions)

// Інтерцептор запиту: додає токен авторизації до кожного запиту, якщо він є
instance.interceptors.request.use(config => {
	const accessToken = authTokenService.getAccessToken() // Отримати accessToken з localStorage/cookie

	if (config?.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}` // Додаємо заголовок Authorization
	}

	return config // Повертаємо змінений конфіг
})

// Інтерцептор відповіді: обробляє помилки авторизації (401, прострочений JWT)
instance.interceptors.response.use(
	config => config, // Якщо відповідь успішна — повертаємо як є
	async error => {
		const originalRequest = error.config // Зберігаємо оригінальний запит

		// Якщо помилка 401 або JWT прострочений, і це не повторний запит
		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry // Щоб уникнути нескінченних циклів
		) {
			originalRequest._isRetry = true // Позначаємо, що це повторна спроба

			try {
				await authService.getNewTokens() // Оновлюємо токени через refresh token
				return instance.request(originalRequest) // Повторюємо оригінальний запит
			} catch (error) {
				// Якщо refresh token теж невалідний — видаляємо accessToken
				if (
					errorCatch(error) === 'jwt expired' ||
					errorCatch(error) === 'Refresh token not passed'
				) {
					authTokenService.removeAccessToken()
				}
			}
		}

		throw error // Якщо не вдалося — пробросити помилку далі
	}
)
