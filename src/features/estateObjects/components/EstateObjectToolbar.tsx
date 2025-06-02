'use client'

import { Home } from 'lucide-react'
import React from 'react'
// ----- Toolbar (фільтри та "Додати обʼєкт") -----
export const EstateObjectToolbar: React.FC<{
	filter: any
	setFilter: (v: any) => void
	onAdd: () => void
	onClear: () => void
}> = ({ filter, setFilter, onAdd, onClear }) => (
	<div className='flex flex-col md:flex-row items-stretch md:items-center gap-2 md:gap-4 mb-4'>
		<h2 className='text-xl font-bold text-zinc-100 flex-1 flex items-center gap-2'>
			<Home size={24} className='text-indigo-400' /> Об’єкти товариства
		</h2>
		<div className='flex gap-2 flex-1'>
			<input
				className='input bg-zinc-800 text-zinc-100 border border-zinc-700'
				placeholder='Пошук...'
				value={filter.name || ''}
				onChange={e => setFilter({ ...filter, name: e.target.value })}
			/>
			<select
				className='input bg-zinc-800 text-zinc-100 border border-zinc-700'
				value={filter.type || ''}
				onChange={e => setFilter({ ...filter, type: e.target.value })}
			>
				<option value=''>Тип</option>
				<option value='STREET'>Вулиця</option>
				<option value='ENTRANCE'>Під’їзд</option>
				<option value='PLOT'>Ділянка</option>
				<option value='APARTMENT'>Квартира</option>
			</select>
			<button onClick={onClear} className='btn bg-zinc-700 text-zinc-100'>
				Очистити
			</button>
		</div>
		<button
			onClick={onAdd}
			className='btn bg-indigo-600 hover:bg-indigo-500 text-zinc-100 rounded-xl shadow-md px-4 py-2 font-bold'
		>
			+ Додати обʼєкт
		</button>
	</div>
)
