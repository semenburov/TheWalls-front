// src/app/auth/AuthPage.tsx
// Імпорт компонента-обгортки для сторінки аутентифікації (центрування, фон, заголовок)
import { AuthWrapper } from '@/features/auth/components/AuthWrapper'
// Імпорт універсальної форми логіну/реєстрації
import { AuthForm } from '../components/AuthForm'

/**
 * Тип пропсів для компонента AuthPage.
 * @property {boolean} isLogin - Вказує, чи це сторінка логіну (true) чи реєстрації (false)
 */
interface Props {
	isLogin: boolean // true — логін, false — реєстрація
}

/**
 * Компонент для відображення сторінки авторизації/реєстрації.
 * Обгортає форму у спільний лейаут (AuthWrapper).
 *
 * @param {Props} props - Пропси компонента (isLogin)
 * @returns {JSX.Element} - React-компонент сторінки
 */
export function AuthPage({ isLogin }: Props) {
	return (
		<AuthWrapper heading={isLogin ? '' : ''}>
			{/* heading — заголовок сторінки (можна передати "Sign In" або "Create an Account" для кращої UX) */}
			<AuthForm isLogin={isLogin} /> {/* Основна форма логіну/реєстрації */}
		</AuthWrapper>
	)
}
