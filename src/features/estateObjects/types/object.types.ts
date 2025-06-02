export enum EstateObjectType {
	STREET = 'STREET',
	ENTRANCE = 'ENTRANCE',
	PLOT = 'PLOT',
	APARTMENT = 'APARTMENT',
}

export interface CreateEstateObjectDto {
	name: string
	type: EstateObjectType
	area: number
	societyId: string
	parentId?: string
	ownerIds: string[]
}

export interface EstateObjectEntity {
	id: string
	name: string
	type: EstateObjectType
	area: number
	societyId: string
	parentId?: string
	ownerIds: string[]
	createdAt: string
	updatedAt: string
}
