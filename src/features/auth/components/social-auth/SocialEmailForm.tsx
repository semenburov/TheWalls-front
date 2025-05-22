'use client' // Директива Next.js: компонент рендериться лише на клієнті

import { AuthInput } from '@/features/auth/components/ui/AuthInput' // Кастомний інпут для email
import { AuthWrapper } from '@features/auth/components/AuthWrapper' // Обгортка для стилізації форми
import styles from '@features/auth/styles/AuthForm.module.scss' // CSS-модуль для стилів форми
import { useState, type FormEvent } from 'react' // useState для локального стану, FormEvent для типізації події форми
import { useEmailForm } from '../../hooks/useEmailForm' // Кастомний хук для логіки оновлення email
import { AuthSubmitButton } from '../ui/AuthSubmitButton' // Кастомна кнопка сабміту з індикатором завантаження

/**
 * SocialEmailForm — форма для введення email після авторизації через соцмережу,
 * якщо соцмережа не повернула email користувача.
 */
export default function SocialEmailForm() {
	const [email, setEmail] = useState('') // Локальний стан для email, який вводить користувач

	const { updateEmail, isLoading } = useEmailForm() // updateEmail — функція для відправки email на сервер, isLoading — стан завантаження

	/**
	 * Обробник сабміту форми.
	 * @param {FormEvent} e - Подія сабміту форми
	 */
	const handleSubmit = (e: FormEvent) => {
		e.preventDefault() // Забороняємо стандартну поведінку форми (перезавантаження сторінки)
		updateEmail(email) // Викликаємо функцію для оновлення email (API-запит)
	}

	return (
		<AuthWrapper heading={'Provide Your Email'}>
			{' '}
			{/* Обгортка з заголовком */}
			<form onSubmit={handleSubmit} className='space-y-4'>
				<AuthInput
					label='Email' // Підпис до поля
					type='email' // Тип поля
					value={email} // Поточне значення email
					placeholder='Enter email: ' // Плейсхолдер
					onChange={e => setEmail(e.target.value)} // Оновлення стану при зміні значення
					required // Поле обов'язкове для заповнення
					className={styles['input-field']} // Клас для стилізації
				/>
				<AuthSubmitButton isLoading={isLoading} label='Submit' />{' '}
				{/* Кнопка сабміту з індикатором */}
			</form>
		</AuthWrapper>
	)
}
