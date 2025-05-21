// src/components/layouts/Sidebar.tsx

'use client'
import { ADMIN_PAGES } from '@/config/pages/admin.config'
import { DASHBOARD_PAGES } from '@/config/pages/dashboard.config'
import { PREMIUM_PAGES } from '@/config/pages/premium.config'
import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { LogoSvg } from '@/shared/components/LogoSvg'
import Link from 'next/link'
import React from 'react'

const pages = [
	PUBLIC_PAGES.LOGIN,
	DASHBOARD_PAGES.PROFILE,
	PREMIUM_PAGES.HOME,
	ADMIN_PAGES.HOME,
	ADMIN_PAGES.MANAGER,
	ADMIN_PAGES.MAIN,
]

export const Sidebar: React.FC<{ children?: React.ReactNode }> = ({
	children,
}) => (
	<aside className='fixed inset-y-0 left-0 w-72 bg-neutral-950 border-r border-neutral-800 flex flex-col justify-between z-50'>
		<div>
			<div className='px-8 py-10 flex flex-col items-start'>
				<Link href='/' className='flex items-center gap-2 select-none'>
					{/* Замінити на свій svg/logo */}
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
			{children}
		</div>
		<div className='px-8 pb-8 text-xs text-neutral-600'>
			© {new Date().getFullYear()} TheWalls
		</div>
	</aside>
)
