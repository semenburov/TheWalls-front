import React from 'react'

/**
 * @typedef {Object} ButtonProps
 * @property {'primary' | 'secondary'} [variant] - Візуальний стиль кнопки (за замовчуванням 'primary')
 * Інші властивості наслідуються від стандартного <button> (ButtonHTMLAttributes)
 */
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary' // Тип кнопки: primary (основна) або secondary (додаткова)
}

/**
 * Універсальна кнопка з підтримкою двох стилів (primary/secondary).
 * Приймає всі стандартні пропси <button> + variant та className.
 *
 * @param {ButtonProps} props - Пропси кнопки
 * @returns {JSX.Element} - React-компонент кнопки
 */
export const Button: React.FC<ButtonProps> = ({
	variant = 'primary', // Стиль кнопки за замовчуванням
	className, // Додаткові класи для стилізації
	...rest // Інші пропси (onClick, type, disabled тощо)
}) => {
	const base =
		'w-full rounded-xl py-2 px-3 font-semibold transition text-base focus:ring-2 focus:ring-cyan-400' // Базові стилі для всіх кнопок

	const variants = {
		primary: 'bg-neutral-100 text-black hover:bg-white', // Стиль для primary-кнопки
		secondary:
			'bg-transparent border border-neutral-600 text-white hover:bg-neutral-800', // Стиль для secondary-кнопки
	}

	return (
		<button
			className={`${base} ${variants[variant]} ${className ?? ''}`} // Об'єднання базових, варіативних і додаткових класів
			{...rest} // Проброс усіх інших пропсів (onClick, type, disabled тощо)
		/>
	)
}
