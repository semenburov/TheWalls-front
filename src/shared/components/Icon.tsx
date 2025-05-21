// src/components/atoms/Icon.tsx

import React from 'react'

export const Icon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<span className='inline-block text-5xl md:text-6xl drop-shadow-[0_8px_24px_rgba(52,170,255,0.35)] transition-transform duration-200 hover:scale-110 hover:drop-shadow-[0_12px_36px_rgba(52,170,255,0.45)]'>
		{children}
	</span>
)
