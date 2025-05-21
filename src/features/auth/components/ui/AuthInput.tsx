import { InputHTMLAttributes, forwardRef } from 'react'
import { Error } from '@shared/components/Error'
/**
 * @typedef {Object} InputProps
 * @property {string} [error] - текст помилки
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string
	error?: string
}

/**
 * Універсальний інпут з підтримкою помилок (error)
 * @param {InputProps} props
 */
export const AuthInput = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, className = '', ...props }, ref) => (
		<div>
			{label && <label className='block text-gray-600'>{label}</label>}
			<input
				ref={ref}
				className={`w-full bg-neutral-900 border border-neutral-700 text-white rounded-xl px-3 py-2 text-base outline-none focus:border-cyan-400 transition placeholder:text-neutral-400 ${
					className ?? ''
				}`}
				{...props}
			/>
			{error && <Error error={error} />}
		</div>
	)
)
AuthInput.displayName = 'Input'
