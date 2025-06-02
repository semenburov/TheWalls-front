// src/features/society/onboarding/services/onboarding.service.ts

import { instance } from '@/api/axios' // Імпорт інстансу axios для роботи з API
import {
	CreateEstateObjectDto,
	EstateObjectEntity,
} from '../types/object.types'
export class EstateObjectService {
	static async getEstateObjects(
		params?: Record<string, any>
	): Promise<EstateObjectEntity[]> {
		const { data } = await instance.get<EstateObjectEntity[]>('/objects', {
			params,
		})
		return data
	}

	static async getEstateObjectById(id: string): Promise<EstateObjectEntity> {
		const { data } = await instance.get<EstateObjectEntity>(`/objects/${id}`)
		return data
	}

	static async createEstateObject(
		dto: CreateEstateObjectDto
	): Promise<EstateObjectEntity> {
		const { data } = await instance.post<EstateObjectEntity>('/objects', dto)
		return data
	}

	static async updateEstateObject(
		id: string,
		dto: Partial<CreateEstateObjectDto>
	): Promise<EstateObjectEntity> {
		const { data } = await instance.patch<EstateObjectEntity>(
			`/objects/${id}`,
			dto
		)
		return data
	}

	static async deleteEstateObject(id: string): Promise<void> {
		await instance.delete(`/objects/${id}`)
	}
}
