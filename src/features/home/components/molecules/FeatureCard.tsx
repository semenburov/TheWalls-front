import React from 'react'
import { Icon } from '../../../../shared/components/Icon'

interface FeatureCardProps {
	title: string
	description: string
	icon: React.ReactNode
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
	title,
	description,
	icon,
}) => (
	<div
		className='h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl
      transition-all duration-200 hover:bg-white/20 hover:scale-105 flex flex-col items-center md:items-start font-sans'
	>
		<Icon>{icon}</Icon>
		<h3 className='text-2xl font-extrabold mb-2 mt-4 font-sans'>{title}</h3>
		<p className='text-neutral-100/90 font-sans flex-1'>{description}</p>
	</div>
)
