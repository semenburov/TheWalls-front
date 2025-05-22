// src/shared/hooks/useApiErrorHandler.ts
import axios from 'axios'
import toast from 'react-hot-toast'

/**
 * ErrorInput — тип для обробки помилок:
 * - може бути будь-яким типом (unknown), рядком або Error-об'єктом.
 */
type ErrorInput = unknown | string

/**
 * useApiErrorHandler — хук для обробки помилок API з автоматичним показом toast-повідомлення.
 * Повертає функцію, яка приймає помилку (AxiosError, Error, string, unknown) і показує toast з текстом помилки.
 *
 * @param {string} [defaultMsg='Сталася помилка'] - Повідомлення за замовчуванням, якщо не вдалося визначити текст помилки
 * @returns {(error: ErrorInput) => void} - Функція-обробник помилки для використання у catch/mutation
 */
export function useApiErrorHandler(defaultMsg = 'Сталася помилка') {
	return (error: ErrorInput) => {
		let msg = defaultMsg // Початкове повідомлення

		// Якщо це AxiosError (помилка HTTP-запиту)
		if (axios.isAxiosError(error)) {
			// msg = повідомлення з відповіді бекенду, або стандартне повідомлення, або дефолтне
			msg = error.response?.data?.message || error.message || defaultMsg
		}
		// Якщо це просто рядок
		else if (typeof error === 'string') {
			msg = error
		}
		// Якщо це стандартний Error
		else if (error instanceof Error) {
			msg = error.message
		}
		// Показати toast з текстом помилки
		toast.error(msg)
	}
}
