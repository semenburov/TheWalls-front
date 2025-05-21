'use client'

import styles from '@features/auth/AuthForm.module.scss'
import { AuthInput } from '@/features/auth/components/ui/AuthInput'
import { AuthWrapper } from '@features/auth/components/AuthWrapper'
import { useState, type FormEvent } from 'react'
import { useEmailForm } from '../../hooks/useEmailForm'
import { AuthSubmitButton } from '../ui/AuthSubmitButton'

export default function SocialEmailForm() {
	const [email, setEmail] = useState('')
	const { updateEmail, isLoading } = useEmailForm()

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		updateEmail(email)
	}

	return (
		<AuthWrapper heading={'Provide Your Email'}>
			<form onSubmit={handleSubmit} className='space-y-4'>
				<AuthInput
					label='Email'
					type='email'
					value={email}
					placeholder='Enter email: '
					onChange={e => setEmail(e.target.value)}
					required
					className={styles['input-field']}
				/>
				<AuthSubmitButton isLoading={isLoading} label='Submit' />
			</form>
		</AuthWrapper>
	)
}
