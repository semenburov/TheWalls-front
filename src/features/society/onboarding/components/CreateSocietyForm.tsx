// src/features/society/onboarding/components/CreateSocietyForm.tsx
'use client'
import { Button } from '@shared/components/Button'
import { Input } from '@shared/components/Input'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useCreateSociety } from '../hooks/useCreateSociety'
import { CreateSocietyDto } from '../types/society.types'

export function CreateSocietyForm() {
	const router = useRouter()
	const [name, setName] = useState('')
	const [type, setType] = useState('')

	const [email, setEmail] = useState('')

	const [phone, setPhone] = useState('')

	const [description, setDesc] = useState('')
	const [address, setAddress] = useState('')
	const { mutateAsync, isLoading, error } = useCreateSociety()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		await mutateAsync(
			{ name, email, phone, type, description, address } as CreateSocietyDto,
			{
				onSuccess: () => router.replace('/main'),
			}
		)
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
				label='Email товариства'
				value={email}
				onChange={e => setEmail(e.target.value)}
				required
			/>
			<Input
				label='Телефон товариства'
				value={phone}
				onChange={e => setPhone(e.target.value)}
				required
			/>
			<Input
				label='Адреса'
				value={address}
				onChange={e => setAddress(e.target.value)}
			/>
			<Input
				label='Короткий опис товариства'
				value={description}
				onChange={e => setDesc(e.target.value)}
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
				{isLoading ? 'Створюється...' : 'Створити'}
			</Button>
		</form>
	)
}
