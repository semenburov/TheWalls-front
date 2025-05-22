'use server'

import { type NextRequest, NextResponse } from 'next/server'

import { PUBLIC_PAGES } from '@/config/pages/public.config' // Константи з публічними маршрутами (наприклад, сторінка тарифів)
import { getTokensFromRequest } from '../../features/auth/utils/get-tokens-from-request' // Функція для отримання токенів з куків запиту
import { jwtVerifyServer } from '../../features/auth/utils/jwt-verify' // Функція для серверної верифікації JWT
import { redirectToLoginOrNotFound } from './utils/redirect-to-login-or-404' // Утиліта для редіректу на логін або 404

/**
 * protectPremiumPages — middleware для захисту преміум-сторінок.
 * Дозволяє доступ лише користувачам з правами isPremium або isAdmin.
 * Якщо токени відсутні, невалідні або користувач не має прав — редіректить на сторінку тарифів або логін/404.
 *
 * @param {NextRequest} request - Поточний серверний запит Next.js
 * @returns {Promise<NextResponse>} - Дозвіл на доступ або редірект
 */
export async function protectPremiumPages(request: NextRequest) {
	const tokens = await getTokensFromRequest(request) // Отримуємо accessToken і refreshToken з куків
	if (!tokens) return redirectToLoginOrNotFound(request) // Якщо токенів немає — редірект

	const verifiedData = await jwtVerifyServer(tokens.accessToken) // Верифікуємо accessToken (перевірка підпису, терміну дії, payload)
	if (!verifiedData) return redirectToLoginOrNotFound(request) // Якщо токен невалідний — редірект

	// Дозволяємо доступ лише якщо користувач isPremium або isAdmin
	// Якщо НЕ isAdmin ІЛИ НЕ isPremium — редірект на сторінку тарифів
	if (!verifiedData?.isAdmin && !verifiedData?.isPremium) {
		return NextResponse.redirect(new URL(PUBLIC_PAGES.PLANS, request.url))
	}

	return NextResponse.next() // Дозволяємо доступ, якщо всі перевірки пройдено
}
