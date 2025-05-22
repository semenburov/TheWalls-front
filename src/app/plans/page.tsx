import { PlansSection } from '@/features/home/components/PlansSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Plans',
	description: 'Plans...',
}

export default function PlansPage() {
	return <PlansSection />
}
