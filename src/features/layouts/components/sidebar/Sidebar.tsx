// src/shared/components/Sidebar.tsx

'use client'
import { LogoSvg } from '@/shared/components/LogoSvg'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { sidebarItems } from '@/shared/config/sidebarItems'
import { useProfile } from '@features/profile/hooks/useProfile' // Шлях змінюй згідно з реальним шляхом у твоєму проекті
import clsx from 'clsx'

export const Sidebar: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => {
	const pathname = usePathname()
	const { data: profile } = useProfile()

	// В profile має бути масив societies та масив roles
	const societies = profile?.societies || []
	const roles = profile?.roles || []

	const itemsToShow = sidebarItems.filter(item => {
		if (item.hidden && societies.length > 0) return false
		if (!item.roles?.some(r => roles.includes(r))) return false
		return true
	})

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
						</ul>
					</div>
				</div>
				{children}
			</div>
			<div className='px-8 pb-8 text-xs text-neutral-600'>
				© {new Date().getFullYear()} TheWalls
			</div>
		</aside>
	)
}
