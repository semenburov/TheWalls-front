// src/components/organisms/PlansSection.tsx

'use client'
import { Check } from 'lucide-react' // Іконка "галочка" для списку можливостей
import React from 'react'
import { Button } from '../../../shared/components/Button' // Універсальна кнопка (з підтримкою variant, стилів тощо)

// Масив тарифних планів для відображення у секції
const plans = [
	{
		name: 'Базовий', // Назва тарифу
		price: '0', // Вартість (грн)
		period: 'місяць', // Період оплати
		popular: false, // Чи є тариф популярним (для бейджа)
		features: [
			'Облік показників та платежів',
			'Доступ для 1 об’єднання (ОСББ/кооперативу)',
			'Історія транзакцій та сповіщень',
			'Мобільний кабінет мешканця',
		], // Список можливостей тарифу
		cta: 'Почати безкоштовно', // Текст кнопки
		variant: 'secondary' as const, // Варіант кнопки (стиль)
		highlight: false, // Чи підсвічувати картку (для стилів)
	},
	{
		name: 'Стандарт',
		price: '199',
		period: 'місяць',
		popular: true, // Цей тариф буде з бейджем "Найпопулярніший"
		features: [
			'Усі можливості Базового',
			'Підтримка до 10 об’єднань',
			'Інтеграція онлайн-оплати',
			'Сповіщення SMS, e-mail, Viber',
			'Експорт/імпорт даних',
			'Техпідтримка 24/7',
		],
		cta: 'Підключити',
		variant: 'primary' as const,
		highlight: true, // Підсвічування картки (виділення)
	},
	{
		name: 'Преміум',
		price: '399',
		period: 'місяць',
		popular: false,
		features: [
			'Усі можливості Стандарт',
			'Необмежено об’єднань',
			'API-інтеграції з бухгалтерією',
			'Автоматичний bililng і виписки',
			'Персональний менеджер',
			'Пріоритетна підтримка',
		],
		cta: 'Запитати консультацію',
		variant: 'secondary' as const,
		highlight: false,
	},
]

/**
 * PlansSection — секція з тарифними планами.
 * Відображає три тарифи у вигляді карток з можливостями, ціною, кнопкою та бейджем "Найпопулярніший".
 * Використовує glassmorphism, адаптивну grid-сітку, анімації при hover.
 *
 * @returns {JSX.Element} - Секція з тарифними планами
 */
export const PlansSection: React.FC = () => (
	<section className='relative min-h-screen py-24 px-4 bg-transparent font-sans flex flex-col items-center justify-center'>
		{/* Заголовок секції */}
		<h1 className='text-4xl md:text-6xl font-extrabold mb-4 text-center bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent'>
			Тарифи та можливості
		</h1>
		{/* Пояснювальний підзаголовок */}
		<p className='text-lg md:text-xl text-neutral-300 mb-16 text-center max-w-2xl'>
			Виберіть оптимальний план для вашого ОСББ, житлового або гаражного
			кооперативу. Оптимально для прозорого управління, сучасної оплати та
			цифрового сервісу мешканцям.
		</p>
		{/* Grid-сітка для карток тарифів */}
		<div className='w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-10'>
			{plans.map(plan => (
				<div
					key={plan.name}
					className={`
            relative flex flex-col bg-white/10 border border-white/20 backdrop-blur-2xl shadow-2xl rounded-3xl p-10 transition-all duration-300
            ${
							plan.highlight
								? 'border-2 border-cyan-400 shadow-cyan-500/10 scale-105 z-10'
								: ''
						}
          `}
					// bg-white/10, backdrop-blur-2xl — glassmorphism
					// border, rounded-3xl, shadow-2xl — стилі для рамки, закруглення, тіні
					// transition-all, scale-105 — плавна анімація при hover (для highlight)
				>
					{/* Бейдж "Найпопулярніший" для виділеного тарифу */}
					{plan.popular && (
						<div className='absolute top-5 right-5 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 text-xs text-white font-bold font-mono uppercase shadow'>
							Найпопулярніший
						</div>
					)}
					{/* Назва тарифу */}
					<h2 className='text-2xl font-bold mb-2 font-sans text-white'>
						{plan.name}
					</h2>
					{/* Блок з ціною та періодом */}
					<div className='flex items-end gap-2 mb-8'>
						<span className='font-mono text-5xl md:text-6xl text-cyan-300'>
							₴{plan.price}
						</span>
						<span className='font-sans text-lg text-neutral-300'>
							/ {plan.period}
						</span>
					</div>
					{/* Список можливостей тарифу */}
					<ul className='flex flex-col gap-3 mb-10'>
						{plan.features.map(f => (
							<li key={f} className='flex items-center gap-2 text-neutral-100'>
								<Check className='w-5 h-5 text-cyan-400' />
								<span className='font-sans'>{f}</span>
							</li>
						))}
					</ul>
					{/* Кнопка для дії (CTA) */}
					<Button
						variant={plan.variant}
						className={`mt-auto font-bold py-3 ${
							plan.highlight
								? 'bg-gradient-to-r from-cyan-400 to-blue-400 text-white border-none shadow-md hover:scale-105'
								: ''
						}`}
					>
						{plan.cta}
					</Button>
				</div>
			))}
		</div>
	</section>
)
