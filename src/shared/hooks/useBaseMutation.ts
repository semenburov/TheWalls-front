import { useApiErrorHandler } from '@/shared/hooks/useApiErrorHandler'
import {
	useMutation,
	UseMutationOptions,
	UseMutationResult,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'

// Додаємо onSuccess, onError у тип
/**
 * BaseMutationOptions — розширений тип опцій для useBaseMutation.
 * - successRedirect: шлях для редіректу після успіху (опціонально)
 * - defaultErrorMsg: дефолтне повідомлення про помилку для toast
 * - onSuccess: колбек після успішної мутації
 * - onError: колбек після помилки
 * Наслідує всі стандартні опції useMutation, крім onError/onSuccess (які перевизначаємо).
 */
type BaseMutationOptions<TData, TVariables, TError> = Omit<
	UseMutationOptions<TData, TError, TVariables, unknown>,
	'onError' | 'onSuccess'
> & {
	successRedirect?: string
	defaultErrorMsg?: string
	onSuccess?: (...args: any[]) => void
	onError?: (error: TError) => void
}

/**
 * useBaseMutation — кастомний хук для мутацій (POST/PUT/DELETE) з обробкою помилок, редіректом та анімацією переходу.
 * Інкапсулює useMutation з React Query, додає toast-помилки, редірект після успіху, зручний прапорець isLoading.
 *
 * @template TData - Тип даних, які повертає мутація
 * @template TVariables - Тип змінних для мутації
 * @template TError - Тип помилки
 *
 * @param mutationFn - Функція, яка виконує мутацію (API-запит)
 * @param options - Додаткові опції (див. BaseMutationOptions)
 * @returns {object} - Всі поля useMutation + isLoading (pending або запит)
 */
export function useBaseMutation<TData = any, TVariables = any, TError = any>(
	mutationFn: (vars: TVariables) => Promise<TData>,
	options: BaseMutationOptions<TData, TVariables, TError> = {}
): UseMutationResult<TData, TError, TVariables, unknown> & {
	isLoading: boolean
} {
	const router = useRouter() // Для редіректу після успіху
	const [isPending, startTransition] = useTransition() // Для анімації переходу (React 18+)
	const handleApiError = useApiErrorHandler(options.defaultErrorMsg) // Функція для toast-помилок

	const mutation = useMutation<TData, TError, TVariables>({
		...options, // Передаємо всі інші опції (наприклад, cacheTime, retry)
		mutationFn, // Основна функція мутації (API-запит)
		onError: error => {
			handleApiError(error) // Показати toast з помилкою
			options.onError?.(error) // Викликати додатковий onError, якщо передано
		},
		onSuccess: (...args) => {
			if (options.successRedirect) {
				startTransition(() => {
					router.push(options.successRedirect!) // Редірект після успіху (з анімацією)
				})
			}
			options.onSuccess?.(...args) // Викликати додатковий onSuccess, якщо передано
		},
	})

	const isLoading = isPending || mutation.isPending // Прапорець завантаження (pending transition або запит)

	return { ...mutation, isLoading } // Повертаємо всі поля useMutation + isLoading
}
