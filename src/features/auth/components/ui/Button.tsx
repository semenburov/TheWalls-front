import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: 'primary' | 'secondary'
}

export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	className,
	...rest
}) => {
	const base =
		'w-full rounded-xl py-2 px-3 font-semibold transition text-base focus:ring-2 focus:ring-cyan-400'
	const variants = {
		primary: 'bg-neutral-100 text-black hover:bg-white',
		secondary:
			'bg-transparent border border-neutral-600 text-white hover:bg-neutral-800',
	}
	return (
		<button
			className={`${base} ${variants[variant]} ${className ?? ''}`}
			{...rest}
		/>
	)
}
