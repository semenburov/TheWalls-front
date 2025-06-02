'use client'

import { DoorOpen, Home, House } from 'lucide-react'
import { EstateObjectType } from '../types/object.types'
// ----- Іконка типу об'єкта -----
export const NodeIcon = ({ type }: { type: EstateObjectType }) => {
	switch (type) {
		case 'STREET':
			return <Home className='w-4 h-4 text-indigo-400' />
		case 'APARTMENT':
			return <House className='w-4 h-4 text-violet-400' />
		case 'ENTRANCE':
			return <DoorOpen className='w-4 h-4 text-blue-400' />
		case 'PLOT':
			return <Home className='w-4 h-4 text-yellow-400' />
		default:
			return <Home className='w-4 h-4 text-zinc-400' />
	}
}
