'use client'
import { ADMIN_PAGES } from '@/config/pages/admin.config' // Маршрути для адміністратора
import { DASHBOARD_PAGES } from '@/config/pages/dashboard.config' // Маршрути для дашборду користувача
import { PREMIUM_PAGES } from '@/config/pages/premium.config' // Маршрути для преміум-користувача
import { PUBLIC_PAGES } from '@/config/pages/public.config' // Публічні маршрути (логін тощо)
import { LogoSvg } from '@/shared/components/LogoSvg' // SVG-логотип компанії
import Link from 'next/link' // Компонент для навігації Next.js
import React from 'react'

/**
 * Масив сторінок для відображення у меню сайдбару.
 * Можна розширити або фільтрувати за ролями користувача.
 */
const pages = [
	PUBLIC_PAGES.LOGIN, // Сторінка логіну
	DASHBOARD_PAGES.PROFILE, // Профіль користувача
	PREMIUM_PAGES.HOME, // Головна преміум-користувача
	ADMIN_PAGES.HOME, // Головна адміністратора
	ADMIN_PAGES.MANAGER, // Сторінка менеджера
	ADMIN_PAGES.MAIN, // Головна адмін-панелі
]

/**
 * Sidebar — компонент бічної навігації (сайдбар).
 * Відображає логотип, меню з посиланнями, додатковий контент (children) та копірайт.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.children] — Додатковий контент під меню (наприклад, кнопки, профіль)
 * @returns {JSX.Element} — Сайдбар з меню
 */
export const Sidebar: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => (
	<aside className='fixed inset-y-0 left-0 w-72 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between z-50'>
		{/* 
            fixed inset-y-0 left-0 — фіксоване позиціонування зліва на всю висоту
            w-72 — ширина 18rem (~288px)
            bg-neutral-950 — темний фон
            border-r border-neutral-800 — права межа
            flex flex-col justify-between — вертикальний флекс, розподіл простору
            z-50 — поверх більшості елементів
        */}
		<div>
			<div className='px-8 py-10 flex flex-col items-start'>
				<Link href='/' className='flex items-center gap-2 select-none'>
					{/* SVG-логотип компанії */}
					<LogoSvg width={100} height={110} />
				</Link>
				<div className='flex flex-col gap-3 text-neutral-400 text-lg font-medium'>
					<div>
						<span>Меню</span>
						<ul className='space-y-2'>
							{pages.map(page => (
								<li key={page}>
									<Link className='text-primary' href={page}>
										{page}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
			{/* Додатковий контент, який можна передати у Sidebar (children) */}
			{children}
		</div>
		{/* Копірайт у нижній частині сайдбару */}
		<div className='px-8 pb-8 text-xs text-neutral-600'>
			© {new Date().getFullYear()} TheWalls
		</div>
	</aside>
)
