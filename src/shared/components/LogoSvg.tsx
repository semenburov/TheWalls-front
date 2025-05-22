// src/atoms/LogoSvg.tsx
import React from 'react'

/**
 * LogoSvg — SVG-логотип компанії TheWalls.
 * Складається з градієнтних стін, основного тексту та слогану (опціонально).
 *
 * @param {object} props - Пропси компонента
 * @param {number} [props.width=40] - Ширина SVG (за замовчуванням 40)
 * @param {number} [props.height=44] - Висота SVG (за замовчуванням 44)
 * @param {string} [props.className] - Додаткові класи Tailwind/стилі (опціонально)
 * @param {boolean} [props.isCompanyName] - Чи показувати назву компанії під іконкою
 * @param {boolean} [props.isSlogan] - Чи показувати слоган під назвою
 * @returns {JSX.Element} - SVG-логотип
 */
export const LogoSvg: React.FC<{
	width?: number
	height?: number
	className?: string
	isCompanyName?: boolean
	isSlogan?: boolean
}> = ({
	width = 40, // Ширина SVG за замовчуванням
	height = 44, // Висота SVG за замовчуванням
	className = '', // Додаткові CSS-класи
	isCompanyName = false, // Показувати назву компанії (THEWALLS)
	isSlogan = false, // Показувати слоган (MODERN SOLUTIONS)
}) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 180 280'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		style={{
			display: 'inline-block', // Відображення як інлайн-блок
			verticalAlign: 'middle', // Вертикальне вирівнювання
			alignSelf: 'center', // Центрування в flex-контейнері
		}}
	>
		<defs>
			{/* Градієнт для стін логотипу */}
			<linearGradient
				id='goldGrad'
				x1='0'
				y1='0'
				x2='180'
				y2='200'
				gradientUnits='userSpaceOnUse'
			>
				<stop stopColor='#ecd38b' /> {/* Початок градієнта (золото) */}
				<stop offset='1' stopColor='#634e22' />{' '}
				{/* Кінець градієнта (темно-золотий) */}
			</linearGradient>
		</defs>
		{/* Вертикальний прямокутник із заокругленням і розривом знизу */}
		<path
			d='M36,18
       Q12,18 12,44
       L12,162
       Q12,188 36,188
       L50,188
       M130,188 L144,188
       Q168,188 168,162
       L168,44
       Q168,18 144,18
       L34,18'
			stroke='url(#goldGrad)'
			strokeWidth='7'
			fill='none'
			strokeLinecap='round'
		/>
		{/* Ліва вертикальна стіна */}
		<rect x='65' y='98' width='14' height='80' rx='7' fill='url(#goldGrad)' />
		{/* Права вертикальна стіна (вища) */}
		<rect x='100' y='66' width='14' height='112' rx='7' fill='url(#goldGrad)' />
		{/* Основний текст */}
		{isCompanyName && (
			<text
				x='90'
				y='240'
				textAnchor='middle'
				fill='#fff'
				fontFamily='Montserrat, Arial, sans-serif'
				fontWeight='bold'
				fontSize='38'
			>
				THEWALLS
			</text>
		)}
		{isSlogan && (
			<text
				x='90'
				y='265'
				textAnchor='middle'
				fill='#fff'
				fontFamily='Montserrat, Arial, sans-serif'
				fontSize='16'
				letterSpacing='2'
			>
				MODERN SOLUTIONS
			</text>
		)}
	</svg>
)
