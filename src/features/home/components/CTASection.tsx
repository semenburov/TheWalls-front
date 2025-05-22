'use client' // Директива Next.js: компонент рендериться лише на клієнті

import { motion } from 'framer-motion' // Бібліотека для анімацій React-компонентів
import { Button } from '../../../shared/components/Button' // Універсальна кнопка (з підтримкою variant, href тощо)

/**
 * CTASection — секція заклику до дії ("Готові спробувати?") на головній сторінці.
 * Використовує framer-motion для плавної анімації появи.
 * Містить короткий текст і кнопку для переходу до реєстрації.
 */
export const CTASection = () => (
	<motion.section
		className='relative py-16 px-4 flex flex-col items-center justify-center font-sans'
		initial={{ opacity: 0, y: 40 }} // Початковий стан анімації: прозорість 0, зміщення вниз
		whileInView={{ opacity: 1, y: 0 }} // Коли секція потрапляє у viewport: з'являється і піднімається
		viewport={{ once: true }} // Анімація лише один раз при появі у viewport
		transition={{ duration: 0.7, ease: 'easeOut' }} // Тривалість і тип анімації
	>
		<div className='relative max-w-xl w-full mx-auto p-10 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl text-center'>
			{/* Основний контейнер: напівпрозорий фон, блюр, тінь, закруглені кути, центрування тексту */}
			<h3 className='text-2xl md:text-4xl font-extrabold mb-3 text-white drop-shadow-lg font-sans'>
				Готові спробувати?
			</h3>
			{/* Заголовок секції CTA */}

			<p className='mb-6 text-neutral-100/80 text-lg font-sans'>
				Створіть акаунт за 1 хвилину і отримайте повний доступ безкоштовно!
			</p>
			{/* Короткий підзаголовок/опис переваги */}

			<Button variant='primary' href='/auth/register'>
				Зареєструватися
			</Button>
			{/* Кнопка для переходу на сторінку реєстрації */}
		</div>
		{/* Декоративний елемент: розмитий градієнтний овал позаду секції */}
		<div className='absolute top-4 right-1/2 w-[280px] h-[160px] bg-gradient-to-br from-cyan-400/30 to-blue-500/10 rounded-full blur-2xl opacity-60 -z-1' />
	</motion.section>
)
