// src/components/molecules/AuthToggle.tsx
import Link from 'next/link'

/**
 * @typedef {Object} AuthToggleProps
 * @property {boolean} isLogin - Чи це сторінка логіну
 */
export interface AuthToggleProps {
	isLogin: boolean
}

/**
 * Компонент-перемикач між логіном і реєстрацією
 * @param {AuthToggleProps} props
 * @returns {JSX.Element}
 */
export const AuthToggle: React.FC<AuthToggleProps> = ({ isLogin }) => (
	<div className='text-center text-sm mt-6'>
		{isLogin ? (
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
