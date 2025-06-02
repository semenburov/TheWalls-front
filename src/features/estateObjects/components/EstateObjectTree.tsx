'use client'

import { ChevronDown, ChevronRight, User } from 'lucide-react'
import React, { useState } from 'react'
import { EstateObjectEntity } from '../types/object.types'
import { NodeIcon } from './NodeIcon'
// ----- Одне дерево -----
export const EstateObjectTree: React.FC<{
	objects: EstateObjectEntity[]
	onEdit: (obj: EstateObjectEntity) => void
	onAdd: (parent: EstateObjectEntity) => void
	onDelete: (obj: EstateObjectEntity) => void
}> = ({ objects, onEdit, onAdd, onDelete }) => {
	const [open, setOpen] = useState<Record<string, boolean>>({})

	const getChildren = (parentId?: string) =>
		objects.filter(obj =>
			parentId == null ? obj.parentId == null : obj.parentId === parentId
		)

	const renderNode = (obj: EstateObjectEntity) => {
		const children = getChildren(obj.id)
		const isOpen = open[obj.id] || false
		return (
			<li key={obj.id}>
				<div className='flex items-center py-1 px-2 rounded hover:bg-zinc-800 transition group'>
					<button
						onClick={() =>
							children.length && setOpen(o => ({ ...o, [obj.id]: !isOpen }))
						}
						className={`mr-1 opacity-70 focus:outline-none ${
							!children.length ? 'invisible' : ''
						}`}
						tabIndex={-1}
					>
						{children.length ? (
							isOpen ? (
								<ChevronDown size={16} className='text-zinc-400' />
							) : (
								<ChevronRight size={16} className='text-zinc-400' />
							)
						) : (
							<span className='inline-block w-4' />
						)}
					</button>
					<NodeIcon type={obj.type} />
					<span className='ml-2 font-medium text-zinc-100'>{obj.name}</span>
					<span className='ml-2 text-xs text-zinc-400'>{obj.area} м²</span>
					{obj.ownerIds.length > 0 && (
						<span className='ml-3 flex gap-1 items-center'>
							<User size={14} className='text-emerald-400' />
							{obj.ownerIds.map(id => (
								<span className='text-xs text-zinc-400' key={id}>
									{id}
								</span>
							))}
						</span>
					)}
					<div className='ml-auto flex gap-1 opacity-0 group-hover:opacity-100 transition'>
						<button
							onClick={() => onEdit(obj)}
							className='icon-btn'
							title='Редагувати'
						>
							✏️
						</button>
						<button
							onClick={() => onAdd(obj)}
							className='icon-btn'
							title='Додати дочірній'
						>
							➕
						</button>
						<button
							onClick={() => onDelete(obj)}
							className='icon-btn text-red-400'
							title='Видалити'
						>
							🗑️
						</button>
					</div>
				</div>
				{isOpen && children.length > 0 && (
					<ul className='ml-5 border-l border-zinc-700'>
						{children.map(renderNode)}
					</ul>
				)}
			</li>
		)
	}

	return <ul className='space-y-1'>{getChildren().map(renderNode)}</ul>
}

/* import React from 'react'
import { EstateObjectEntity } from '../types/object.types'

interface EstateObjectTreeProps {
	objects: EstateObjectEntity[]
	onEdit: (obj: EstateObjectEntity) => void
	onAdd: (parent: EstateObjectEntity) => void
	onDelete: (obj: EstateObjectEntity) => void
}

const getChildren = (list: EstateObjectEntity[], parentId?: string) =>
	list.filter(obj => obj.parentId === parentId)

export const EstateObjectTree: React.FC<EstateObjectTreeProps> = ({
	objects,
	onEdit,
	onAdd,
	onDelete,
}) => {
	const renderNode = (obj: EstateObjectEntity) => (
		<li key={obj.id} className='ml-4'>
			<div className='flex items-center gap-2'>
				<span>{obj.type}</span>
				<span>{obj.name}</span>
				<span>{obj.area} м²</span>
				<span>{obj.ownerIds.join(', ')}</span>
				<button onClick={() => onEdit(obj)}>✏️</button>
				<button onClick={() => onAdd(obj)}>➕</button>
				<button onClick={() => onDelete(obj)}>🗑️</button>
			</div>
			{getChildren(objects, obj.id).length > 0 && (
				<ul>{getChildren(objects, obj.id).map(renderNode)}</ul>
			)}
		</li>
	)
	return <ul>{getChildren(objects).map(renderNode)}</ul>
}
 */
