// src/app/auth/AuthPage.tsx
import { AuthForm } from './AuthForm'
import { AuthPageWrapper } from './AuthPageWrapper'

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
		<AuthPageWrapper heading={isLogin ? '' : ''}>
			<AuthForm isLogin={isLogin} />
		</AuthPageWrapper>
	)
}
