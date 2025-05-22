'use client' // Директива Next.js: компонент рендериться лише на клієнті

import React from 'react'
import { motion } from 'framer-motion' // Бібліотека для анімацій React-компонентів

/**
 * AboutSection — секція "Про платформу" на головній сторінці.
 * Використовує framer-motion для плавної анімації появи.
 * Відображає короткий опис переваг платформи TheWalls Online.
 */
export const AboutSection = () => (
	<motion.section
		className='relative py-24 px-4 bg-transparent flex justify-center items-center font-sans'
		initial={{ opacity: 0, y: 60 }} // Початковий стан анімації: прозорість 0, зміщення вниз
		whileInView={{ opacity: 1, y: 0 }} // Коли секція потрапляє у viewport: з'являється і піднімається
		viewport={{ once: true }} // Анімація лише один раз при появі у viewport
		transition={{ duration: 0.8, ease: 'easeOut' }} // Тривалість і тип анімації
	>
		<div
			className='relative max-w-3xl w-full mx-auto p-10 rounded-3xl
      bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl text-center'
			// Основний контейнер: напівпрозорий фон, блюр, тінь, закруглені кути, центрування тексту
		>
			<h2 className='text-3xl md:text-5xl font-extrabold mb-6 text-white drop-shadow font-sans'>
				Чому{' '}
				<span className='bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent'>
					TheWalls Online?
				</span>
			</h2>
			{/* Основний підзаголовок з градієнтним текстом для виділення назви платформи */}

			<p className='text-xl text-neutral-100/90 mb-4 font-sans'>
				Ми створили платформу, яка робить комунальні процеси простими та
				зрозумілими для кожного. Мінімізуйте паперову бюрократію та втрати часу,
				контролюйте фінанси та інформацію у реальному часі.
			</p>
			{/* Короткий опис місії/цінності платформи */}

			<p className='text-base text-neutral-200/80 font-sans'>
				TheWalls Online — це ваш інструмент для прозорої взаємодії між
				мешканцями та керівництвом ОСББ/кооперативу, який працює 24/7 на всіх
				пристроях.
			</p>
			{/* Додатковий опис функціоналу та переваг */}
		</div>
		{/* Декоративний елемент: розмитий градієнтний овал позаду секції */}
		<div className='absolute -top-16 left-1/2 -translate-x-1/2 w-[480px] h-[240px] bg-gradient-to-br from-blue-400/30 to-indigo-400/10 rounded-full blur-2xl opacity-70 -z-1' />
	</motion.section>
)
