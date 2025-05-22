import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_PAGES } from './config/pages/admin.config' // Маршрути для адмін-зони
import { DASHBOARD_PAGES } from './config/pages/dashboard.config' // Маршрути для дашборду користувача
import { PREMIUM_PAGES } from './config/pages/premium.config' // Маршрути для преміум-зони
import { PUBLIC_PAGES } from './config/pages/public.config' // Публічні маршрути (логін, реєстрація)
import { protectAdminPages } from './server-actions/middlewares/protect-admin.middleware' // Middleware для захисту адмін-зони
import { protectDashboardPages } from './server-actions/middlewares/protect-dashboard.middleware' // Middleware для захисту дашборду
import { protectLoginPages } from './server-actions/middlewares/protect-login.middleware' // Middleware для захисту сторінок логіну/реєстрації
import { protectPremiumPages } from './server-actions/middlewares/protect-premium.middleware' // Middleware для захисту преміум-зони

/**
 * Основний middleware Next.js для захисту роутів.
 * В залежності від шляху (pathname) викликає відповідний middleware для перевірки доступу.
 *
 * @param {NextRequest} request - Поточний серверний запит Next.js
 * @returns {Promise<NextResponse>} - Відповідь (дозвіл на доступ або редірект)
 */
export async function middleware(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname // Поточний шлях (route) з URL

	// Захист сторінок логіну/реєстрації: якщо користувач вже авторизований — редірект на профіль
	if (pathname.startsWith(PUBLIC_PAGES.AUTH)) {
		return protectLoginPages(request)
	}

	// Захист преміум-сторінок: доступ лише для преміум-користувачів/адмінів
	if (pathname.startsWith(PREMIUM_PAGES.HOME)) {
		return protectPremiumPages(request)
	}

	// Захист адмінських сторінок: доступ лише для адмінів/менеджерів/преміум (залежно від підшляху)
	if (
		pathname.startsWith(ADMIN_PAGES.HOME) ||
		pathname.startsWith(ADMIN_PAGES.MANAGER) ||
		pathname.startsWith(ADMIN_PAGES.PREMIUM)
	) {
		return protectAdminPages(request)
	}

	// Захист дашборду: доступ лише для авторизованих користувачів
	if (pathname.startsWith(DASHBOARD_PAGES.HOME)) {
		return protectDashboardPages(request)
	}

	// Якщо шлях не підпадає під жоден із захищених — дозволяємо доступ
	return NextResponse.next()
}

/**
 * config — налаштування для Next.js middleware.
 * matcher — масив маршрутів, для яких буде викликатися цей middleware.
 * Підтримує вкладені шляхи (наприклад, /dashboard/:path*).
 */
export const config = {
	matcher: [
		'/dashboard/:path*', // Всі сторінки дашборду
		'/auth/:path*', // Всі сторінки логіну/реєстрації
		'/premium/:path*', // Всі преміум-сторінки
		'/admin/:path*', // Всі адмін-сторінки
		'/manager/:path*', // Всі сторінки менеджера
		'/main/:path*', // Головна сторінка (якщо потрібно захищати)
	],
}
