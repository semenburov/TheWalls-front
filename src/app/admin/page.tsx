import { Users } from '@/features/admin/users/Users'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Admin',
}

export default function AdminPage() {
	return <Users />
}
