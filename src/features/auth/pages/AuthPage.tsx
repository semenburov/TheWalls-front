// src/app/auth/AuthPage.tsx
import { AuthWrapper } from '@/features/auth/components/AuthWrapper'
import { AuthForm } from '../components/AuthForm'

interface Props {
	isLogin: boolean
}
/**
 * Компонент для відображення сторінки авторизації/реєстрації
 * @param {boolean} isLogin - Чи це сторінка логіну
 * @returns {JSX.Element}
 */
/**
 * Відображає сторінку авторизації/реєстрації у спільному лейауті
 */
export function AuthPage({ isLogin }: Props) {
	return (
		<AuthWrapper heading={isLogin ? '' : ''}>
			<AuthForm isLogin={isLogin} />
		</AuthWrapper>
	)
}
