//path @/features/auth/hooks/useAuthForm.ts
// Імпорт React-хуків, роутера, form-хука, кастомної мутації, сервісу авторизації та утиліт для пароля
import { PasswordCheck } from '@/features/auth/types/passwordRule.type' // Тип для одного правила пароля
import { useBaseMutation } from '@/shared/hooks/useBaseMutation'
import {
	getPasswordChecks, // Функція для отримання масиву правил для пароля (checklist)
	validatePassword, // Функція для валідації пароля (повертає текст помилки або null)
} from '@/shared/utils/password.rules'
import authService from '@features/auth/services/auth.service'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'

// Тип для значень форми аутентифікації
type AuthFormValues = {
	email: string // Email користувача
	password: string // Пароль користувача
	confirm?: string // Підтвердження пароля (тільки для реєстрації)
}

/**
 * Кастомний хук для логіки форми логіну/реєстрації.
 * Інкапсулює роботу з react-hook-form, перевірку пароля, інтеграцію з reCAPTCHA, сабміт та мутацію.
 *
 * @param {object} params
 * @param {boolean} params.isLogin - Чи це форма логіну (true) чи реєстрації (false)
 * @returns {object} - Методи та стани для роботи з формою
 */
export function useAuthForm({ isLogin }: { isLogin: boolean }) {
	const router = useRouter() // Хук для навігації (можна використати для редіректу після успіху)
	const recaptchaRef = useRef<any>(null) // Референс для роботи з Google reCAPTCHA

	// 1. Ініціалізація форми через react-hook-form
	const {
		register, // Функція для реєстрації полів у формі
		handleSubmit, // Обгортка для сабміту (викликає onSubmit)
		formState: { errors, isSubmitting }, // Об'єкт з помилками та станом сабміту
		setError, // Функція для ручного встановлення помилки
		clearErrors, // Функція для очищення помилок
		watch, // Функція для відстеження значень полів у реальному часі
	} = useForm<AuthFormValues>({
		mode: 'onChange', // Валідація на кожну зміну
		defaultValues: {
			email: '',
			password: '',
			confirm: '',
		},
	})

	// 2. Для password checklist (тільки для реєстрації)
	const password = watch('password') || '' // Поточне значення пароля
	const passwordChecks: PasswordCheck[] = !isLogin
		? getPasswordChecks(password) // Масив правил для пароля (checklist)
		: []

	// 3. Мутація для логіну/реєстрації (через кастомний useBaseMutation)
	const { mutate: authMutate, isLoading } = useBaseMutation(
		(data: {
			email: string
			password: string
			recaptchaToken?: string | null
		}) =>
			authService.main(
				isLogin ? 'login' : 'register', // Вибір ендпоінта
				data,
				data.recaptchaToken
			),
		{
			mutationKey: [isLogin ? 'login' : 'register'], // Ключ для кешу/ідентифікації мутації
			defaultErrorMsg: isLogin
				? 'Помилка авторизації'
				: 'Помилка при реєстрації',
			successRedirect: '/', // Куди редіректити після успіху
		}
	)

	// 4. Сабміт форми (логіка для логіну/реєстрації)
	const onSubmit = async (data: AuthFormValues) => {
		clearErrors() // Очищаємо попередні помилки
		if (!isLogin) {
			const passwordError = validatePassword(data.password) // Перевірка пароля по правилах
			if (passwordError) {
				setError('password', { message: passwordError }) // Встановлюємо помилку для пароля
				return
			}
			if (data.password !== data.confirm) {
				setError('confirm', { message: 'Паролі не співпадають' }) // Помилка, якщо паролі не співпадають
				return
			}
		}

		// Отримуємо токен з reCAPTCHA (якщо використовується)
		const recaptchaToken = recaptchaRef.current?.getValue() || null

		// Викликаємо мутацію (логін/реєстрація)
		authMutate(
			{ email: data.email, password: data.password, recaptchaToken },
			{
				onSettled: () => {
					// Можна додати reset, clear, тощо (опціонально)
				},
			}
		)
	}

	// 5. Додатковий хендлер для onChange (наприклад, для підсвічування checklist)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const field = e.target.name as keyof AuthFormValues
		const value = e.target.value
		// Можна додати додаткову логіку для live-перевірки
	}

	// 6. Повертаємо всі необхідні методи та стани для використання у формі
	return {
		register, // Для підключення інпутів до форми
		handleSubmit, // Для обгортки сабміту
		errors, // Об'єкт з помилками
		isSubmitting: isSubmitting || isLoading, // Стан сабміту (з урахуванням мутації)
		onSubmit, // Обробник сабміту
		recaptchaRef, // Реф для reCAPTCHA
		passwordChecks, // Масив правил для checklist (тільки для реєстрації)
	}
}
