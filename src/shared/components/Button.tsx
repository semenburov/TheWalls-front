// src/components/atoms/Button.tsx

import React from 'react'

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
 */
export const Button: React.FC<ButtonProps> = ({
	href,
	variant = 'primary',
	children,
	className,
	...rest
}) => {
	const base =
		'inline-block rounded-full px-10 py-5 text-lg font-semibold shadow-2xl border border-white/20 backdrop-blur-xl transition-all duration-200 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-cyan-400 font-sans'

	const variants = {
		primary:
			'bg-gradient-to-r from-white/30 via-cyan-100/20 to-white/40 text-blue-900 hover:bg-white/60 hover:shadow-blue-400/30 hover:scale-110 hover:border-cyan-300/60 active:scale-100',
		secondary:
			'bg-gradient-to-r from-blue-700/90 to-cyan-400/80 text-white hover:from-blue-800 hover:to-cyan-500 hover:shadow-blue-500/40 hover:scale-110 hover:border-cyan-400/60 active:scale-100',
	}
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
	return (
		<button
			className={`${base} ${variants[variant]} ${className ?? ''}`}
			{...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
		>
			{children}
		</button>
	)
}
