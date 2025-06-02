'use client'

import React, { useState } from 'react'
import {
	useCreateEstateObject,
	useDeleteEstateObject,
	useEstateObjects,
	useUpdateEstateObject,
} from '../hooks/useEstateObjects'
import {
	CreateEstateObjectDto,
	EstateObjectEntity,
} from '../types/object.types'
import { EstateObjectModal } from './EstateObjectModal'
import { EstateObjectToolbar } from './EstateObjectToolbar'
import { EstateObjectTree } from './EstateObjectTree'

export const EstateObjectsPanel: React.FC = () => {
	const [filter, setFilter] = useState({})
	const [editing, setEditing] = useState<null | EstateObjectEntity>(null)
	const [addingParent, setAddingParent] = useState<null | EstateObjectEntity>(
		null
	)
	const [showForm, setShowForm] = useState(false)

	const { data: objects = [] } = useEstateObjects(filter)
	const create = useCreateEstateObject()
	const update = useUpdateEstateObject()
	const remove = useDeleteEstateObject()
	const [open, setOpen] = useState<Record<string, boolean>>({})

	const handleSubmit = (dto: CreateEstateObjectDto) => {
		if (editing) {
			update.mutate(
				{ id: editing.id, dto },
				{ onSuccess: () => setShowForm(false) }
			)
		} else if (addingParent) {
			create.mutate(
				{ ...dto, parentId: addingParent.id },
				{ onSuccess: () => setShowForm(false) }
			)
		} else {
			create.mutate(dto, { onSuccess: () => setShowForm(false) })
		}
		setEditing(null)
		setAddingParent(null)
	}

	return (
		<div className='w-full max-w-3xl mx-auto py-6'>
			<EstateObjectToolbar
				filter={filter}
				setFilter={setFilter}
				onAdd={() => {
					setShowForm(true)
					setEditing(null)
					setAddingParent(null)
				}}
				onClear={() => setFilter({})}
			/>
			<div className='bg-zinc-900 rounded-2xl shadow-lg p-4 border border-zinc-700'>
				<EstateObjectTree
					objects={objects}
					onEdit={obj => {
						setEditing(obj)
						setShowForm(true)
					}}
					onAdd={parent => {
						setAddingParent(parent)
						setShowForm(true)
						// Розкриваємо гілку, якщо користувач натискає “додати дочірній”
						setOpen(prev => ({ ...prev, [parent.id]: true }))
					}}
					onDelete={obj => remove.mutate(obj.id)}
				/>
			</div>
			{showForm && (
				<EstateObjectModal
					open={showForm}
					initial={
						editing ||
						(addingParent
							? { parentId: addingParent.id, societyId: addingParent.societyId }
							: {})
					}
					onSubmit={handleSubmit}
					onCancel={() => {
						setShowForm(false)
						setEditing(null)
						setAddingParent(null)
					}}
				/>
			)}
		</div>
	)
}
