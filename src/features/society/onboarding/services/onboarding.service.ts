// src/features/society/onboarding/services/onboarding.service.ts

import { instance } from '@/api/axios' // Імпорт інстансу axios для роботи з API
import { CreateSocietyDto, SocietyEntity } from '../types/society.types'
import { API_URL } from '@/constants' // Імпорт базової адреси API
export class OnboardingService {
	static async createSociety(data: CreateSocietyDto): Promise<SocietyEntity> {
		const response = await instance.post(`${API_URL}/societies`, data)
		return response.data
	}

	static async joinSociety(data: { token: string }): Promise<any> {
		const response = await instance.post(`${API_URL}/users/accept-invite`, data)
		return response.data
	}
}
