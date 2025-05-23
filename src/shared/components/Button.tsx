// src/components/atoms/Button.tsx
import React from 'react'

type ButtonProps =
	| ({
			href: string
			variant?: 'primary' | 'secondary' | 'outline'
			size?: 'sm' | 'md' | 'lg'
			loading?: boolean
			children: React.ReactNode
			className?: string
	  } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
	| ({
			href?: undefined
			variant?: 'primary' | 'secondary' | 'outline'
			size?: 'sm' | 'md' | 'lg'
			loading?: boolean
			children: React.ReactNode
			className?: string
	  } & React.ButtonHTMLAttributes<HTMLButtonElement>)

function isAnchor(
	props: ButtonProps
): props is Extract<ButtonProps, { href: string }> {
	return typeof (props as any).href === 'string'
}

export const Button: React.FC<ButtonProps> = props => {
	const {
		variant = 'primary',
		size = 'md',
		loading = false,
		children,
		className,
		...rest
	} = props

	const base =
		'inline-block rounded-full font-semibold shadow-2xl border border-white/20 backdrop-blur-xl transition-all duration-200 disabled:opacity-60 focus-visible:ring-2 focus-visible:ring-cyan-400 font-sans'
	const variants = {
		primary:
			'bg-gradient-to-r from-white/30 via-cyan-100/20 to-white/40 text-blue-900 hover:bg-white/60 hover:shadow-blue-400/30 hover:scale-110 hover:border-cyan-300/60 active:scale-100',
		secondary:
			'bg-gradient-to-r from-blue-700/90 to-cyan-400/80 text-white hover:from-blue-800 hover:to-cyan-500 hover:shadow-blue-500/40 hover:scale-110 hover:border-cyan-400/60 active:scale-100',
		outline:
			'bg-transparent border-2 border-cyan-400 text-cyan-800 hover:bg-cyan-50 hover:text-cyan-900 hover:scale-110 active:scale-100',
	}
	const sizes = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-8 py-3 text-base',
		lg: 'px-10 py-5 text-lg',
	}
	const style = `${base} ${variants[variant]} ${sizes[size]} ${className ?? ''}`

	const content = loading ? (
		<span className='flex items-center justify-center gap-2'>
			<span className='inline-block animate-spin text-xl'>⏳</span>
			<span>Завантаження…</span>
		</span>
	) : (
		props.children
	)

	if (isAnchor(props)) {
		const { href, ...anchorRest } =
			rest as React.AnchorHTMLAttributes<HTMLAnchorElement>
		return (
			<a
				href={href}
				className={style + (loading ? ' pointer-events-none opacity-60' : '')}
				aria-disabled={loading}
				tabIndex={loading ? -1 : undefined}
				{...anchorRest}
			>
				{content}
			</a>
		)
	} else {
		const buttonRest = rest as React.ButtonHTMLAttributes<HTMLButtonElement>
		return (
			<button
				className={style}
				disabled={loading || buttonRest.disabled}
				{...buttonRest}
			>
				{content}
			</button>
		)
	}
}
