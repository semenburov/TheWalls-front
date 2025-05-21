import { InputHTMLAttributes, forwardRef } from 'react'
/**
 * @typedef {Object} InputProps
 * @property {string} [error] - текст помилки
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	error?: string
}

/**
 * Універсальний інпут з підтримкою помилок (error)
 * @param {InputProps} props
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ error, className = '', ...props }, ref) => (
		<div>
			<input
				ref={ref}
				className={`w-full bg-neutral-900 border border-neutral-700 text-white rounded-xl px-3 py-2 text-base outline-none focus:border-cyan-400 transition placeholder:text-neutral-400 ${
					className ?? ''
				}`}
				{...props}
			/>
			{error && <div className='text-pink-500 text-xs mt-1'>{error}</div>}
		</div>
	)
)
Input.displayName = 'Input'
