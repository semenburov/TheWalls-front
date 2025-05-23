// 'use server'

// import { type NextRequest, NextResponse } from 'next/server'

// import { DASHBOARD_PAGES } from '@/config/pages/dashboard.config' // Константи з маршрутами дашборду користувача
// import { getTokensFromRequest } from '../../features/auth/utils/get-tokens-from-request' // Функція для отримання токенів з куків запиту
// import { jwtVerifyServer } from '../../features/auth/utils/jwt-verify' // Функція для серверної верифікації JWT
// import { nextRedirect } from './utils/next-redirect' // Утиліта для формування редіректу

// /**
//  * protectLoginPages — middleware для захисту сторінок логіну/реєстрації.
//  * Якщо користувач вже авторизований (має валідний токен), редіректить його на профіль.
//  * Якщо не авторизований — дозволяє доступ до сторінки логіну/реєстрації.
//  *
//  * @param {NextRequest} request - Поточний серверний запит Next.js
//  * @returns {Promise<NextResponse>} - Дозвіл на доступ або редірект
//  */
// export async function protectLoginPages(request: NextRequest) {
//     const tokens = await getTokensFromRequest(request) // Отримуємо accessToken і refreshToken з куків
//     if (!tokens) return NextResponse.next() // Якщо токенів немає — дозволяємо доступ (користувач неавторизований)

//     const verifiedData = await jwtVerifyServer(tokens.accessToken) // Верифікуємо accessToken (перевірка підпису, терміну дії, payload)
//     if (!verifiedData) return NextResponse.next() // Якщо токен невалідний — дозволяємо доступ

//     // Якщо користувач авторизований — редіректимо на сторінку профілю
//     return nextRedirect(DASHBOARD_PAGES.PROFILE, request.url)
// }
