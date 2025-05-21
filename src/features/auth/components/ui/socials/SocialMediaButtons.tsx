'use client'
import { BACKEND_SOCIAL_AUTH_URL } from '@/constants'
import { MiniLoader } from '@/shared/components/MiniLoader'
import React, { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa'
import { twMerge } from 'tailwind-merge'
import { socialsList, type TSocials } from './social-list.data'

// Приклад списку соцмереж (залежить від твоєї реалізації social-list.data)
const list = socialsList()

export const SocialMediaButtons: React.FC = () => {
	const [loadingId, setLoadingId] = useState<TSocials | null>(null)

	const handleRedirect = (id: TSocials) => {
		setLoadingId(id)
		window.location.href = `${BACKEND_SOCIAL_AUTH_URL}/${id}`
	}

	const icons = {
		google: <FaGoogle className='text-base mr-2' />,
		github: <FaGithub className='text-base mr-2' />,
	}
	const texts = {
		google: 'Sign in with Google',
		github: 'Sign in with GitHub',
	}

	return (
		<div className='flex flex-col gap-3'>
			{list.map(({ id }) => (
				<button
					key={id}
					onClick={() => handleRedirect(id)}
					disabled={loadingId === id}
					className={twMerge(
						'w-full flex items-center justify-center gap-2 border border-neutral-600 text-white rounded-xl py-2 px-3 font-semibold hover:bg-neutral-900 transition',
						loadingId === id && 'bg-white/80 cursor-not-allowed'
					)}
					type='button'
				>
					{loadingId === id ? (
						<MiniLoader width={20} height={20} isDark />
					) : (
						<>
							{icons[id as keyof typeof icons]}
							{texts[id as keyof typeof texts] ?? id}
						</>
					)}
				</button>
			))}
		</div>
	)
}
