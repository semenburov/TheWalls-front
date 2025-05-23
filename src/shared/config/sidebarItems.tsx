// src/shared/config/sidebarItems.ts

import { MdDashboard, MdHome, MdStars } from 'react-icons/md'

export const sidebarItems = [
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: <MdDashboard size={20} />,
		roles: ['user', 'manager'],
	},
	{
		label: 'Обʼєкти',
		href: '/haus',
		icon: <MdHome size={20} />,
		roles: ['user', 'manager'],
	},
	{
		label: 'Стартова onboarding',
		href: '/society/onboarding',
		icon: <MdStars size={20} />,
		roles: ['user', 'manager'],
		hidden: true, // тільки якщо societies.length === 0
	},
]
