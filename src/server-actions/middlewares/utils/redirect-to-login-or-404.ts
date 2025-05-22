import { ADMIN_PAGES } from '@/config/pages/admin.config' // Константи з маршрутами для адміністратора
import { PUBLIC_PAGES } from '@/config/pages/public.config' // Константи з публічними маршрутами (логін тощо)
import { NextRequest } from 'next/server' // Тип запиту Next.js (для middleware/server actions)
import { nextRedirect } from './next-redirect' // Утиліта для формування редіректу

/**
 * redirectToLoginOrNotFound — функція для редіректу користувача на сторінку логіну або 404.
 * Використовується у middleware для захисту сторінок (наприклад, якщо користувач неавторизований).
 *
 * @param {NextRequest} request - Поточний запит Next.js (містить URL)
 * @returns {NextResponse} - Відповідь з редіректом на логін або 404
 */
export const redirectToLoginOrNotFound = (request: NextRequest) => {
	const pathname = request.nextUrl.pathname // Поточний шлях (route) з URL

	// Визначаємо, чи це адміністративна сторінка (починається з одного з admin-маршрутів)
	const isAdminPage =
		pathname.startsWith(ADMIN_PAGES.HOME) ||
		pathname.startsWith(ADMIN_PAGES.MANAGER) ||
		pathname.startsWith(ADMIN_PAGES.PREMIUM) ||
		pathname.startsWith(ADMIN_PAGES.MAIN)

	// Якщо це адмін-сторінка — редірект на 404, інакше — на сторінку логіну
	return nextRedirect(isAdminPage ? '/404' : PUBLIC_PAGES.LOGIN, request.url)
}
