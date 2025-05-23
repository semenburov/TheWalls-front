// 'use server'

// import { type NextRequest, NextResponse } from 'next/server'

// import { getTokensFromRequest } from '../../features/auth/utils/get-tokens-from-request' // Функція для отримання токенів з куків запиту
// import { jwtVerifyServer } from '../../features/auth/utils/jwt-verify' // Функція для серверної верифікації JWT
// import { redirectToLoginOrNotFound } from './utils/redirect-to-login-or-404' // Утиліта для редіректу на логін або 404

// /**
//  * protectDashboardPages — middleware для захисту сторінок дашборду.
//  * Перевіряє наявність і валідність токенів користувача.
//  * Якщо токени відсутні або невалідні — редіректить на логін або 404.
//  *
//  * @param {NextRequest} request - Поточний серверний запит Next.js
//  * @returns {Promise<NextResponse>} - Дозвіл на доступ або редірект
//  */
// export async function protectDashboardPages(request: NextRequest) {
// 	const tokens = await getTokensFromRequest(request) // Отримуємо accessToken і refreshToken з куків
// 	if (!tokens) return redirectToLoginOrNotFound(request) // Якщо токенів немає — редірект

// 	const verifiedData = await jwtVerifyServer(tokens.accessToken) // Верифікуємо accessToken (перевірка підпису, терміну дії, payload)
// 	if (!verifiedData) return redirectToLoginOrNotFound(request) // Якщо токен невалідний — редірект

// 	return NextResponse.next() // Дозволяємо доступ, якщо всі перевірки пройдено
// }
