'use client'
import { PUBLIC_PAGES } from '@/config/pages/public.config' // Константи з публічними маршрутами (наприклад, сторінка тарифів)
import { useProfile } from '@/features/profile/hooks/useProfile' // Кастомний хук для отримання профілю користувача
import { MiniLoader } from '@/shared/components/MiniLoader' // Міні-лоадер для індикатора завантаження
import userService from '@features/auth/services/user.service' // Сервіс для логауту користувача
import { useMutation, useQueryClient } from '@tanstack/react-query' // Хуки для мутацій і роботи з кешем (React Query)
import { useRouter } from 'next/navigation' // Хук для навігації (редіректу)
import { useTransition } from 'react' // Хук для оптимізації переходів (startTransition)
import { RxAvatar } from 'react-icons/rx' // Іконка профілю
import { twMerge } from 'tailwind-merge' // Для об'єднання класів Tailwind з умовами

/**
 * ProfileInfo — компонент для відображення інформації про користувача.
 * Включає ім'я, email, статус верифікації, права, кнопку логауту.
 * Показує лоадер під час завантаження профілю або логауту.
 */
export function ProfileInfo() {
	const router = useRouter() // Для навігації після логауту

	const { isLoading, refetch, user } = useProfile() // Отримання профілю користувача, стану завантаження, функції оновлення
	const queryClient = useQueryClient() // Для роботи з кешем React Query
	const [isPending, startTransition] = useTransition() // Для плавного редіректу після логауту

	// Мутація для логауту користувача
	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'], // Ключ мутації
		mutationFn: () => userService.logout(), // Виклик API для логауту
		onSuccess() {
			startTransition(() => {
				router.push(PUBLIC_PAGES.AUTH) // Редірект на сторінку тарифів після логауту
			})
			refetch() // Оновити профіль (скинути user)
			queryClient.setQueryData(['profile'], null) // Очистити кеш профілю

			// setTimeout(() => window.location.reload(), 100) // (Опціонально) форс-оновлення сторінки
		},
	})

	const isLogoutLoading = isLogoutPending || isPending // Прапорець стану логауту (для дизейблу кнопки)

	// Показати лоадер, поки профіль вантажиться
	if (isLoading)
		return (
			<div className='mt-10'>
				<MiniLoader width={150} height={150} />
			</div>
		)

	return (
		<div className='mt-10 px-8'>
			<RxAvatar size={64} /> {/* Іконка профілю */}
			<h2 className='text-2xl font-bold'>Вітаю, {user.name || 'Anonym'}</h2>
			<br />
			<p className='text-lg'>
				Ваш email: {user.email}{' '}
				{/* <i>
					({user.verificationToken ? 'Requires email verification' : 'Verified'}
					)
				</i> */}
			</p>
			<br />
			<p>Ваш доступ: {user.roles?.join(', ')}</p> <br />
			{/* Відображення ролей/прав користувача */}
			<br />
			<button
				onClick={() => mutateLogout()} // Виклик логауту
				disabled={isLogoutLoading} // Дизейбл під час логауту
				className={twMerge(
					'mt-2 bg-primary text-white px-4 py-2 rounded-md',
					isLogoutLoading && 'bg-gray-500'
				)}
			>
				{isLogoutLoading ? <MiniLoader /> : 'Logout'}{' '}
				{/* Лоадер або текст кнопки */}
			</button>
		</div>
	)
}
