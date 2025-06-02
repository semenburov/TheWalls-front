'use client'
import React, { useState } from 'react'
import { EstateObjectsPanel } from '../components/EstateObjectsPanel'
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

export const EstateObjectsPage: React.FC = () => {
	const [filter, setFilter] = useState({})
	const [editing, setEditing] = useState<null | EstateObjectEntity>(null)
	const [addingParent, setAddingParent] = useState<null | EstateObjectEntity>(
		null
	)
	const [showForm, setShowForm] = useState(false)

	const { data: objects = [], refetch } = useEstateObjects(filter)
	const create = useCreateEstateObject()
	const update = useUpdateEstateObject()
	const remove = useDeleteEstateObject()

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

	return <EstateObjectsPanel />
}
/* <div>
			<EstateObjectFilter
				value={filter}
				onChange={setFilter}
				onClear={() => setFilter({})}
			/>
			<button
				className='btn'
				onClick={() => {
					setShowForm(true)
					setEditing(null)
					setAddingParent(null)
				}}
			>
				Додати обʼєкт
			</button>
			<EstateObjectTree
				objects={objects}
				onEdit={obj => {
					setEditing(obj)
					setShowForm(true)
				}}
				onAdd={parent => {
					setAddingParent(parent)
					setShowForm(true)
				}}
				onDelete={obj => remove.mutate(obj.id)}
			/>
			{showForm && (
				<EstateObjectForm
					initial={
						editing || (addingParent ? { parentId: addingParent.id } : {})
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
		 */
