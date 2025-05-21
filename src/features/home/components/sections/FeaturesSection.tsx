'use client'
// src/components/organisms/FeaturesSection.tsx
import { motion } from 'framer-motion'
import React from 'react'
import { FeatureCard } from '../molecules/FeatureCard'

const features = [
	{
		title: 'Онлайн-облік',
		description:
			'Автоматичний облік показників, платежів та боргів. Простий облік всіх операцій для мешканців та адміністраторів.',
		icon: '📊',
	},
	{
		title: 'Сповіщення',
		description: 'Своєчасні сповіщення про нарахування, новини, важливі події.',
		icon: '🔔',
	},
	{
		title: 'Мобільний доступ',
		description:
			'Повноцінний мобільний інтерфейс для зручної роботи з будь-якого пристрою.',
		icon: '📱',
	},
	{
		title: 'Оплата онлайн',
		description:
			'Безпечна та швидка оплата комунальних послуг прямо на сайті або у додатку.',
		icon: '💳',
	},
]

/**
 * FeaturesSection — секція з анімованою появою, glassmorphism та grid-сіткою.
 * WOW: Stagger анімація, blur background, scale-hover в картках
 */
export const FeaturesSection: React.FC = () => (
	<motion.section
		className='relative py-24 px-4 bg-transparent font-sans'
		initial={{ opacity: 0, y: 60 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{ duration: 0.8, ease: 'easeOut' }}
	>
		<div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10 items-stretch'>
			{features.map((f, i) => (
				<motion.div
					key={f.title}
					initial={{ opacity: 0, y: 40 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
				>
					<FeatureCard {...f} />
				</motion.div>
			))}
		</div>
	</motion.section>
)
