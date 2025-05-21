'use server'

import { type NextRequest, NextResponse } from 'next/server'

import { DASHBOARD_PAGES } from '@/config/pages/dashboard.config'
import { getTokensFromRequest } from '../../features/auth/utils/get-tokens-from-request'
import { jwtVerifyServer } from '../../features/auth/utils/jwt-verify'
import { nextRedirect } from './utils/next-redirect'

export async function protectLoginPages(request: NextRequest) {
	const tokens = await getTokensFromRequest(request)
	if (!tokens) return NextResponse.next()

	const verifiedData = await jwtVerifyServer(tokens.accessToken)
	if (!verifiedData) return NextResponse.next()

	return nextRedirect(DASHBOARD_PAGES.PROFILE, request.url)
}
