'use client'
import { useProfile } from '@/features/profile/hooks/useProfile'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function MainPage() {
	const { user, isLoading } = useProfile()
	const router = useRouter()
	const searchParams = useSearchParams() // <-- перенесено перед будь-якими return

	useEffect(() => {
		if (!isLoading && !user?.email) {
			router.replace('/auth/login')
		}
	}, [isLoading, user, router])

	if (isLoading || !user?.email) {
		return (
			<div className='w-full h-screen flex items-center justify-center bg-gradient-to-br from-[#122155] via-[#101d40] to-[#040714]'>
				<div className='animate-spin rounded-full h-16 w-16 border-t-4 border-cyan-400 border-opacity-60'></div>
			</div>
		)
	}

	const success = searchParams?.get('success') === '1'

	return (
		<>
			<div className='max-w-3xl mx-auto pt-10'>
				<h1 className='text-3xl font-bold mb-4'>
					Вітаю в особистому кабінеті!
				</h1>
			</div>
			{success && (
				<div className='fixed top-30 left-1/2 -translate-x-1/2 z-50 bg-green-100 border border-green-400 text-green-800 px-6 py-3 rounded-2xl shadow-lg text-lg mb-4'>
					Чекайте на активацію Вашого облікового запису або підключення Вас до
					товариства.
				</div>
			)}
		</>
	)
}
