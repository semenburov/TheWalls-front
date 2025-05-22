'use client' // Директива Next.js: компонент рендериться лише на клієнті

import { Button } from '@shared/components/Button' // Універсальна кнопка (з підтримкою variant, href тощо)
import { LogoSvg } from '@shared/components/LogoSvg' // SVG-логотип компанії
import { motion } from 'framer-motion' // Бібліотека для анімацій React-компонентів

/**
 * HeroSection — головна секція (hero) на стартовій сторінці.
 * Містить логотип, слоган, короткий опис і кнопку для реєстрації.
 * Використовує framer-motion для плавної анімації появи.
 * Має декоративні градієнтні blur-елементи для сучасного вигляду.
 */
export const HeroSection = () => (
	<section
		className='relative flex flex-col items-center justify-center min-h-[90vh] py-32 px-4 bg-transparent overflow-hidden font-sans'
		// relative — для позиціонування декоративних елементів
		// flex flex-col items-center justify-center — центрування контенту
		// min-h-[90vh] — секція займає мінімум 90% висоти вікна
		// py-32 px-4 — великі відступи
		// overflow-hidden — приховує вихідні за межі елементи (blur-градієнти)
	>
		<motion.div
			initial={{ opacity: 0, scale: 0.95, y: 40 }} // Початковий стан анімації: прозорість 0, зменшення, зміщення вниз
			animate={{ opacity: 1, scale: 1, y: 0 }} // Кінцевий стан: повна видимість, нормальний розмір, без зміщення
			transition={{ duration: 1.1, ease: 'easeOut' }} // Тривалість і тип анімації
			className='z-10 max-w-4xl w-full mx-auto px-12 py-16 rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl text-center'
			// z-10 — поверх декоративних елементів
			// max-w-4xl w-full mx-auto — ширина та центрування
			// px-12 py-16 — великі внутрішні відступи
			// rounded-[2.5rem] — великі закруглення
			// bg-white/10 backdrop-blur-2xl — напівпрозорий фон з блюром
			// border, shadow-2xl — рамка і тінь
			// text-center — центрування тексту
		>
			<LogoSvg width={110} height={150} isCompanyName={true} isSlogan={true} />
			{/* SVG-логотип з назвою компанії та слоганом */}

			<p className='text-2xl md:text-3xl mb-8 text-neutral-200/90 font-sans'>
				<span className='font-medium'>
					Онлайн-облік та керування нерухомістю.
					<br /> Прозоро. Зручно. Сучасно.
				</span>
			</p>
			{/* Короткий опис/слоган платформи */}

			<Button variant='primary' href='/auth/register' className='mt-2'>
				Почати безкоштовно
			</Button>
			{/* Кнопка для переходу на сторінку реєстрації */}
		</motion.div>
		{/* Декоративні градієнтні blur-елементи */}
		<div className='absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-br from-fuchsia-400/40 via-cyan-400/30 to-blue-500/30 rounded-full blur-3xl opacity-80 -z-10 animate-pulse' />
		{/* Великий розмитий градієнтний овал у верхній частині секції */}
		<div className='absolute bottom-[-60px] right-[-100px] w-[400px] h-[240px] bg-gradient-to-br from-cyan-400/30 to-blue-500/20 rounded-full blur-3xl opacity-70 -z-10' />
		{/* Менший розмитий градієнтний овал у нижній частині секції */}
	</section>
)
