// src/features/society/onboarding/pages/CreateSocietyPage.tsx

import { Card } from '@shared/components/Card'
import { CreateSocietyForm } from '../components/CreateSocietyForm'

export default function CreateSocietyPage() {
	return (
		<div className='flex flex-col items-center justify-center h-full p-6'>
			<Card className='max-w-md w-full p-8'>
				<div className='text-xl font-semibold mb-4'>
					Створити нове товариство
				</div>
				<CreateSocietyForm />
			</Card>
		</div>
	)
}
