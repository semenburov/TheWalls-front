// src/features/society/onboarding/hooks/useJoinSociety.ts

import { useBaseMutation } from '@shared/hooks/useBaseMutation'
import { useApiErrorHandler } from '@shared/hooks/useApiErrorHandler'
import { JoinSocietyDto, SocietyEntity } from '../types/society.types'
import { OnboardingService } from '../services/onboarding.service'
export function useJoinSociety() {
	const errorHandler = useApiErrorHandler()
	return useBaseMutation<SocietyEntity, JoinSocietyDto>(
		OnboardingService.joinSociety,
		{
			onError: errorHandler,
		}
	)
}
