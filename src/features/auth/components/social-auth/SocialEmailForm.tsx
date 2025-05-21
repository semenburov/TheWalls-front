'use client'

import { useState, type FormEvent } from 'react'
import styles from '@features/auth/AuthForm.module.scss'

import { MiniLoader } from '@/shared/ui/MiniLoader'
import { twMerge } from 'tailwind-merge'
import { AuthPageWrapper } from '../../AuthPageWrapper'
import { useEmailForm } from '../../hooks/useEmailForm'

export default function SocialEmailForm() {
	const [email, setEmail] = useState('')
	const { updateEmail, isLoading } = useEmailForm()

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		updateEmail(email)
	}

	return (
		<AuthPageWrapper heading={'Provide Your Email'}>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<div>
					<label className='block text-gray-600'>Email</label>
					<input
						type='email'
						value={email}
						placeholder='Enter email:'
						onChange={e => setEmail(e.target.value)}
						required
						className={styles['input-field']}
					/>
				</div>

				<div>
					<button
						type='submit'
						className={twMerge(
							styles['btn-primary'],
							'bg-primary',
							isLoading && 'opacity-75 cursor-not-allowed'
						)}
						disabled={isLoading}
					>
						{isLoading ? <MiniLoader /> : 'Submit'}
					</button>
				</div>
			</form>
		</AuthPageWrapper>
	)
}
