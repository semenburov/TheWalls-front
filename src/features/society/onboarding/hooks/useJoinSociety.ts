// src/features/society/onboarding/hooks/useJoinSociety.ts

import { useBaseMutation } from '@shared/hooks/useBaseMutation'
import { useApiErrorHandler } from '@shared/hooks/useApiErrorHandler'
import { OnboardingService } from '../services/onboarding.service'

export function useJoinSociety() {
	const errorHandler = useApiErrorHandler()
	return useBaseMutation<{ token: string }, any>(
		OnboardingService.joinSociety,
		{
			onError: errorHandler,
		}
	)
}
