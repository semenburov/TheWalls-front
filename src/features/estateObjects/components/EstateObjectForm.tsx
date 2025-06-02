'use client'
import React, { useState } from 'react'
import {
	CreateEstateObjectDto,
	EstateObjectEntity,
	EstateObjectType,
} from '../types/object.types'

interface EstateObjectFormProps {
	initial?: Partial<EstateObjectEntity>
	onSubmit: (dto: CreateEstateObjectDto) => void
	onCancel: () => void
}

export const EstateObjectForm: React.FC<EstateObjectFormProps> = ({
	initial = {},
	onSubmit,
	onCancel,
}) => {
	const [name, setName] = useState(initial.name || '')
	const [type, setType] = useState<EstateObjectType>(
		initial.type || EstateObjectType.STREET
	)
	const [area, setArea] = useState(initial.area || 0.1)
	const [ownerIds, setOwnerIds] = useState<string[]>(initial.ownerIds || [])

	return (
		<form
			onSubmit={e => {
				e.preventDefault()
				onSubmit({
					name,
					type,
					area,
					ownerIds,
					societyId: initial.societyId || '', // string
					parentId: initial.parentId, // string | undefined (опціонально) })
				})
			}}
			className='flex flex-col gap-2 p-2'
		>
			<input
				className='input'
				value={name}
				onChange={e => setName(e.target.value)}
				placeholder='Назва/Номер'
				required
			/>
			<select
				className='input'
				value={type}
				onChange={e => setType(e.target.value as EstateObjectType)}
				required
			>
				<option value='STREET'>Вулиця</option>
				<option value='ENTRANCE'>Підʼїзд</option>
				<option value='PLOT'>Ділянка</option>
				<option value='APARTMENT'>Квартира</option>
			</select>
			<input
				className='input'
				type='number'
				min={0.1}
				value={area}
				onChange={e => setArea(Number(e.target.value))}
				placeholder='Площа'
				required
			/>
			<input
				className='input'
				value={ownerIds.join(',')}
				onChange={e => setOwnerIds(e.target.value.split(','))}
				placeholder='ID власника(ів)'
			/>
			<div className='flex gap-2'>
				<button type='submit' className='btn'>
					Зберегти
				</button>
				<button type='button' className='btn' onClick={onCancel}>
					Скасувати
				</button>
			</div>
		</form>
	)
}
