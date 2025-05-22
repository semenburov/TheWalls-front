import React from 'react'

/**
 * Error — простий компонент для відображення тексту помилки.
 * Відображає повідомлення про помилку червоним кольором, якщо error передано.
 *
 * @param {object} props - Пропси компонента
 * @param {string} [props.error] - Текст помилки для відображення (необов'язковий)
 * @returns {JSX.Element | null} - Блок з текстом помилки або null, якщо помилки немає
 */
export const Error: React.FC<{ error?: string }> = ({ error }) =>
	error ? (
		<div className='text-red-500 text-sm mb-2'>
			{error} {/* Відображення тексту помилки */}
		</div>
	) : null // Якщо помилки немає — нічого не рендеримо
