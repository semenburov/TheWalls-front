// src/features/society/onboarding/services/onboarding.service.ts

import { CreateSocietyDto, SocietyEntity } from '../types/society.types'
import axios from 'axios'

export class OnboardingService {
	static async createSociety(data: CreateSocietyDto): Promise<SocietyEntity> {
		const response = await axios.post('/api/societies', data)
		return response.data
	}

	static async joinSociety(data: { token: string }): Promise<any> {
		const response = await axios.post('/api/users/accept-invite', data)
		return response.data
	}
}
