// src/shared/config/managerSidebarItems.ts

import { MdDashboard, MdDomain, MdHome } from 'react-icons/md'

export const managerSidebarItems = [
	{
		label: 'Головна',
		href: '/main',
		icon: <MdDomain size={20} />,
		roles: ['USER', 'MANAGER', 'ADMIN'],
		hidden: false, // Приховуємо, якщо користувач НЕ має суспільства
	},
	{
		label: 'Dashboard',
		href: '/dashboard',
		icon: <MdDashboard size={20} />,
		roles: ['user', 'manager'],
		hidden: false, // Показуємо завжди, якщо користувач має роль
	},
	{
		label: 'Обʼєкти',
		href: '/object',
		icon: <MdHome size={20} />,
		roles: ['user', 'manager'],
		hidden: false, // Показуємо завжди, якщо користувач має роль
	},
]
