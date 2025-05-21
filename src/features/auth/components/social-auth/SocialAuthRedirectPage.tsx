'use client'

import { PUBLIC_PAGES } from '@/config/pages/public.config'

import { AuthToken } from '@/features/auth/types/auth.types'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import authTokenService from '@/features/auth/services/auth-token.service'
import { MiniLoader } from '@/shared/components/MiniLoader'
import SocialEmailForm from './SocialEmailForm'

export function SocialAuthRedirectPage() {
	const searchParams = useSearchParams()
	const needEmail = searchParams.get('needEmail')

	const router = useRouter()

	useEffect(() => {
		const accessToken = searchParams.get(AuthToken.ACCESS_TOKEN)
		if (accessToken) authTokenService.saveAccessToken(accessToken)

		if (!needEmail) router.replace(PUBLIC_PAGES.HOME)
	}, [])

	if (needEmail) {
		return <SocialEmailForm />
	}

	return (
		<div className='flex items-center justify-center h-screen'>
			<MiniLoader width={150} height={150} />
		</div>
	)
}
