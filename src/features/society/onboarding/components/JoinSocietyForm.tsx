// src/features/society/onboarding/components/JoinSocietyForm.tsx

import { useState } from 'react'
import { useRouter } from 'next/router'
import { Input } from '@shared/components/Input'
import { Button } from '@shared/components/Button'
import { useJoinSociety } from '../hooks/useJoinSociety'
import { JoinSocietyDto } from '../types/society.types'

export function JoinSocietyForm() {
	const router = useRouter()
	const [inviteToken, setInviteToken] = useState('')
	const { mutateAsync, isLoading, error } = useJoinSociety()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await mutateAsync({ token: inviteToken } as JoinSocietyDto, {
			onSuccess: () => router.replace('/dashboard'),
		})
	}

	return (
		<form className='space-y-6' onSubmit={handleSubmit}>
			<Input
				label='Інвайт-код або токен'
				value={inviteToken}
				onChange={e => setInviteToken(e.target.value)}
				required
			/>
			{error && <div className='text-red-500 text-sm'>{error.message}</div>}
			<Button
				type='submit'
				variant='primary'
				size='lg'
				className='w-full'
				disabled={isLoading}
				loading={isLoading}
			>
				Приєднатись
			</Button>
		</form>
	)
}
