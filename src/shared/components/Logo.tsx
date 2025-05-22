// src/components/atoms/Logo.tsx

import React from 'react'

/**
 * Logo - Hedra-style градієнтний wow-логотип.
 * Відображає назву продукту з градієнтним текстом, drop-shadow та сучасним шрифтом.
 *
 * @param {object} props - Пропси компонента
 * @param {string} [props.className] - Додаткові класи Tailwind для кастомізації (опціонально)
 * @returns {JSX.Element} - Стилізований логотип
 */
export const Logo: React.FC<{ className?: string }> = ({ className }) => (
	<span
		className={`
            font-black                  // Дуже жирний шрифт
            text-4xl md:text-5xl       // Великий розмір тексту, ще більший на md+
            bg-gradient-to-r           // Градієнт справа наліво
            from-cyan-400 via-fuchsia-400 to-blue-500 // Кольори градієнта
            bg-clip-text               // Градієнт застосовується лише до тексту
            text-transparent           // Текст прозорий, щоб показати градієнт
            drop-shadow-lg             // Глибока тінь під текстом (wow-ефект)
            tracking-tight             // Зменшений інтервал між літерами
            font-sans                  // Сучасний sans-serif шрифт
            ${className ?? ''}         // Додаткові класи, якщо передані
        `}
	>
		TheWalls Online {/* Назва продукту */}
	</span>
)
