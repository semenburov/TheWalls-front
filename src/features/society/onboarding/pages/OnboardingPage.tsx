// src/features/society/onboarding/pages/OnboardingPage.tsx
'use client'
import { Card } from '@shared/components/Card'
import { Button } from '@shared/components/Button'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
	const router = useRouter()

	return (
		<div className='flex flex-col items-center justify-center h-full p-6'>
			<Card className='max-w-md w-full text-center p-8 space-y-8'>
				<div className='text-2xl font-bold mb-2'>Ласкаво просимо!</div>
				<div className='text-base mb-8'>
					Ви ще не належите до жодного товариства.
					<br />
					Оберіть, як почати:
				</div>
				<div className='flex flex-col gap-4'>
					<Button
						size='lg'
						variant='primary'
						onClick={() => router.push('/society/onboarding/create')}
					>
						Створити нове товариство
					</Button>
					<Button
						size='lg'
						variant='outline'
						onClick={() => router.push('/society/onboarding/join')}
					>
						Приєднатись за QR/кодом
					</Button>
				</div>
			</Card>
		</div>
	)
}
