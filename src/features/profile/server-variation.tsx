import { API_URL } from '@/constants' // Базова адреса API
import { AuthToken } from '@/features/auth/types/auth.types' // Константи для назв токенів (access/refresh)
import { IUser } from '@shared/types/user.types' // Тип користувача
import { cookies } from 'next/headers' // API для роботи з cookie на сервері (Next.js)

/**
 * fetchProfile — асинхронна функція для отримання профілю користувача на сервері.
 * Використовує серверні cookie для отримання accessToken і робить запит до API.
 *
 * @returns {Promise<IUser>} - Дані профілю користувача
 */
const fetchProfile = async () => {
	'use server' // Директива Next.js: функція виконується лише на сервері

	const cookie = await cookies() // Отримання cookie з серверного запиту
	const accessToken = cookie.get(AuthToken.ACCESS_TOKEN)?.value // Витягуємо accessToken з cookie

	return fetch(`${API_URL}/auth/profile`, {
		headers: {
			Authorization: `Bearer ${accessToken}`, // Передаємо accessToken у заголовку Authorization
		},
	}).then(res => res.json()) as Promise<IUser> // Парсимо відповідь як IUser
}

/**
 * ProfilePage — серверний компонент сторінки профілю.
 * Викликає fetchProfile для отримання даних користувача на сервері.
 * Відображає email користувача або повідомлення "Not found!".
 *
 * @returns {JSX.Element} - Розмітка сторінки профілю
 */
export default async function ProfilePage() {
	const profile = await fetchProfile() // Отримання профілю користувача

	return (
		<div>
			{profile ? (
				<>
					<h1>Profile</h1>
					<p>{profile.email}</p> {/* Відображення email користувача */}
				</>
			) : (
				<p>Not found!</p> // Якщо профіль не знайдено
			)}
		</div>
	)
}
