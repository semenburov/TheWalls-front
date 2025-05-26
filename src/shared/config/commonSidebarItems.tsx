// src/shared/config/sidebarItems.ts

import { CgProfile } from 'react-icons/cg'
import { MdDomain, MdStars } from 'react-icons/md'
export const commonSidebarItems = [
	{
		label: 'Мій профіль',
		href: '/profile',
		icon: <CgProfile size={20} />,
		roles: ['USER', 'MANAGER', 'ADMIN'],
		hidden: false, // Показуємо завжди, якщо користувач має роль
	},
	{
		label: 'Стартова onboarding',
		href: '/society/onboarding',
		icon: <MdStars size={20} />,
		roles: ['user', 'manager'],
		hidden: true, // тільки якщо societies.length === 0
	},
]
