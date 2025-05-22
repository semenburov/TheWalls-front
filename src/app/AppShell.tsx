'use client' // Директива Next.js: компонент рендериться лише на клієнті

import { Footer } from '@/features/home/components/Footer' // Футер сайту
import { Header } from '@/features/layouts/components/header/Header' // Хедер сайту
import { Sidebar } from '@/features/layouts/components/sidebar/Sidebar' // Бокове меню
import { useProfile } from '@/features/profile/hooks/useProfile' // Хук для отримання профілю користувача
import { usePathname } from 'next/navigation' // Хук для отримання поточного шляху
import { useEffect, useState } from 'react'

/**
 * Головна обгортка для всіх сторінок додатку.
 * Відповідає за макет, фоновий градієнт, хедер, футер, сайдбар та відступи.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Вміст сторінки, що буде відображено всередині оболонки
 */
export function AppShell({ children }: { children: React.ReactNode }) {
	const { user } = useProfile() // Отримання поточного користувача (або null)
	const pathname = usePathname() // Поточний шлях (route)
	const isRootOrPlans = pathname === '/' || pathname === '/plans' // Чи це головна або сторінка тарифів
	const isAuthorized = !!user?.email // Чи користувач авторизований (є email)
	const showSidebar = isAuthorized && !isRootOrPlans // Сайдбар показується лише для авторизованих, окрім головної/тарифів
	const showHeader = !isAuthorized || (isAuthorized && isRootOrPlans) // Хедер для неавторизованих або на головній/тарифах

	const [mounted, setMounted] = useState(false) // Стан монтування компонента (для SSR/CSR)

	useEffect(() => {
		setMounted(true) // Встановлюємо, що компонент змонтовано (уникаємо гідратаційних помилок)
	}, [])

	if (!mounted) return null // Поки не змонтовано — нічого не рендеримо (або можна <div/>)

	return (
		<main className='relative min-h-screen overflow-x-hidden'>
			{/* Фоновий градієнт на всю сторінку, фіксований позаду контенту */}
			<div className='fixed inset-0 -z-10 bg-gradient-to-br from-[#122155] via-[#101d40] to-[#040714]' />
			{/* Хедер (умовно) */}
			{showHeader && <Header />}
			{/* Сайдбар (умовно) */}
			{showSidebar && <Sidebar />}
			{/* Основний контент, з відступом якщо є сайдбар */}
			<div className={showSidebar ? 'pl-72' : ''}>{children}</div>
			{/* Футер (умовно) */}
			{showHeader && <Footer />}
		</main>
	)
}
