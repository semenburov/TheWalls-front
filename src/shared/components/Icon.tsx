// src/components/atoms/Icon.tsx

import React from 'react'

/**
 * Icon — універсальний контейнер для іконок або emoji.
 * Додає WOW-ефекти: drop-shadow, scale при hover, адаптивний розмір.
 *
 * @param {object} props - Пропси компонента
 * @param {React.ReactNode} props.children - Вміст іконки (emoji, svg, будь-який React-елемент)
 * @returns {JSX.Element} - Стилізований контейнер для іконки
 */
export const Icon: React.FC<{ children: React.ReactNode }> = ({ children }) => (
	<span
		className='
            inline-block                      // Відображення як інлайн-блок (для коректного масштабування)
            text-5xl md:text-6xl             // Великий розмір іконки, ще більший на md+
            drop-shadow-[0_8px_24px_rgba(52,170,255,0.35)] // Блакитна тінь під іконкою
            transition-transform duration-200 // Плавна анімація трансформацій
            hover:scale-110                  // Збільшення при наведенні
            hover:drop-shadow-[0_12px_36px_rgba(52,170,255,0.45)] // Яскравіша тінь при наведенні
        '
	>
		{children} {/* Вміст іконки (emoji, svg тощо) */}
	</span>
)
