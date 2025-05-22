// src/components/molecules/AuthToggle.tsx
import Link from 'next/link'
import { JSX } from 'react'

/**
 * @typedef {Object} AuthToggleProps
 * @property {boolean} isLogin - Чи це сторінка логіну (true) або реєстрації (false)
 */
export interface AuthToggleProps {
	isLogin: boolean // Вказує, чи зараз відображається форма логіну
}

/**
 * Компонент-перемикач між логіном і реєстрацією.
 * В залежності від isLogin показує відповідний текст і посилання.
 *
 * @param {AuthToggleProps} props - Пропси компонента
 * @returns {JSX.Element} - React-компонент
 */
export const AuthToggle: React.FC<AuthToggleProps> = ({
	isLogin,
}: AuthToggleProps): JSX.Element => (
	<div className='text-center text-sm mt-6'>
		{isLogin ? (
			// Якщо це сторінка логіну — пропонуємо перейти на реєстрацію
			<>
				<span className='text-neutral-400'>Don't have an account?</span>
				<Link
					href='/auth/register'
					className='ml-2 text-pink-500 font-semibold hover:underline'
				>
					Sign up now
				</Link>
			</>
		) : (
			// Якщо це сторінка реєстрації — пропонуємо перейти на логін
			<>
				<span className='text-neutral-400'>Already have an account?</span>
				<Link
					href='/auth/login'
					className='ml-2 text-pink-500 font-semibold hover:underline'
				>
					Sign in now
				</Link>
			</>
		)}
	</div>
)
