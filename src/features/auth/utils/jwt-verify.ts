'use server' // Директива Next.js: функція виконується лише на сервері (Server Actions)

import { ITokenInside } from '@/features/auth/types/auth.types' // Тип даних всередині JWT-токена
import { transformUserToState } from '@/shared/utils/transform-user-to-state' // Функція для приведення payload до потрібного стану
import * as jose from 'jose' // Бібліотека для роботи з JWT (підпис, верифікація)

/**
 * Асинхронна функція для серверної верифікації JWT-токена.
 * Перевіряє підпис, валідність та термін дії токена.
 *
 * @param {string} accessToken - JWT accessToken для перевірки
 * @returns {Promise<TProtectUserData | null>} - Дані користувача або null, якщо токен невалідний/прострочений
 */
export async function jwtVerifyServer(accessToken: string) {
	try {
		// Верифікуємо токен за допомогою секрету (JWT_SECRET з env)
		const { payload }: { payload: ITokenInside } = await jose.jwtVerify(
			accessToken,
			new TextEncoder().encode(`${process.env.JWT_SECRET}`)
		)

		if (!payload) return null // Якщо payload відсутній — повертаємо null

		// Трансформуємо payload у потрібний формат для стейту користувача
		return transformUserToState(payload)
	} catch (error) {
		// Обробка помилок, пов'язаних з верифікацією JWT
		if (
			error instanceof Error &&
			error.message.includes('exp claim timestamp check failed')
		) {
			// Токен прострочений
			console.log('Токен истек')
			return null
		}

		// Інші помилки верифікації
		console.log('Ошибка при верификации токена: ', error)
		return null
	}
}
