/**
 * Загальні типи для props UI-компонентів.
 */

/** Пропси для Button */
export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary'
}

/** Пропси для FeatureCard */
export interface IFeatureCardProps {
	title: string
	description: string
	icon: React.ReactNode
}
