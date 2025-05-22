// src/components/atoms/Button.tsx

import React from 'react'

/**
 * Тип пропсів для компонента Button.
 * Дозволяє використовувати як <a> (з href), так і <button> (без href).
 * - variant: стиль кнопки ('primary' або 'secondary')
 * - children: контент кнопки
 * - className: додаткові класи Tailwind
 * - ...rest: всі стандартні HTML-пропси для <a> або <button>
 */
type ButtonProps =
	| ({
			href: string
			variant?: 'primary' | 'secondary'
			children: React.ReactNode
			className?: string
	  } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
	| ({
			href?: undefined
			variant?: 'primary' | 'secondary'
			children: React.ReactNode
			className?: string
	  } & React.ButtonHTMLAttributes<HTMLButtonElement>)

/**
 * Button — гігантська glass-кнопка Hedra-style із WOW-hover-ефектом, градієнтом та тінню.
 * - Hover: плавний scale, drop-shadow, підсвічування.
 * - Rounded-full, прозорий фон, wow-border.
 *
 * @param {ButtonProps} props - Пропси компонента (див. вище)
 * @returns {JSX.Element} - Кнопка або посилання з кастомним стилем
 */
export const Button: React.FC<ButtonProps> = ({
	href,
	variant = 'primary', // Стиль кнопки за замовчуванням
	children,
	className,
	...rest
}) => {
	const base =
		'inline-block rounded-full px-10 py-5 text-lg font-semibold shadow-2xl border border-white/20 backdrop-blur-xl transition-all duration-200 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-cyan-400 font-sans'
	// base — базові стилі: скруглення, padding, тінь, border, блюр, transition, адаптивність, шрифт

	const variants = {
		primary:
			'bg-gradient-to-r from-white/30 via-cyan-100/20 to-white/40 text-blue-900 hover:bg-white/60 hover:shadow-blue-400/30 hover:scale-110 hover:border-cyan-300/60 active:scale-100',
		// primary — світлий градієнт, синій текст, WOW-hover-ефекти (scale, тінь, підсвічування)
		secondary:
			'bg-gradient-to-r from-blue-700/90 to-cyan-400/80 text-white hover:from-blue-800 hover:to-cyan-500 hover:shadow-blue-500/40 hover:scale-110 hover:border-cyan-400/60 active:scale-100',
		// secondary — темний градієнт, білий текст, WOW-hover-ефекти
	}

	// Якщо передано href — рендеримо <a> з відповідними пропсами та стилями
	if (href) {
		return (
			<a
				href={href}
				className={`${base} ${variants[variant]} ${className ?? ''}`}
				{...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
			>
				{children}
			</a>
		)
	}
	// Інакше — рендеримо <button> з відповідними пропсами та стилями
	return (
		<button
			className={`${base} ${variants[variant]} ${className ?? ''}`}
			{...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{children}
		</button>
	)
}
