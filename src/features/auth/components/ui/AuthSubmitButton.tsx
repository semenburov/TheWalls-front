import { MiniLoader } from '@/shared/components/MiniLoader' // Компонент-лоадер для індикатора завантаження
import styles from '@features/auth/styles/AuthForm.module.scss' // CSS-модуль для стилів кнопки
import React from 'react'
import { twMerge } from 'tailwind-merge' // Утиліта для об'єднання Tailwind CSS класів

/**
 * AuthSubmitButton — універсальна кнопка для сабміту форм аутентифікації.
 * Відображає індикатор завантаження під час виконання запиту.
 *
 * @param {object} props
 * @param {boolean} [props.isLoading] - Чи йде зараз завантаження (деактивує кнопку та показує лоадер)
 * @param {string} props.label - Текст кнопки
 */
export const AuthSubmitButton: React.FC<{
	isLoading?: boolean // Стан завантаження (опціонально)
	label: string // Текст кнопки
}> = ({ isLoading, label }) => (
	<button
		type='submit' // Кнопка для сабміту форми
		className={twMerge(
			styles['btn-primary'], // Основний стиль з CSS-модуля
			'bg-primary', // Додатковий клас Tailwind для фону
			isLoading && 'opacity-75 cursor-not-allowed' // Стилі для стану loading
		)}
		disabled={isLoading} // Деактивація кнопки під час завантаження
	>
		{isLoading ? <MiniLoader /> : label} {/* Показати лоадер або текст */}
	</button>
)
