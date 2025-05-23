// src/features/society/onboarding/services/onboarding.service.ts

import { CreateSocietyDto, SocietyEntity } from '../types/society.types'
import { instance } from '@/api/axios' // Імпорт інстансу axios для роботи з API

export class OnboardingService {
	static async createSociety(data: CreateSocietyDto): Promise<SocietyEntity> {
		const response = await instance.post('/api/societies', data)
		return response.data
	}

	static async joinSociety(data: { token: string }): Promise<any> {
		const response = await instance.post('/api/users/accept-invite', data)
		return response.data
	}
}
