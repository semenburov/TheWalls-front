// src/shared/config/sidebarItems.ts

import { CgProfile } from 'react-icons/cg'
import { MdDomain, MdStars } from 'react-icons/md'
export const commonSidebarItems = [
	{
		label: 'Стартова onboarding',
		href: '/society/onboarding',
		icon: <MdStars size={20} />,
		roles: ['user', 'manager'],
		hidden: true, // тільки якщо societies.length === 0
	},
]
