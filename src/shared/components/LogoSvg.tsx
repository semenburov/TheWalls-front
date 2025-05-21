// src/atoms/LogoSvg.tsx
import React from 'react'

export const LogoSvg: React.FC<{
	width?: number
	height?: number
	className?: string
	isCompanyName?: boolean
	isSlogan?: boolean
}> = ({
	width = 40,
	height = 44,
	className = '',
	isCompanyName = false,
	isSlogan = false,
}) => (
	<svg
		width={width}
		height={height}
		viewBox='0 0 180 280'
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		className={className}
		style={{
			display: 'inline-block',
			verticalAlign: 'middle',
			alignSelf: 'center',
		}}
	>
		<defs>
			<linearGradient
				id='goldGrad'
				x1='0'
				y1='0'
				x2='180'
				y2='200'
				gradientUnits='userSpaceOnUse'
			>
				<stop stopColor='#ecd38b' />
				<stop offset='1' stopColor='#634e22' />
			</linearGradient>
		</defs>
		//Вертикальний прямокутник із заокругленням і розривом знизу
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
		//Ліва вертикальна стіна
		<rect x='65' y='98' width='14' height='80' rx='7' fill='url(#goldGrad)' />
		//Права вертикальна стіна (вища)
		<rect x='100' y='66' width='14' height='112' rx='7' fill='url(#goldGrad)' />
		// Основний текст
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
