'use client' // Директива Next.js: компонент рендериться лише на клієнті

import UserService from '@features/auth/services/user.service' // Сервіс для роботи з користувачами (API-запити)
import { useQuery } from '@tanstack/react-query' // Хук для отримання та кешування асинхронних даних

/**
 * Компонент Users — відображає список користувачів для адмін-панелі.
 * Використовує React Query для отримання даних з бекенду.
 */
export function Users() {
	// Використовуємо useQuery для фетчингу списку користувачів
	const { data, isLoading } = useQuery({
		queryKey: ['users'], // Ключ для кешу React Query (унікальний для цього запиту)
		queryFn: () => UserService.fetchList(), // Функція, яка повертає Promise зі списком користувачів
	})

	return (
		<div>
			<h1>Users</h1>
			{/* Якщо дані ще завантажуються — показати "Loading..." */}
			{isLoading ? (
				<div>Loading...</div>
			) : data?.data?.length ? (
				// Якщо є користувачі — відобразити їх email
				data.data.map(user => <div key={user.id}>{user.email}</div>)
			) : (
				// Якщо користувачів немає — показати повідомлення
				<p>Not found!</p>
			)}
		</div>
	)
}
