'use server'

import { type NextRequest, NextResponse } from 'next/server'

import { getTokensFromRequest } from '../../features/auth/utils/get-tokens-from-request'
import { jwtVerifyServer } from '../../features/auth/utils/jwt-verify'
import { redirectToLoginOrNotFound } from './utils/redirect-to-login-or-404'

export async function protectDashboardPages(request: NextRequest) {
	const tokens = await getTokensFromRequest(request)
	if (!tokens) return redirectToLoginOrNotFound(request)

	const verifiedData = await jwtVerifyServer(tokens.accessToken)
	if (!verifiedData) return redirectToLoginOrNotFound(request)

	return NextResponse.next()
}
