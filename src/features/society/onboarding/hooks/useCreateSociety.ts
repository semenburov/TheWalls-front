// src/features/society/onboarding/hooks/useCreateSociety.ts

import { useBaseMutation } from '@shared/hooks/useBaseMutation'
import { useApiErrorHandler } from '@shared/hooks/useApiErrorHandler'
import { OnboardingService } from '../services/onboarding.service'
import { CreateSocietyDto, SocietyEntity } from '../types/society.types'

export function useCreateSociety() {
	const errorHandler = useApiErrorHandler()
	return useBaseMutation<SocietyEntity, CreateSocietyDto>(
		OnboardingService.createSociety,
		{
			onError: errorHandler,
		}
	)
}
