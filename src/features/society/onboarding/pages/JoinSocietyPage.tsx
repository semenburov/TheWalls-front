// src/features/society/onboarding/pages/JoinSocietyPage.tsx

import { Card } from '@shared/components/Card'
import { JoinSocietyForm } from '../components/JoinSocietyForm'

export default function JoinSocietyPage() {
	return (
		<div className='flex flex-col items-center justify-center h-full p-6'>
			<Card className='max-w-md w-full p-8'>
				<div className='text-xl font-semibold mb-4'>
					Приєднатись до товариства
				</div>
				<JoinSocietyForm />
			</Card>
		</div>
	)
}
