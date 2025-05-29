// src/features/society/onboarding/types/society.types.ts
export type SocietyType = 'HOUSE' | 'GARDEN' | 'GARAGE'
export interface CreateSocietyDto {
	name: string
	email: string
	phone?: string
	type: SocietyType
	description?: string
	address?: string
}

export interface SocietyEntity {
	id: number
	name: string
	email: string
	phone?: string
	type: SocietyType
	description?: string
	address?: string
	managerId: string
	createdAt: string
	updatedAt: string
}

export interface JoinSocietyDto {
	token: string
}
