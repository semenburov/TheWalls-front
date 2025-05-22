// This file defines the types used for password rules in the authentication feature of the application.

/**
 * PasswordRule — тип для одного правила перевірки пароля.
 * Використовується для формування списку правил (checklist) при реєстрації.
 *
 * @property {string} key - Унікальний ключ правила (наприклад, 'minLength')
 * @property {string} label - Текстове пояснення правила (наприклад, 'Мінімум 8 символів')
 * @property {(value: string) => boolean} check - Функція, яка перевіряє, чи виконується правило для переданого пароля
 */
export type PasswordRule = {
	key: string // Унікальний ідентифікатор правила (для рендеру списку)
	label: string // Опис правила для відображення користувачу
	check: (value: string) => boolean // Функція-перевірка: повертає true, якщо правило виконано
}

/**
 * PasswordCheck — тип для результату перевірки одного правила пароля.
 * Використовується для відображення статусу виконання кожного правила у UI.
 *
 * @property {string} key - Унікальний ключ правила
 * @property {string} label - Опис правила
 * @property {boolean} checked - Чи виконано це правило для поточного пароля
 */
export type PasswordCheck = {
	key: string // Унікальний ідентифікатор правила
	label: string // Опис правила
	checked: boolean // Чи виконано це правило (true/false)
}
