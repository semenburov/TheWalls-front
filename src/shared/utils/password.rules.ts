// src/shared/utils/password.rules.ts
import {
	PasswordCheck,
	PasswordRule,
} from '@/features/auth/types/passwordRule.type' // Тип для результату перевірки правила (key, label, checked)

/**
 * passwordRules — масив правил для перевірки пароля.
 * Кожне правило містить:
 * - key: унікальний ключ правила
 * - label: опис правила (для відображення користувачу)
 * - check: функція, яка приймає пароль і повертає true/false (чи виконується правило)
 */
export const passwordRules: PasswordRule[] = [
	{
		key: 'lower', // Мінімум 1 літера у нижньому регістрі
		label: 'Contains at least 1 lowercase letter',
		check: v => /[a-z]/.test(v),
	},
	{
		key: 'upper', // Мінімум 1 літера у верхньому регістрі
		label: 'Contains at least 1 uppercase letter',
		check: v => /[A-Z]/.test(v),
	},
	{
		key: 'number', // Мінімум 1 цифра
		label: 'Contains at least 1 number',
		check: v => /\d/.test(v),
	},
	{
		key: 'special', // Мінімум 1 спецсимвол
		label: 'Contains at least 1 special character',
		check: v => /[^A-Za-z0-9]/.test(v),
	},
	{
		key: 'length', // Мінімум 8 символів
		label: 'Is at least 8 characters long',
		check: v => v.length >= 8,
	},
]

/**
 * getPasswordChecks — перевіряє пароль по всіх правилах.
 * Повертає масив об'єктів з ключем, описом і прапорцем виконання.
 *
 * @param {string} password - Пароль для перевірки
 * @returns {PasswordCheck[]} - Масив результатів перевірки кожного правила
 */
export function getPasswordChecks(password: string): PasswordCheck[] {
	console.log('getPasswordChecks', password)
	// Перевіряємо, чи пароль відповідає всім правилам
	return passwordRules.map(rule => ({
		key: rule.key, // Ключ правила
		label: rule.label, // Опис правила
		checked: rule.check(password || ''), // Чи виконується правило для цього пароля
	}))
}

/**
 * validatePassword — перевіряє пароль по всіх правилах і повертає першу помилку.
 * Якщо всі правила виконані — повертає порожній рядок.
 *
 * @param {string} password - Пароль для перевірки
 * @returns {string} - Текст першої помилки або порожній рядок, якщо всі правила виконані
 */
export function validatePassword(password: string): string {
	for (const rule of passwordRules) {
		if (!rule.check(password)) return `Пароль: ${rule.label}` // Повертає опис першого невиконаного правила
	}
	return ''
}
