'use client'
import { Footer } from '@/features/home/components/sections/Footer'
import { Header } from '@/features/layouts/components/header/Header'
import { Sidebar } from '@/features/layouts/components/sidebar/Sidebar'
import { useProfile } from '@/features/profile/hooks/useProfile'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function AppShell({ children }: { children: React.ReactNode }) {
	const { isLoading, user, error } = useProfile()
	const pathname = usePathname()
	const isRootOrPlans = pathname === '/' || pathname === '/plans'
	const isAuthorized = !!user?.email
	const showSidebar = isAuthorized && !isRootOrPlans
	const showHeader = !isAuthorized || (isAuthorized && isRootOrPlans)
	const router = useRouter()

	// // Якщо приходить помилка — робимо логаут, чистимо токени, редіректим
	// useEffect(() => {
	// 	if (error) {
	// 		// Очищення токенів, localStorage/cookies, якщо треба:
	// 		authService.logout?.() // якщо це метод класу або функція, яка очищує токени

	// 		// Редірект на сторінку логіну
	// 		router.replace('/auth/login')
	// 	}
	// }, [error, router])

	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	if (!mounted) return null // або пустий <div/>

	// if (error) {
	// 	// Можеш тут показати повідомлення
	// 	return <div className='text-red-500'>Не вдалося завантажити профіль.</div>
	// }

	// if (isLoading) {
	// 	// Лоадер/скелетон/пусто — тут не буде hydration-багу
	// 	return (
	// 		<div className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#122155] via-[#101d40] to-[#040714]'>
	// 			<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-400 border-opacity-60'></div>
	// 		</div>
	// 	)
	// }

	// console.log('pathname:', pathname)
	// console.log('isAuthorized:', isAuthorized)
	// console.log('showHeader:', showHeader)
	// console.log('showSidebar:', showSidebar)

	return (
		<main className='relative min-h-screen overflow-x-hidden'>
			<div className='fixed inset-0 -z-10 bg-gradient-to-br from-[#122155] via-[#101d40] to-[#040714]' />
			{showHeader && <Header />}
			{showSidebar && <Sidebar />}
			<div className={showSidebar ? 'pl-72' : ''}>{children}</div>
			{showHeader && <Footer />}
		</main>
	)
}
