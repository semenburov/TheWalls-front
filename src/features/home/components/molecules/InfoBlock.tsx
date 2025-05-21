import React from 'react'

export const InfoBlock: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<div className='bg-blue-800/60 rounded-2xl p-6 text-white text-center shadow-2xl backdrop-blur-xl border border-blue-300/20 transition-all duration-200 hover:scale-105 hover:bg-blue-800/80 font-sans'>
		{children}
	</div>
)
