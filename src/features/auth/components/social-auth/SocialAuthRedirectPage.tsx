'use client' // Директива Next.js: компонент рендериться лише на клієнті

import { PUBLIC_PAGES } from '@/config/pages/public.config' // Константи з публічними шляхами (наприклад, головна сторінка)
import authTokenService from '@/features/auth/services/auth-token.service' // Сервіс для роботи з токенами (збереження/видалення)
import { AuthToken } from '@/features/auth/types/auth.types' // Enum/константи для назв токенів у query-параметрах
import { MiniLoader } from '@/shared/components/MiniLoader' // Компонент-лоадер для індикатора завантаження
import { useRouter, useSearchParams } from 'next/navigation' // Хуки Next.js для роботи з роутингом і query-параметрами
import { useEffect } from 'react'
import SocialEmailForm from './SocialEmailForm' // Форма для введення email, якщо соцмережа його не повернула

/**
 * Компонент SocialAuthRedirectPage:
 * Використовується як сторінка-редірект після авторизації через соцмережу.
 * Обробляє query-параметри, зберігає accessToken, перенаправляє користувача або показує форму для email.
 */
export function SocialAuthRedirectPage() {
	const searchParams = useSearchParams() // Отримання query-параметрів з URL
	const needEmail = searchParams.get('needEmail') // Чи потрібно ввести email (соцмережа не повернула email)

	const router = useRouter() // Хук для навігації (редіректів)

	useEffect(() => {
		const accessToken = searchParams.get(AuthToken.ACCESS_TOKEN) // Отримати accessToken з query-параметрів
		if (accessToken) authTokenService.saveAccessToken(accessToken) // Зберегти токен у localStorage/cookie

		// Якщо не потрібно вводити email — редірект на головну сторінку
		if (!needEmail) router.replace(PUBLIC_PAGES.HOME)
	}, [])

	// Якщо потрібно ввести email — показати відповідну форму
	if (needEmail) {
		return <SocialEmailForm />
	}

	// Якщо йде редірект або обробка — показати лоадер
	return (
		<div className='flex items-center justify-center h-screen'>
			<MiniLoader width={150} height={150} />
		</div>
	)
}
