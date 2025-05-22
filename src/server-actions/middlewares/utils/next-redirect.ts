import { NextResponse } from 'next/server' // Імпорт утиліти для формування відповіді в Next.js middleware

/**
 * nextRedirect — функція для створення редіректу у Next.js middleware/server actions.
 * Приймає цільову адресу (toUrl) та поточну адресу (currentUrl), формує абсолютний URL і повертає NextResponse.redirect.
 *
 * @param {string | URL} toUrl - Куди потрібно зробити редірект (відносний або абсолютний шлях)
 * @param {string | URL} currentUrl - Поточна адреса (для формування абсолютного URL)
 * @returns {NextResponse} - Відповідь з редіректом для Next.js middleware
 */
export function nextRedirect(toUrl: string | URL, currentUrl: string | URL) {
	// Створюємо абсолютний URL на основі поточної адреси та цільового шляху
	return NextResponse.redirect(new URL(toUrl, currentUrl))
	// Повертаємо відповідь з редіректом (HTTP 307 за замовчуванням)
}
