import { Error } from '@shared/components/Error'
import { InputHTMLAttributes, forwardRef, useState } from 'react'

/**
 * @typedef {Object} InputProps
 * @property {string} [label] - Підпис до поля (необов'язково)
 * @property {string} [error] - Текст помилки (необов'язково)
 * Інші властивості наслідуються від стандартного input (InputHTMLAttributes<HTMLInputElement>)
 */
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string // Підпис до поля (label)
	error?: string // Текст помилки для відображення під полем
}

/**
 * Універсальний інпут з підтримкою помилок (error)
 * forwardRef дозволяє пробросити ref до DOM-елемента <input>
 *
 * @param {InputProps} props - Пропси інпута (label, error, стандартні атрибути input)
 * @param {React.Ref<HTMLInputElement>} ref - ref для доступу до DOM-елемента ззовні
 */
export const AuthInput = forwardRef<HTMLInputElement, InputProps>(
	({ label, error, className = '', type, ...props }, ref) => {
		const [showPassword, setShowPassword] = useState(false)
		const isPassword = type === 'password'

		const inputType = isPassword && showPassword ? 'text' : type

		return (
			<div className='relative w-full'>
				{/* Якщо передано label — відображаємо підпис до поля */}
				{label && <label className='block text-gray-600'>{label}</label>}
				<input
					ref={ref} // Проброс ref для інтеграції з form-хуками
					type={inputType} // Використовуємо динамічний тип для пароля
					className={`w-full bg-neutral-900 border border-neutral-700 text-white rounded-xl px-3 py-2 text-base outline-none focus:border-cyan-400 transition placeholder:text-neutral-400 ${
						className ?? ''
					}`}
					{...props} // Проброс усіх інших пропсів (type, value, onChange, required тощо)
				/>
				{/* Кнопка для показу/приховування пароля */}
				{isPassword && (
					<button
						type='button'
						className='absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-cyan-400 transition'
						onClick={() => setShowPassword(prev => !prev)}
						tabIndex={-1}
						aria-label={showPassword ? 'Приховати пароль' : 'Показати пароль'}
					>
						{showPassword ? (
							// "Око відкрите" (SVG)
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='22'
								height='22'
								fill='none'
								viewBox='0 0 24 24'
							>
								<path
									stroke='currentColor'
									strokeWidth='2'
									d='M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z'
								/>
								<circle
									cx='12'
									cy='12'
									r='3'
									stroke='currentColor'
									strokeWidth='2'
								/>
							</svg>
						) : (
							// "Око закрите" (SVG)
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='22'
								height='22'
								fill='none'
								viewBox='0 0 24 24'
							>
								<path
									stroke='currentColor'
									strokeWidth='2'
									d='M1 12s4-7 11-7 11 7 11 7M1 12s4 7 11 7 11-7 11-7M4.5 4.5l15 15'
								/>
							</svg>
						)}
					</button>
				)}
				{/* Якщо є помилка — відображаємо компонент Error з текстом помилки */}
				{error && <Error error={error} />}
			</div>
		)
	}
)

// Встановлюємо displayName для коректної роботи з React DevTools та forwardRef
AuthInput.displayName = 'Input'
