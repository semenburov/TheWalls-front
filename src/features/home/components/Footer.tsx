import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6' // Іконки соцмереж (Twitter/X, Github, LinkedIn, Discord)
import { LogoSvg } from '../../../shared/components/LogoSvg' // SVG-логотип компанії

/**
 * Footer — компонент підвалу сайту.
 * Містить логотип, соціальні іконки, навігаційні посилання та декоративний градієнт.
 */
export const Footer = () => (
	<footer
		className='
            w-full relative z-10
            bg-white/5
            backdrop-blur-[8px]
            border-t border-white/15
            py-8 px-0 font-sans
        '
	>
		<div className='max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12'>
			{/* Блок компанії: логотип, назва, копірайт, соцмережі */}
			<div className='flex flex-col gap-5'>
				<div className='flex items-center gap-2'>
					{/* SVG-логотип компанії */}
					<LogoSvg width={50} height={70} />
					<span className='font-black text-2xl tracking-tight text-white'>
						TheWalls Online
					</span>
				</div>
				<div className='text-sm text-neutral-400'>
					TheWalls Online, Inc, © {new Date().getFullYear()}
				</div>
				{/* Соціальні іконки з посиланнями */}
				<div className='flex gap-4 mt-2'>
					<a
						href='https://linkedin.com/'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='Linkedin'
					>
						<FaLinkedin className='w-6 h-6 text-neutral-400 hover:text-cyan-400 transition' />
					</a>
					<a
						href='https://github.com/'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='Github'
					>
						<FaGithub className='w-6 h-6 text-neutral-400 hover:text-cyan-400 transition' />
					</a>
					<a
						href='https://twitter.com/'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='Twitter/X'
					>
						<FaXTwitter className='w-6 h-6 text-neutral-400 hover:text-cyan-400 transition' />
					</a>
					<a
						href='https://discord.com/'
						target='_blank'
						rel='noopener noreferrer'
						aria-label='Discord'
					>
						<FaDiscord className='w-6 h-6 text-neutral-400 hover:text-cyan-400 transition' />
					</a>
				</div>
			</div>
			{/* Блок PRODUCT: посилання на функціонал/спільноту/зворотній зв'язок */}
			<div>
				<div className='text-white font-bold mb-3 tracking-wide text-sm'>
					PRODUCT
				</div>
				<ul className='space-y-2'>
					<li>
						<a
							className='text-neutral-400 hover:text-cyan-400 transition'
							href='/features'
						>
							Features
						</a>
					</li>
					<li>
						<a
							className='text-neutral-400 hover:text-cyan-400 transition'
							href='/community'
						>
							Community
						</a>
					</li>
					<li>
						<a
							className='text-neutral-400 hover:text-cyan-400 transition'
							href='/feedback'
						>
							Feedback
						</a>
					</li>
				</ul>
			</div>
			{/* Блок COMPANY: посилання на сторінки про компанію, вакансії, підтримку */}
			<div>
				<div className='text-white font-bold mb-3 tracking-wide text-sm'>
					COMPANY
				</div>
				<ul className='space-y-2'>
					<li>
						<a
							className='text-neutral-400 hover:text-cyan-400 transition'
							href='/about'
						>
							About
						</a>
					</li>
					<li>
						<a
							className='text-neutral-400 hover:text-cyan-400 transition'
							href='/careers'
						>
							Careers
						</a>
					</li>
					<li>
						<a
							className='text-neutral-400 hover:text-cyan-400 transition'
							href='/support'
						>
							Support
						</a>
					</li>
				</ul>
			</div>
			{/* Блок LEGAL: посилання на політики та умови */}
			<div>
				<div className='text-white font-bold mb-3 tracking-wide text-sm'>
					LEGAL
				</div>
				<ul className='space-y-2'>
					<li>
						<a
							className='text-neutral-400 hover:text-cyan-400 transition'
							href='/privacy'
						>
							Privacy Policy
						</a>
					</li>
					<li>
						<a
							className='text-neutral-400 hover:text-cyan-400 transition'
							href='/terms'
						>
							Terms of Use
						</a>
					</li>
					<li>
						<a
							className='text-neutral-400 hover:text-cyan-400 transition'
							href='/cookies'
						>
							Cookie Policy
						</a>
					</li>
				</ul>
			</div>
		</div>
		{/* Декоративний градієнтний fade для плавного переходу у фон */}
		<div
			className='absolute left-0 right-0 bottom-0 h-16 pointer-events-none select-none'
			style={{
				background:
					'linear-gradient(to top, rgba(15,22,30,0.14) 0%, rgba(0,0,0,0) 100%)',
				zIndex: 1,
			}}
		/>
	</footer>
)
