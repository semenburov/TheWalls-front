'use client'
import { motion } from 'framer-motion'
import { Button } from '../../../../shared/components/Button'

export const CTASection = () => (
	<motion.section
		className='relative py-16 px-4 flex flex-col items-center justify-center font-sans'
		initial={{ opacity: 0, y: 40 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true }}
		transition={{ duration: 0.7, ease: 'easeOut' }}
	>
		<div className='relative max-w-xl w-full mx-auto p-10 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl text-center'>
			<h3 className='text-2xl md:text-4xl font-extrabold mb-3 text-white drop-shadow-lg font-sans'>
				Готові спробувати?
			</h3>
			<p className='mb-6 text-neutral-100/80 text-lg font-sans'>
				Створіть акаунт за 1 хвилину і отримайте повний доступ безкоштовно!
			</p>
			<Button variant='primary' href='/auth/register'>
				Зареєструватися
			</Button>
		</div>
		<div className='absolute top-4 right-1/2 w-[280px] h-[160px] bg-gradient-to-br from-cyan-400/30 to-blue-500/10 rounded-full blur-2xl opacity-60 -z-1' />
	</motion.section>
)
