'use client'

import { useProfile } from '@/features/profile/hooks/useProfile'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTitle,
} from '@/shared/ui/dialog'
import React, { useMemo, useState } from 'react'
import {
	CreateEstateObjectDto,
	EstateObjectEntity,
	EstateObjectType,
} from '../types/object.types'

// ----- Модалка створення/редагування -----
export const EstateObjectModal: React.FC<{
	open: boolean
	initial?: Partial<EstateObjectEntity>
	onSubmit: (dto: CreateEstateObjectDto) => void
	onCancel: () => void
}> = ({ open, initial = {}, onSubmit, onCancel }) => {
	const [name, setName] = useState(initial.name || '')
	const [type, setType] = useState<EstateObjectType>(
		initial.type || EstateObjectType.STREET
	)
	const [area, setArea] = useState(initial.area || 0.1)
	const [ownerIds, setOwnerIds] = useState<string[]>(initial.ownerIds || [])
	//const [societyId, setSocietyId] = useState(initial.societyId || '')
	const { user, isLoading } = useProfile()
	const [parentId] = useState(initial.parentId)

	// Знаходимо перший societyId де юзер менеджер (адаптуй під свою структуру!)
	const firstManagerSocietyId = useMemo(() => {
		if (!user) return ''
		// Приклад для структури: [{ id, name, role }]
		if (Array.isArray(user.societies)) {
			const found = user.societies.find((s: any) => s.role === 'MANAGER')
			return found?.id || ''
		}
		return ''
	}, [user])

	const societyId = initial.societyId || firstManagerSocietyId || ''

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		onSubmit({
			name,
			type,
			area,
			ownerIds,
			societyId,
			parentId,
		})
	}

	return (
		<Dialog open={open} onOpenChange={onCancel}>
			<DialogContent className='bg-zinc-900 border-zinc-700 text-zinc-100'>
				<DialogTitle>
					{initial && initial.id ? 'Редагувати' : 'Створити'} обʼєкт
				</DialogTitle>
				<form onSubmit={handleSubmit} className='flex flex-col gap-4 py-2'>
					<input
						className='input bg-zinc-800 text-zinc-100 border border-zinc-700'
						placeholder='Назва/Номер'
						value={name}
						onChange={e => setName(e.target.value)}
						required
					/>
					<select
						className='input bg-zinc-800 text-zinc-100 border border-zinc-700'
						value={type}
						onChange={e => setType(e.target.value as EstateObjectType)}
						required
					>
						<option value='STREET'>Вулиця</option>
						<option value='ENTRANCE'>Під’їзд</option>
						<option value='PLOT'>Ділянка</option>
						<option value='APARTMENT'>Квартира</option>
					</select>
					<input
						className='input bg-zinc-800 text-zinc-100 border border-zinc-700'
						type='number'
						min={0.1}
						step='0.1'
						value={area}
						onChange={e => setArea(Number(e.target.value))}
						placeholder='Площа'
						required
					/>
					<input
						className='input bg-zinc-800 text-zinc-100 border border-zinc-700'
						value={ownerIds.join(',')}
						onChange={e =>
							setOwnerIds(
								e.target.value
									.split(',')
									.map(str => str.trim())
									.filter(Boolean)
							)
						}
						placeholder='ID власників через кому'
					/>
					<input
						className='input bg-zinc-900 text-zinc-400 border border-zinc-700'
						value={societyId}
						readOnly
						disabled
						placeholder='Society ID'
					/>
					<DialogFooter className='flex gap-2 pt-2'>
						<button
							type='button'
							onClick={onCancel}
							className='btn bg-zinc-700 text-zinc-100'
						>
							Скасувати
						</button>
						<button
							type='submit'
							className='btn bg-indigo-600 hover:bg-indigo-500 text-zinc-100'
						>
							Зберегти
						</button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	)
}
