import { ManagerContent } from '@/features/manager/components/ManagerContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Manager content',
}

export default function ManagerPage() {
	return <ManagerContent />
}
