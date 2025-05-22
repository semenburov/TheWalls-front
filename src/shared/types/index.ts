/**
 * Загальні типи для props UI-компонентів.
 * Тут зберігаються типи, які використовуються у різних компонентах інтерфейсу.
 */

/**
 * TButtonProps — тип пропсів для компонента Button.
 * Наслідує всі стандартні HTML-атрибути для <button> (type, onClick, disabled тощо).
 * Додає кастомний пропс variant для вибору стилю кнопки.
 *
 * @property {'primary' | 'secondary'} [variant] — Стиль кнопки (основна або вторинна)
 */
export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	variant?: 'primary' | 'secondary'
}

/**
 * IFeatureCardProps — тип пропсів для компонента FeatureCard.
 * Використовується для передачі даних про одну фічу/перевагу у картці.
 *
 * @property {string} title — Заголовок фічі/картки
 * @property {string} description — Опис фічі/картки
 * @property {React.ReactNode} icon — Іконка (SVG, emoji або будь-який React-елемент)
 */
export interface IFeatureCardProps {
	title: string
	description: string
	icon: React.ReactNode
}
