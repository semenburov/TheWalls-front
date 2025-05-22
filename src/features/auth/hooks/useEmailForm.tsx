import { useBaseMutation } from '@/shared/hooks/useBaseMutation' // Кастомний хук для роботи з асинхронними мутаціями (запитами)
import userService from '@features/auth/services/user.service' // Сервіс для роботи з користувачами (API-запити)

/**
 * Кастомний хук для логіки оновлення email користувача після соц-авторизації.
 * Інкапсулює мутацію (запит) на оновлення email та повертає стан завантаження.
 *
 * @returns {object} - updateEmail (функція для оновлення email), isLoading (стан завантаження)
 */
export function useEmailForm() {
	// Використовуємо useBaseMutation для створення мутації (оновлення email)
	const { mutate: updateEmail, isLoading } = useBaseMutation(
		userService.updateUserEmail, // Функція, яка виконує запит на оновлення email
		{
			mutationKey: ['update-email'], // Унікальний ключ для цієї мутації (для кешу/ідентифікації)
			successRedirect: '/', // Куди переходити після успішного оновлення email
			defaultErrorMsg: 'Помилка при оновленні email', // Повідомлення про помилку за замовчуванням
		}
	)
	// Повертаємо функцію для оновлення email та стан завантаження
	return { updateEmail, isLoading }
}
