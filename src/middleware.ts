import { NextRequest, NextResponse } from 'next/server'
import { ADMIN_PAGES } from './config/pages/admin.config'
import { DASHBOARD_PAGES } from './config/pages/dashboard.config'
import { PREMIUM_PAGES } from './config/pages/premium.config'
import { PUBLIC_PAGES } from './config/pages/public.config'
import { protectAdminPages } from './server-actions/middlewares/protect-admin.middleware'
import { protectDashboardPages } from './server-actions/middlewares/protect-dashboard.middleware'
import { protectLoginPages } from './server-actions/middlewares/protect-login.middleware'
import { protectPremiumPages } from './server-actions/middlewares/protect-premium.middleware'

export async function middleware(request: NextRequest): Promise<NextResponse> {
	const pathname = request.nextUrl.pathname

	if (pathname.startsWith(PUBLIC_PAGES.AUTH)) {
		return protectLoginPages(request)
	}

	if (pathname.startsWith(PREMIUM_PAGES.HOME)) {
		return protectPremiumPages(request)
	}

	if (
		pathname.startsWith(ADMIN_PAGES.HOME) ||
		pathname.startsWith(ADMIN_PAGES.MANAGER) ||
		pathname.startsWith(ADMIN_PAGES.PREMIUM)
	) {
		return protectAdminPages(request)
	}

	if (pathname.startsWith(DASHBOARD_PAGES.HOME)) {
		return protectDashboardPages(request)
	}

	return NextResponse.next()
}

export const config = {
	matcher: [
		'/dashboard/:path*',
		'/auth/:path*',
		'/premium/:path*',
		'/admin/:path*',
		'/manager/:path*',
		'/main/:path*',
	],
}
