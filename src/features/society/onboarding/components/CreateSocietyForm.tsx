// src/features/society/onboarding/components/CreateSocietyForm.tsx

import { useState } from 'react'
import { useRouter } from 'next/router'
import { Input } from '@shared/components/Input'
import { Button } from '@shared/components/Button'
import { useCreateSociety } from '../hooks/useCreateSociety'
import { CreateSocietyDto } from '../types/society.types'

export function CreateSocietyForm() {
	const router = useRouter()
	const [name, setName] = useState('')
	const [type, setType] = useState('')
	const [address, setAddress] = useState('')
	const { mutateAsync, isLoading, error } = useCreateSociety()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await mutateAsync({ name, type, address } as CreateSocietyDto, {
			onSuccess: () => router.replace('/dashboard'),
		})
	}

	return (
		<form className='space-y-6' onSubmit={handleSubmit}>
			<Input
				label='Назва товариства'
				value={name}
				onChange={e => setName(e.target.value)}
				required
			/>
			<Input
				label='Тип товариства (ОСББ, дачний кооператив...)'
				value={type}
				onChange={e => setType(e.target.value)}
				required
			/>
			<Input
				label='Адреса'
				value={address}
				onChange={e => setAddress(e.target.value)}
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
				Створити
			</Button>
		</form>
	)
}
