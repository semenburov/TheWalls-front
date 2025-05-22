import { Error } from '@shared/components/Error'
import { InputHTMLAttributes, forwardRef } from 'react'

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
	({ label, error, className = '', ...props }, ref) => (
		<div>
			{/* Якщо передано label — відображаємо підпис до поля */}
			{label && <label className='block text-gray-600'>{label}</label>}
			<input
				ref={ref} // Проброс ref для інтеграції з form-хуками
				className={`w-full bg-neutral-900 border border-neutral-700 text-white rounded-xl px-3 py-2 text-base outline-none focus:border-cyan-400 transition placeholder:text-neutral-400 ${
					className ?? ''
				}`}
				{...props} // Проброс усіх інших пропсів (type, value, onChange, required тощо)
			/>
			{/* Якщо є помилка — відображаємо компонент Error з текстом помилки */}
			{error && <Error error={error} />}
		</div>
	)
)

// Встановлюємо displayName для коректної роботи з React DevTools та forwardRef
AuthInput.displayName = 'Input'
