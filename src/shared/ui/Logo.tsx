// src/components/atoms/Logo.tsx

import React from 'react'

/**
 * Logo - Hedra-style градієнтний wow-логотип.
 * - Gradient text
 * - Drop-shadow
 */
export const Logo: React.FC<{ className?: string }> = ({ className }) => (
	<span
		className={`font-black text-4xl md:text-5xl bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg tracking-tight font-sans ${
			className ?? ''
		}`}
	>
		TheWalls Online
	</span>
)
