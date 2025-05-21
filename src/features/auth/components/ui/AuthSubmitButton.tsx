import { MiniLoader } from '@/shared/components/MiniLoader'
import styles from '@features/auth/AuthForm.module.scss'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export const AuthSubmitButton: React.FC<{
	isLoading?: boolean
	label: string
}> = ({ isLoading, label }) => (
	<button
		type='submit'
		className={twMerge(
			styles['btn-primary'],
			'bg-primary',
			isLoading && 'opacity-75 cursor-not-allowed'
		)}
		disabled={isLoading}
	>
		{isLoading ? <MiniLoader /> : label}
	</button>
)
