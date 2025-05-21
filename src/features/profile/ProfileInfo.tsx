'use client'
import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { useProfile } from '@/features/profile/hooks/useProfile'
import { MiniLoader } from '@/shared/ui/MiniLoader'
import userService from '@features/auth/services/user.service'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { RxAvatar } from 'react-icons/rx'
import { twMerge } from 'tailwind-merge'

export function ProfileInfo() {
	const router = useRouter()

	const { isLoading, refetch, user } = useProfile()
	const queryClient = useQueryClient()
	const [isPending, startTransition] = useTransition()

	const { mutate: mutateLogout, isPending: isLogoutPending } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => userService.logout(),
		onSuccess() {
			refetch()
			queryClient.setQueryData(['profile'], null)
			startTransition(() => {
				router.push(PUBLIC_PAGES.PLANS) //REDIRECT AFTER REGISTER
			})
			//setTimeout(() => window.location.reload(), 100)
		},
	})

	const isLogoutLoading = isLogoutPending || isPending

	if (isLoading)
		return (
			<div className='mt-10'>
				<MiniLoader width={150} height={150} />
			</div>
		)

	return (
		<div className='mt-10 px-8'>
			<RxAvatar size={64} />
			<h2 className='text-2xl font-bold'>Hi, {user.name || 'Anonym'}</h2>
			<br />
			<p className='text-lg'>
				Ваш email: {user.email}{' '}
				<i>
					({user.verificationToken ? 'Requires email verification' : 'Verified'}
					)
				</i>
			</p>
			<br />
			<p>Rights: {user.rights?.join(', ')}</p>
			<br />
			<button
				onClick={() => mutateLogout()}
				disabled={isLogoutLoading}
				className={twMerge(
					'mt-2 bg-primary text-white px-4 py-2 rounded-md',
					isLogoutLoading && 'bg-gray-500'
				)}
			>
				{isLogoutLoading ? <MiniLoader /> : 'Logout'}
			</button>
		</div>
	)
}
