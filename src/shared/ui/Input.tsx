// src/components/atoms/Input.tsx

import React from 'react'

/**
 * Input - Glass-input Hedra-style з WOW-focus:
 * - Blur, прозорий, білий border
 * - Rounded-full
 * - focus:ring + border glow
 */
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
	className,
	...rest
}) => (
	<input
		className={`bg-white/10 border border-white/20 rounded-full px-6 py-3 text-white placeholder:text-neutral-300 outline-none backdrop-blur-xl shadow-lg focus:ring-2 focus:ring-cyan-400 focus:border-cyan-300 transition-all duration-200 font-sans ${
			className ?? ''
		}`}
		{...rest}
	/>
)
