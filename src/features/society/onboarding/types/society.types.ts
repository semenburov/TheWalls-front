// src/features/society/onboarding/types/society.types.ts

export interface CreateSocietyDto {
	name: string
	type: string
	address?: string
}

export interface SocietyEntity {
	id: string
	name: string
	type: string
	address?: string
	managerId: string
	createdAt: string
	updatedAt: string
}
