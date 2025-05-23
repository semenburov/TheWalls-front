// 'use server'

// import { type NextRequest, NextResponse } from 'next/server'

// import { ADMIN_PAGES } from '@/config/pages/admin.config' // Константи з маршрутами для адміністратора
// import { getTokensFromRequest } from '../../features/auth/utils/get-tokens-from-request' // Функція для отримання токенів з куків запиту
// import { jwtVerifyServer } from '../../features/auth/utils/jwt-verify' // Функція для серверної верифікації JWT
// import { redirectToLoginOrNotFound } from './utils/redirect-to-login-or-404' // Утиліта для редіректу на логін або 404

// /**
//  * protectAdminPages — middleware для захисту адміністративних сторінок.
//  * Перевіряє наявність і валідність токенів, права користувача, і виконує редірект при відсутності доступу.
//  *
//  * @param {NextRequest} request - Поточний серверний запит Next.js
//  * @returns {Promise<NextResponse>} - Дозвіл на доступ або редірект
//  */
// export async function protectAdminPages(request: NextRequest) {
// 	const tokens = await getTokensFromRequest(request) // Отримуємо accessToken і refreshToken з куків
// 	if (!tokens) return redirectToLoginOrNotFound(request) // Якщо токенів немає — редірект

// 	const verifiedData = await jwtVerifyServer(tokens.accessToken) // Верифікуємо accessToken (перевірка підпису, терміну дії, payload)
// 	if (!verifiedData) return redirectToLoginOrNotFound(request) // Якщо токен невалідний — редірект

// 	const pathname = request.nextUrl.pathname // Поточний шлях (route) з URL

// 	// Доступ лише для адміністраторів на сторінках ADMIN_PAGES.HOME
// 	if (pathname.startsWith(ADMIN_PAGES.HOME) && !verifiedData?.isAdmin)
// 		return redirectToLoginOrNotFound(request)

// 	// Доступ для менеджерів або адміністраторів на сторінках ADMIN_PAGES.MANAGER
// 	if (
// 		pathname.startsWith(ADMIN_PAGES.MANAGER) &&
// 		!verifiedData?.isManager &&
// 		!verifiedData?.isAdmin
// 	) {
// 		return redirectToLoginOrNotFound(request)
// 	}

// 	// Доступ для преміум-користувачів або адміністраторів на сторінках ADMIN_PAGES.PREMIUM
// 	if (
// 		pathname.startsWith(ADMIN_PAGES.PREMIUM) &&
// 		!verifiedData?.isPremium &&
// 		!verifiedData?.isAdmin
// 	) {
// 		return redirectToLoginOrNotFound(request)
// 	}

// 	// Доступ лише для залогінених користувачів на ADMIN_PAGES.MAIN
// 	if (pathname.startsWith(ADMIN_PAGES.MAIN) && !verifiedData?.isLoggedIn) {
// 		return redirectToLoginOrNotFound(request)
// 	}

// 	return NextResponse.next() // Дозволяємо доступ, якщо всі перевірки пройдено
// }
