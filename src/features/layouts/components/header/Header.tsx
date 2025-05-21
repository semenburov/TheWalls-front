// src/components/layouts/Header.tsx

'use client'
import { useProfile } from '@/features/profile/hooks/useProfile'
import Link from 'next/link'
import React from 'react'
import { LogoSvg } from '../../../../shared/ui/LogoSvg'
import { ProfileMenu } from './ProfileMenu'

export const Header: React.FC = () => {
	const { isLoading, refetch, user } = useProfile()
	if (false) {
		// Лоадер/скелетон/пусто — тут не буде hydration-багу
		return (
			<div className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#122155] via-[#101d40] to-[#040714]'>
				<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-400 border-opacity-60'></div>
			</div>
		)
	}
	return (
		<header
			className='
      fixed top-0 left-0 w-full z-50
      bg-black/50
      backdrop-blur-xl
      border-b border-white/10
      shadow-[0_4px_32px_0_rgba(20,40,60,0.04)]
      '
		>
			<div className='max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8 h-16'>
				{/* Лого + Назва */}
				<Link href='/' className='flex items-center gap-2 select-none'>
					{/* Замінити на свій svg/logo */}
					<LogoSvg width={50} height={60} />
					<span className='font-black text-xl tracking-tight text-white'>
						TheWalls Online
					</span>
				</Link>

				{/* Навігація */}
				<nav className='flex items-center gap-4 md:gap-6'>
					<Link
						href='/plans'
						className='flex items-center gap-1 text-neutral-100 font-medium hover:text-cyan-400 transition'
					>
						{/* Можна додати іконку */}
						<span>Pricing</span>
					</Link>
					{false ? (
						// Можеш показати Skeleton/Loader
						<div className='w-8 h-8 rounded-full bg-neutral-700 animate-pulse' />
					) : !user.email ? (
						<>
							<Link
								href='/auth/login'
								className='px-4 py-2 rounded-full bg-black/70 text-white font-semibold shadow hover:bg-neutral-900 transition'
							>
								Login in
							</Link>
							<Link
								href='/auth/register'
								className='px-4 py-2 rounded-full bg-white text-black font-semibold shadow hover:bg-cyan-100 transition border border-white/20'
							>
								Register
							</Link>
						</>
					) : (
						<ProfileMenu user={user} />
					)}
				</nav>
			</div>
			{/* (Опціонально) світловий лінійний border зверху — як у Hedra */}
			<div className='absolute top-0 left-0 w-full h-px bg-gradient-to-r from-cyan-500/0 via-cyan-300/50 to-cyan-500/0 opacity-50 pointer-events-none' />
		</header>
	)
}
