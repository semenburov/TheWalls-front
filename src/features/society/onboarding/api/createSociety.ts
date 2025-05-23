// src/features/society/onboarding/api/createSociety.ts

import axios from 'axios'
import { CreateSocietyDto, SocietyEntity } from '../types/society.types'

export const createSociety = async (
	data: CreateSocietyDto
): Promise<SocietyEntity> => {
	const response = await axios.post('/api/societies', data)
	return response.data
}
