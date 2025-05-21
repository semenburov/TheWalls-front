import { Suspense } from 'react'
import { SocialAuthRedirectPage } from '../../features/auth/components/social-auth/SocialAuthRedirectPage'

export default function SocialAuthPage() {
	return (
		<Suspense>
			<SocialAuthRedirectPage />
		</Suspense>
	)
}
