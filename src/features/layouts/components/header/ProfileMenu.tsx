'use client'
import { PUBLIC_PAGES } from '@/config/pages/public.config' // Константи з публічними маршрутами
import { useProfile } from '@/features/profile/hooks/useProfile' // Хук для оновлення профілю після логауту
import userService from '@features/auth/services/user.service' // Сервіс для логауту
import { useMutation, useQueryClient } from '@tanstack/react-query' // Для мутації (логаут) і роботи з кешем
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { startTransition } from 'react'
import { RxAvatar } from 'react-icons/rx' // Іконка профілю

/**
 * ProfileMenu — дропдаун-меню профілю користувача у хедері.
 * Відображає ім'я користувача, посилання на профіль і кнопку логауту.
 * Закривається при кліку поза меню.
 *
 * @param {object} props
 * @param {any} props.user - Дані користувача (мінімум .name)
 */
export const ProfileMenu: React.FC<{ user: any }> = ({ user }) => {
	const [open, setOpen] = React.useState(false) // Стан відкриття меню
	const menuRef = React.useRef<HTMLDivElement>(null) // Реф для визначення кліку поза меню
	const router = useRouter()
	const { refetch } = useProfile() // Для оновлення профілю після логауту
	const queryClient = useQueryClient() // Для роботи з кешем React Query

	// Мутація для логауту користувача
	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'], // Ключ мутації
		mutationFn: () => userService.logout(), // Виклик API для логауту
		onSuccess() {
			refetch() // Оновити профіль (скинути user)
			queryClient.setQueryData(['profile'], null) // Очистити кеш профілю
			startTransition(() => {
				router.push(PUBLIC_PAGES.PLANS) // Редірект на сторінку тарифів після логауту
			})
		},
	})

	// Закриття меню при кліку поза межами меню
	React.useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false)
			}
		}
		if (open) document.addEventListener('mousedown', handler)
		return () => document.removeEventListener('mousedown', handler)
	}, [open])

	return (
		<div className='relative' ref={menuRef}>
			{/* Кнопка відкриття меню профілю */}
			<button
				onClick={() => setOpen(o => !o)}
				className='flex items-center gap-2 px-2 py-1 rounded-full bg-white/10 hover:bg-cyan-900/20 transition'
			>
				<RxAvatar size={34} />
				<span className='hidden md:block text-white font-semibold'>
					{user.name || 'Profile'}
				</span>
			</button>
			{/* Дропдаун-меню */}
			{open && (
				<div className='absolute right-0 mt-2 min-w-[180px] bg-zinc-900 border border-white/10 rounded-2xl shadow-xl py-2 z-50'>
					{/* Посилання на профіль */}
					<Link
						href='/profile'
						className='flex items-center gap-2 px-4 py-2 text-white hover:bg-zinc-800 transition'
						onClick={() => setOpen(false)}
					>
						<span>Profile</span>
					</Link>
					{/* Кнопка логауту */}
					<button
						className='flex items-center gap-2 px-4 py-2 w-full text-left text-red-400 hover:bg-zinc-800 transition'
						onClick={() => {
							mutateLogout()
							setOpen(false)
						}}
						disabled={isLogoutPending}
					>
						<span>Logout</span>
					</button>
				</div>
			)}
		</div>
	)
}
