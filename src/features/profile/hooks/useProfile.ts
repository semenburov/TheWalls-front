import authService from '@/features/auth/services/auth.service' // Сервіс для роботи з авторизацією (оновлення токенів)
import { transformUserToState } from '@/shared/utils/transform-user-to-state' // Функція для приведення користувача до потрібного формату стейту
import profileService from '@features/profile/services/profile.service' // Сервіс для роботи з користувачами (отримання профілю)
import { useQuery } from '@tanstack/react-query' // Хук для роботи з асинхронними даними (React Query)

/**
 * useProfile — кастомний хук для отримання та оновлення профілю користувача.
 * Використовує React Query для кешування, автоматичного оновлення та повторного отримання даних.
 *
 * @returns {{
 *   isLoading: boolean,      // Чи вантажиться профіль
 *   refetch: Function,       // Функція для ручного оновлення профілю
 *   error: any,              // Помилка при отриманні профілю (якщо є)
 *   user: object             // Дані користувача (оригінальні + трансформовані)
 * }}
 */
export function useProfile() {
	// Основний запит: отримання профілю користувача
	const { data, isLoading, error } = useQuery({
		queryKey: ['profile'], // Ключ для кешу профілю
		retry: false, // Не повторювати запит при помилці

		queryFn: () => profileService.getProfile(), // Функція-запит до API
		refetchInterval: 1800000, // Оновлювати профіль кожні 30 хвилин (мс)
	})

	// Додатковий запит: отримання нових токенів, якщо профілю немає (наприклад, токен прострочений)
	const {
		isSuccess,
		data: dataTokens,
		refetch,
	} = useQuery({
		queryKey: ['new tokens'], // Ключ для кешу токенів
		queryFn: () => authService.getNewTokens(), // Функція-запит до API для оновлення токенів
		enabled: !data?.data, // Виконувати тільки якщо профіль ще не отримано
	})

	const profile = data?.data // Дані профілю з відповіді API

	//const userState = profile ? transformUserToState(profile) : null // Трансформуємо профіль у потрібний формат для стейту

	return {
		isLoading, // Стан завантаження профілю
		refetch, // Функція для ручного оновлення профілю
		error, // Помилка при отриманні профілю
		user: {
			...profile, // Оригінальні дані користувача з бекенду
			//...userState, // Додаткові поля (наприклад, ролі, id) з payload токена
		},
	}
}
