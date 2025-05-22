import React from 'react'
import { Icon } from '../../../shared/components/Icon'

/**
 * FeatureCardProps — тип пропсів для компонента FeatureCard.
 * @property {string} title - Заголовок фічі/можливості
 * @property {string} description - Опис фічі/можливості
 * @property {React.ReactNode} icon - Іконка, яка відображає суть фічі
 */
interface FeatureCardProps {
	title: string // Заголовок фічі
	description: string // Опис фічі
	icon: React.ReactNode // React-елемент іконки
}

/**
 * FeatureCard — картка для відображення окремої фічі/можливості платформи.
 * Включає іконку, заголовок та опис. Має анімовані стилі при наведенні.
 *
 * @param {FeatureCardProps} props - Пропси компонента
 * @returns {JSX.Element} - Картка фічі
 */
export const FeatureCard: React.FC<FeatureCardProps> = ({
	title,
	description,
	icon,
}) => (
	<div
		className='h-full bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 shadow-2xl
      transition-all duration-200 hover:bg-white/20 hover:scale-105 flex flex-col items-center md:items-start font-sans'
		// h-full — картка займає всю висоту контейнера
		// bg-white/10 — напівпрозорий білий фон
		// backdrop-blur-md — блюр заднього фону
		// border, rounded-3xl, shadow-2xl — стилі для рамки, закруглення, тіні
		// transition-all, hover:bg-white/20, hover:scale-105 — плавна анімація при наведенні
		// flex flex-col items-center md:items-start — вертикальне розміщення, центрування (на md — вирівнювання вліво)
	>
		<Icon>{icon}</Icon> {/* Відображення іконки через окремий компонент */}
		<h3 className='text-2xl font-extrabold mb-2 mt-4 font-sans'>
			{title}
		</h3>{' '}
		{/* Заголовок фічі */}
		<p className='text-neutral-100/90 font-sans flex-1'>{description}</p>{' '}
		{/* Опис фічі */}
	</div>
)
