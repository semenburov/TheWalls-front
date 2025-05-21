'use client'
import { motion } from 'framer-motion'
import { Button } from '../../../../shared/ui/Button'
import { LogoSvg } from '../../../../shared/ui/LogoSvg'
export const HeroSection = () => (
	<section className='relative flex flex-col items-center justify-center min-h-[90vh] py-32 px-4 bg-transparent overflow-hidden font-sans'>
		<motion.div
			initial={{ opacity: 0, scale: 0.95, y: 40 }}
			animate={{ opacity: 1, scale: 1, y: 0 }}
			transition={{ duration: 1.1, ease: 'easeOut' }}
			className='z-10 max-w-4xl w-full mx-auto px-12 py-16 rounded-[2.5rem] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl text-center'
		>
			<LogoSvg width={110} height={150} isCompanyName={true} isSlogan={true} />
			<p className='text-2xl md:text-3xl mb-8 text-neutral-200/90 font-sans'>
				<span className='font-medium'>
					Онлайн-облік та керування нерухомістю.
					<br /> Прозоро. Зручно. Сучасно.
				</span>
			</p>
			<Button variant='primary' href='/auth/register' className='mt-2'>
				Почати безкоштовно
			</Button>
		</motion.div>
		{/* Декоративні градієнтні blur-елементи */}
		<div className='absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-br from-fuchsia-400/40 via-cyan-400/30 to-blue-500/30 rounded-full blur-3xl opacity-80 -z-10 animate-pulse' />
		<div className='absolute bottom-[-60px] right-[-100px] w-[400px] h-[240px] bg-gradient-to-br from-cyan-400/30 to-blue-500/20 rounded-full blur-3xl opacity-70 -z-10' />
	</section>
)
