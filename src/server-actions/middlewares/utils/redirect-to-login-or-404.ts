import { ADMIN_PAGES } from '@/config/pages/admin.config'
import { PUBLIC_PAGES } from '@/config/pages/public.config'
import { NextRequest } from 'next/server'
import { nextRedirect } from './next-redirect'

export const redirectToLoginOrNotFound = (request: NextRequest) => {
	const pathname = request.nextUrl.pathname
	const isAdminPage =
		pathname.startsWith(ADMIN_PAGES.HOME) ||
		pathname.startsWith(ADMIN_PAGES.MANAGER) ||
		pathname.startsWith(ADMIN_PAGES.PREMIUM) ||
		pathname.startsWith(ADMIN_PAGES.MAIN)

	return nextRedirect(isAdminPage ? '/404' : PUBLIC_PAGES.LOGIN, request.url)
}
