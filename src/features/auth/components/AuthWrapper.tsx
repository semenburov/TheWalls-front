import { ReactNode } from 'react'

/**
 * @typedef {Object} Props
 * @property {ReactNode} children - Вміст, який буде відображено всередині обгортки (форма, кнопки тощо)
 * @property {string} heading - Заголовок, який буде показано над формою
 */
interface Props {
	children: ReactNode // Дочірні елементи (контент форми)
	heading: string // Заголовок для секції (наприклад, "Sign In" або "Create an Account")
}

/**
 * AuthWrapper — універсальна обгортка для сторінок аутентифікації.
 * Відповідає за центрування контенту, фон, відступи, тінь та заголовок.
 *
 * @param {Props} props - Пропси компонента (heading, children)
 * @returns {JSX.Element} - React-компонент-обгортка
 */
export function AuthWrapper({ children, heading }: Props) {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			{/* Центрує контент по вертикалі та горизонталі на всю висоту екрану */}
			<div className='bg-gradient-to-br from-[#101021] via-[#0f1116] to-[#090d14] p-5 rounded-lg shadow-md w-full max-w-md'>
				{/* Фон: градієнт, padding, закруглення, тінь, максимальна ширина */}
				<h2 className='font-semibold mb-4 text-center text-2xl text-white'>
					{heading} {/* Динамічний заголовок (може бути порожнім) */}
				</h2>
				{children} {/* Основний контент (форма, кнопки тощо) */}
			</div>
		</div>
	)
}
