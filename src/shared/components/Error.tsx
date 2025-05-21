import React from 'react'

export const Error: React.FC<{ error?: string }> = ({ error }) =>
	error ? <div className='text-red-500 text-sm mb-2'>{error}</div> : null
