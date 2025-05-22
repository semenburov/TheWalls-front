'use client' // Директива Next.js для client-side компонента

// Імпорти компонентів, хуків, типів та стилів
import { AuthWrapper } from '@/features/auth/components/AuthWrapper' // Обгортка для стилізації форми
import { AuthInput } from '@/features/auth/components/ui/AuthInput' // Кастомний інпут для форми
import { Button } from '@/features/auth/components/ui/Button' // Кастомна кнопка
import { Divider } from '@/features/auth/components/ui/Divider' // Роздільник між секціями
import { LogoSvg } from '@/shared/components/LogoSvg' // SVG-логотип
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha' // Google reCAPTCHA для захисту від ботів
import { useAuthForm } from '../hooks/useAuthForm' // Кастомний хук для логіки форми
import styles from '../styles/AuthForm.module.scss' // CSS-модуль для стилів
import { PasswordCheck } from '../types/passwordRule.type' // Тип для перевірки пароля
import { AuthToggle } from './ui/AuthToggle' // Перемикач між логіном і реєстрацією
import { SocialMediaButtons } from './ui/socials/SocialMediaButtons' // Кнопки соцмереж

/**
 * @typedef {Object} AuthFormProps
 * @property {boolean} isLogin - Визначає, чи це форма логіну (true) чи реєстрації (false)
 */
export interface AuthFormProps {
	isLogin: boolean // true — логін, false — реєстрація
}

/**
 * Компонент універсальної форми аутентифікації (логін/реєстрація)
 * @param {AuthFormProps} props - Пропси компонента
 * @returns {JSX.Element} - React-компонент
 */
export const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
	// Деструктуризація значень з кастомного хука для роботи з формою
	const {
		register, // Функція для реєстрації полів форми (react-hook-form)
		recaptchaRef, // Референс для ReCAPTCHA
		errors, // Об'єкт з помилками валідації
		onSubmit, // Обробник сабміту форми
		handleSubmit, // Функція-обгортка для сабміту (react-hook-form)
		isSubmitting, // Стан відправки форми
		passwordChecks, // Масив правил для перевірки пароля (тільки для реєстрації)
	} = useAuthForm({ isLogin })

	return (
		<AuthWrapper heading={isLogin ? '' : ''}>
			{/* Обгортка для стилізації */}
			<form
				className='rounded-2xl shadow-xl px-8 pt-8 pb-6 w-full max-w-md flex flex-col gap-5'
				onSubmit={handleSubmit(onSubmit)} // Сабміт форми через react-hook-form
			>
				<LogoSvg
					width={110}
					height={150}
					isCompanyName={true}
					isSlogan={isLogin} // Показувати слоган лише для логіну
				/>
				<h1 className='text-center text-3xl md:text-4xl font-serif font-medium mb-2 text-white'>
					{isLogin ? 'Sign In' : 'Create an Account'}{' '}
					{/* Динамічний заголовок */}
				</h1>
				<AuthInput
					type='email'
					placeholder='Enter email: '
					autoComplete='username'
					{...register('email', { required: true })} // Підключення поля до форми (react-hook-form)
					error={errors.email?.message} // Відображення помилки для email
					required
				/>
				<AuthInput
					type='password'
					placeholder='Password'
					autoComplete={isLogin ? 'current-password' : 'new-password'}
					{...register('password', { required: true })} // Підключення поля до форми
					//onChange={handleChange} // (опціонально) для кастомної логіки
					error={errors.password?.message} // Відображення помилки для пароля
					required
				/>
				{/* Поле підтвердження пароля тільки для реєстрації */}
				{!isLogin && (
					<AuthInput
						type='password'
						placeholder='Confirm password'
						autoComplete='new-password'
						{...register('confirm', { required: true })} // Підключення поля до форми
						//onChange={handleChange}
						error={errors.confirm?.message} // Відображення помилки для підтвердження пароля
						required
					/>
				)}
				{/* Відображення правил для пароля тільки при реєстрації */}
				{!isLogin && (
					<div className='flex flex-col gap-1 mb-1 mt-1'>
						{passwordChecks?.map((rule: PasswordCheck) => (
							<div
								key={rule.key}
								className='flex items-center gap-2 text-neutral-200 text-sm'
							>
								<span
									className={
										rule.checked ? 'text-green-500' : 'text-neutral-600'
									}
								>
									●
								</span>
								<span
									className={
										rule.checked ? 'text-green-400' : 'text-neutral-400'
									}
								>
									{rule.label}
								</span>
							</div>
						))}
					</div>
				)}
				{/* Посилання "Forgot password?" тільки для логіну */}
				{isLogin && (
					<div className='flex justify-end mb-2'>
						<a
							href='/forgot'
							className='text-neutral-400 hover:text-cyan-400 text-sm transition'
						>
							Forgot password?
						</a>
					</div>
				)}
				{/* Google reCAPTCHA для захисту від ботів */}
				<ReCAPTCHA
					ref={recaptchaRef}
					size='normal'
					sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
					theme='dark'
					className={styles['recaptcha']}
				/>
				<Button
					type='submit'
					variant='primary'
					className='mb-3'
					disabled={isSubmitting} // Деактивація кнопки під час сабміту
				>
					{isLogin ? 'Sign in with e-mail' : 'Create an account'}
				</Button>
				<Divider /> {/* Візуальний роздільник */}
				<SocialMediaButtons /> {/* Кнопки для входу через соцмережі */}
				<AuthToggle isLogin={isLogin} />{' '}
				{/* Перемикач між логіном і реєстрацією */}
			</form>
		</AuthWrapper>
	)
}
