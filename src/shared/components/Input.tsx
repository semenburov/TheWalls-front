// src/components/atoms/Input.tsx

import React from 'react'

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string
}

export const Input: React.FC<CustomInputProps> = ({
	label,
	className,
	id,
	...rest
}) => {
	const inputId = id || React.useId()
	return (
		<div className='flex flex-col gap-2 w-full'>
			{label && (
				<label
					htmlFor={inputId}
					className='text-white text-sm px-2 font-semibold'
				>
					{label}
				</label>
			)}
			<input
				id={inputId}
				className={`
            bg-white/10
            border border-white/20
            rounded-full
            px-6 py-3
            text-white
            placeholder:text-neutral-300
            outline-none
            backdrop-blur-xl
            shadow-lg
            focus:ring-2 focus:ring-cyan-400
            focus:border-cyan-300
            transition-all duration-200
            font-sans
            ${className ?? ''}
        `}
				{...rest}
			/>
		</div>
	)
}
