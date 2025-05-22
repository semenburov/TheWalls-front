// src/components/atoms/Input.tsx

import React from 'react'

/**
 * Input - Glass-input Hedra-style з WOW-focus:
 * - Blur, прозорий, білий border
 * - Rounded-full
 * - focus:ring + border glow
 *
 * @param {object} props - Пропси компонента (усі стандартні HTML-атрибути input)
 * @param {string} [props.className] - Додаткові класи Tailwind для кастомізації
 * @returns {JSX.Element} - Стилізований інпут
 */
export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({
	className, // Додаткові класи Tailwind для стилізації (опціонально)
	...rest // Всі інші стандартні HTML-пропси для <input> (type, value, onChange тощо)
}) => (
	<input
		className={`
            bg-white/10                // Напівпрозорий білий фон (glassmorphism)
            border border-white/20     // Напівпрозорий білий бордер
            rounded-full               // Повністю округлі краї
            px-6 py-3                  // Внутрішні відступи
            text-white                 // Білий текст
            placeholder:text-neutral-300 // Світло-сірий placeholder
            outline-none               // Без стандартного outline браузера
            backdrop-blur-xl           // Сильний блюр заднього фону
            shadow-lg                  // Глибока тінь
            focus:ring-2 focus:ring-cyan-400 // Блакитне кільце при фокусі
            focus:border-cyan-300      // Підсвічування бордера при фокусі
            transition-all duration-200 // Плавна анімація при фокусі/hover
            font-sans                  // Сучасний шрифт
            ${className ?? ''}         // Додаткові класи, якщо передані
        `}
		{...rest} // Передаємо всі інші пропси (type, value, onChange, name тощо)
	/>
)
