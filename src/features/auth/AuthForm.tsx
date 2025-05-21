'use client'
// src/components/organisms/AuthForm.tsx
import { Button } from '@/features/auth/components/ui/Button'
import { Divider } from '@/features/auth/components/ui/Divider'
import { Input } from '@/features/auth/components/ui/Input'
import { LogoSvg } from '@/shared/ui/LogoSvg'
import React from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import styles from './AuthForm.module.scss'
import { AuthToggle } from './AuthToggle'
import { SocialMediaButtons } from './components/ui/socials/SocialMediaButtons'
import { PasswordCheck, useAuthForm } from './hooks/useAuthForm'
/**
 * @typedef {Object} AuthFormProps
 * @property {boolean} isLogin - Визначає, чи це форма логіну (true) чи реєстрації (false)
 */
export interface AuthFormProps {
	isLogin: boolean
}
/**
 * Компонент універсальної форми аутентифікації (логін/реєстрація)
 * @param {AuthFormProps} props
 * @returns {JSX.Element}
 */
export const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
	const {
		register,
		recaptchaRef,
		errors,
		onSubmit,
		handleSubmit,
		isSubmitting,
		passwordChecks,
		handleChange,
	} = useAuthForm({ isLogin })

	return (
		<form
			className='rounded-2xl shadow-xl px-8 pt-8 pb-6 w-full max-w-md flex flex-col gap-5'
			onSubmit={handleSubmit(onSubmit)}
		>
			<LogoSvg
				width={110}
				height={150}
				isCompanyName={true}
				isSlogan={isLogin}
			/>
			<h1 className='text-center text-3xl md:text-4xl font-serif font-medium mb-2 text-white'>
				{isLogin ? 'Sign In' : 'Create an Account'}
			</h1>
			<Input
				type='email'
				placeholder='Enter email: '
				autoComplete='username'
				{...register('email', { required: true })}
				error={errors.email}
				required
			/>
			<Input
				type='password'
				placeholder='Password'
				autoComplete={isLogin ? 'current-password' : 'new-password'}
				{...register('password', { required: true })}
				onChange={handleChange}
				error={errors.password}
				required
			/>
			{!isLogin && (
				<Input
					type='password'
					placeholder='Confirm password'
					autoComplete='new-password'
					{...register('confirm', { required: true })}
					onChange={handleChange}
					error={errors.confirm}
					required
				/>
			)}

			{/* Password rules for registration */}
			{!isLogin && (
				<div className='flex flex-col gap-1 mb-1 mt-1'>
					{passwordChecks?.map((rule: PasswordCheck) => (
						<div
							key={rule.key}
							className='flex items-center gap-2 text-neutral-200 text-sm'
						>
							<span
								className={rule.checked ? 'text-green-500' : 'text-neutral-600'}
							>
								●
							</span>
							<span
								className={rule.checked ? 'text-green-400' : 'text-neutral-400'}
							>
								{rule.label}
							</span>
						</div>
					))}
				</div>
			)}

			{/* Forgot password only for login */}
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
			<ReCAPTCHA
				ref={recaptchaRef}
				size='normal'
				sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
				theme='light'
				className={styles['recaptcha']}
			/>
			<Button
				type='submit'
				variant='primary'
				className='mb-3'
				disabled={isSubmitting}
			>
				{isLogin ? 'Sign in with e-mail' : 'Create an account'}
			</Button>
			<Divider />
			<SocialMediaButtons />
			<AuthToggle isLogin={isLogin} />
		</form>
	)
}
