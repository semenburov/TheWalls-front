'use client'
import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { useProfile } from '@/features/profile/hooks/useProfile'
import userService from '@features/auth/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { startTransition } from 'react'
import { RxAvatar } from 'react-icons/rx'

export const ProfileMenu: React.FC<{ user: any }> = ({ user }) => {
	const [open, setOpen] = React.useState(false)
	const menuRef = React.useRef<HTMLDivElement>(null)
	const router = useRouter()
	const { refetch } = useProfile()
	const queryClient = useQueryClient()

	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => userService.logout(),
		onSuccess() {
			refetch()
			queryClient.setQueryData(['profile'], null)
			startTransition(() => {
				router.push(PUBLIC_PAGES.PLANS) //REDIRECT AFTER REGISTER
			})
		},
	})

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
			<button
				onClick={() => setOpen(o => !o)}
				className='flex items-center gap-2 px-2 py-1 rounded-full bg-white/10 hover:bg-cyan-900/20 transition'
			>
				<RxAvatar size={34} />
				<span className='hidden md:block text-white font-semibold'>
					{user.name || 'Profile'}
				</span>
			</button>
			{open && (
				<div className='absolute right-0 mt-2 min-w-[180px] bg-zinc-900 border border-white/10 rounded-2xl shadow-xl py-2 z-50'>
					<Link
						href='/profile'
						className='flex items-center gap-2 px-4 py-2 text-white hover:bg-zinc-800 transition'
						onClick={() => setOpen(false)}
					>
						<span>Profile</span>
					</Link>
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
