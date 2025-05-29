// src/shared/components/Sidebar.tsx

'use client'
import { LogoSvg } from '@/shared/components/LogoSvg'
import { commonSidebarItems } from '@/shared/config/commonSidebarItems'
import { managerSidebarItems } from '@/shared/config/managerSidebarItems'
import { useProfile } from '@features/profile/hooks/useProfile'
import clsx from 'clsx'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { CgProfile } from 'react-icons/cg'

export const Sidebar: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	const pathname = usePathname()
	const { user, isLoading, refetch } = useProfile()

	useEffect(() => {
		// Автоматично отримуємо профіль при монтуванні компонента
		refetch({})
	}, [refetch])

	// В user має бути масив societies та масив roles
	const societies = user?.societies || []
	console.log('Sidebar:societies', societies) // Логування суспільств для налагодження
	// Перевіряємо ролі користувача

	const roles = user?.roles || []
	const isGlobalManager = roles.includes('MANAGER') || roles.includes('ADMIN')
	const isSocietyManager = societies.some(
		society => society.role === 'MANAGER' || society.role === 'ADMIN'
	)

	console.log('Sidebar:roles', roles) // Логування ролей для налагодження
	console.log('Sidebar:isGlobalManager', isGlobalManager) // Логування глобального менеджера для налагодження
	console.log('Sidebar:isSocietyManager', isSocietyManager) // Логування менеджера суспільства для налагодження

	// Фільтрація для базового меню
	const itemsToShow = commonSidebarItems.filter(item => {
		if (item.hidden && societies.length > 0) return false
		if (!item.roles?.some(r => roles.includes(r.toUpperCase()))) return false
		return true
	})

	const managerItemsToShow = managerSidebarItems.filter(item => {
		if (item.hidden && societies.length > 0) return false
		if (!item.roles?.some(r => roles.includes(r.toUpperCase()))) return false
		return true
	})

	console.log('Sidebar:itemsToShow', itemsToShow) // Логування елементів меню для налагодження

	console.log('Sidebar:managerItemsToShow', managerItemsToShow) // Логування елементів меню для налагодження

	return (
		<aside className='fixed inset-y-0 left-0 w-72 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between z-50'>
			<div>
				<div className='px-8 py-10 flex flex-col items-start'>
					<Link href='/' className='flex items-center gap-2 select-none'>
						<LogoSvg width={100} height={110} />
					</Link>
					<div className='flex flex-col gap-3 text-neutral-400 text-lg font-medium'>
						<span>Меню</span>
						<ul className='space-y-2'>
							{itemsToShow.map(page => (
								<li key={page.href}>
									<Link
										className={clsx(
											'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
											pathname === page.href
												? 'bg-cyan-900/30 text-cyan-300 font-bold'
												: 'hover:bg-neutral-800/60'
										)}
										href={page.href}
									>
										{page.icon}
										<span>{page.label}</span>
									</Link>
								</li>
							))}
							{isGlobalManager &&
								isSocietyManager &&
								managerItemsToShow.map(page => (
									<li key={page.href}>
										<Link
											className={clsx(
												'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors',
												pathname === page.href
													? 'bg-cyan-900/30 text-cyan-300 font-bold'
													: 'hover:bg-neutral-800/60'
											)}
											href={page.href}
										>
											{page.icon}
											<span>{page.label}</span>
										</Link>
									</li>
								))}
						</ul>
					</div>
				</div>
				{children}
			</div>
			<div className='px-8 pb-8 text-xs text-neutral-600'>
				<Link
					className={clsx(
						'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-lg',
						pathname === '/profile'
							? 'bg-cyan-900/30 text-cyan-300 font-bold'
							: 'hover:bg-neutral-800/60'
					)}
					href={'/profile'}
				>
					<CgProfile size={30} />
					<span>Мій профіль</span>
				</Link>
				<div className='px-2 py-2 text-xs text-neutral-600'>
					© {new Date().getFullYear()} TheWalls
				</div>
			</div>
		</aside>
	)
}
