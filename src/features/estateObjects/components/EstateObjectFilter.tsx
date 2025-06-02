import React from 'react'
import { EstateObjectType } from '../types/object.types'

export interface EstateObjectFilterProps {
	value: {
		name?: string
		type?: EstateObjectType
		ownerId?: string
	}
	onChange: (v: EstateObjectFilterProps['value']) => void
	onClear: () => void
}

export const EstateObjectFilter: React.FC<EstateObjectFilterProps> = ({
	value,
	onChange,
	onClear,
}) => (
	<div className='flex gap-2 p-2'>
		<input
			className='input'
			placeholder='Назва/Номер'
			value={value.name || ''}
			onChange={e => onChange({ ...value, name: e.target.value })}
		/>
		<select
			className='input'
			value={value.type || ''}
			onChange={e =>
				onChange({ ...value, type: e.target.value as EstateObjectType })
			}
		>
			<option value=''>Тип обʼєкта</option>
			<option value='STREET'>Вулиця</option>
			<option value='ENTRANCE'>Підʼїзд</option>
			<option value='PLOT'>Ділянка</option>
			<option value='APARTMENT'>Квартира</option>
		</select>
		<input
			className='input'
			placeholder='ID власника'
			value={value.ownerId || ''}
			onChange={e => onChange({ ...value, ownerId: e.target.value })}
		/>
		<button className='btn' onClick={onClear}>
			Очистити фільтри
		</button>
	</div>
)
