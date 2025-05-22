import type { ReactElement } from 'react' // Тип для React-елемента (іконки)
import type { IconType } from 'react-icons' // Тип для іконок з бібліотеки react-icons
import { FaGithub, FaGoogle } from 'react-icons/fa' // Іконки соцмереж

// Тип для ідентифікаторів соцмереж, які підтримуються (Google, GitHub)
// Якщо потрібно додати нову соцмережу — додайте її тут
export type TSocials = 'google' | 'github' // | 'telegram'

// Тип для елемента соцмережі у списку
export type SocialItem = {
	id: TSocials // Унікальний ідентифікатор соцмережі (наприклад, 'google')
	icon: ReactElement<IconType> // React-елемент іконки (з react-icons)
	name: string // Назва соцмережі для відображення
}

/**
 * Функція повертає масив об'єктів SocialItem для відображення кнопок соцмереж.
 * @param {number} iconSize - Розмір іконки (за замовчуванням 22)
 * @returns {SocialItem[]} - Масив соцмереж для відображення
 */
export const socialsList = (iconSize = 22): SocialItem[] => [
	{ id: 'google', icon: <FaGoogle size={iconSize} />, name: 'Google' }, // Google-авторизація
	{ id: 'github', icon: <FaGithub size={iconSize} />, name: 'GitHub' }, // GitHub-авторизація
	//{ id: 'telegram', icon: <FaTelegram size={iconSize} />, name: 'Telegram' }, // Telegram (закоментовано)
	//{ id: 'sms', icon: <MdSms size={iconSize} />, name: 'SMS' }, // SMS (закоментовано)
	// { id: 'apple', icon: <FaApple size={iconSize}  />, name: 'Apple' }, // Apple (закоментовано)
]
