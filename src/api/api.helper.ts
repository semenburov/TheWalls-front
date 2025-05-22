/**
 * Функція для отримання стандартного заголовка Content-Type для JSON-запитів.
 * @returns {Object} Об'єкт із заголовком Content-Type: application/json
 */
export const getContentType = () => ({
	'Content-Type': 'application/json',
})

/**
 * Функція для обробки помилок HTTP-запитів (наприклад, з axios).
 * Повертає текстове повідомлення про помилку для відображення користувачу.
 *
 * @param {any} error - Об'єкт помилки (зазвичай з axios)
 * @returns {string} - Текст повідомлення про помилку
 *
 * Логіка:
 * - Якщо error.response.data.message існує:
 *    - Якщо це масив (object), повертає перший елемент (message[0])
 *    - Якщо це рядок, повертає його напряму
 * - Якщо message не знайдено, повертає error.message (стандартне повідомлення)
 */
export const errorCatch = (error: any): string => {
	const message = error?.response?.data?.message

	return message
		? typeof error.response.data.message === 'object'
			? message[0]
			: message
		: error.message
}
