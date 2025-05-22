'use client'
// src/components/organisms/FeaturesSection.tsx

import { motion } from 'framer-motion' // Бібліотека для анімацій React-компонентів
import React from 'react'
import { FeatureCard } from './FeatureCard' // Картка для відображення окремої фічі

// Масив фіч (можливостей) платформи для відображення у секції
const features = [
	{
		title: 'Онлайн-облік', // Назва фічі
		description:
			'Автоматичний облік показників, платежів та боргів. Простий облік всіх операцій для мешканців та адміністраторів.', // Опис фічі
		icon: '📊', // Іконка (emoji)
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
 *
 * @returns {JSX.Element} - Секція з переліком фіч платформи
 */
export const FeaturesSection: React.FC = () => (
	<motion.section
		className='relative py-24 px-4 bg-transparent font-sans'
		initial={{ opacity: 0, y: 60 }} // Початковий стан секції: прозорість 0, зміщення вниз
		whileInView={{ opacity: 1, y: 0 }} // При появі у viewport: з'являється і піднімається
		viewport={{ once: true }} // Анімація лише один раз при появі у viewport
		transition={{ duration: 0.8, ease: 'easeOut' }} // Тривалість і тип анімації
	>
		<div className='max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10 items-stretch'>
			{/* 
                max-w-6xl mx-auto — максимальна ширина та центрування
                grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 — адаптивна сітка (1/2/4 колонки)
                gap-10 — відступи між картками
                items-stretch — картки розтягуються на всю висоту рядка
            */}
			{features.map((f, i) => (
				<motion.div
					key={f.title}
					initial={{ opacity: 0, y: 40 }} // Початковий стан картки: прозорість 0, зміщення вниз
					whileInView={{ opacity: 1, y: 0 }} // При появі у viewport: з'являється і піднімається
					viewport={{ once: true }} // Анімація лише один раз для кожної картки
					transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }} // Stagger-ефект: затримка для кожної наступної картки
				>
					<FeatureCard {...f} />{' '}
					{/* Відображення картки фічі з іконкою, заголовком і описом */}
				</motion.div>
			))}
		</div>
	</motion.section>
)
