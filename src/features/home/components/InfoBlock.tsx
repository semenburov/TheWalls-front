import React from 'react'

/**
 * InfoBlock — універсальний контейнер для виділення інформації на сторінці.
 * Приймає children (будь-який React-контент) і обгортає його у стилізований блок.
 *
 * @param {object} props - Пропси компонента
 * @param {React.ReactNode} props.children - Вміст, який буде відображено всередині блоку
 * @returns {JSX.Element} - Стилізований інформаційний блок
 */
export const InfoBlock: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => (
	<div
		className='
            bg-blue-800/60           // Напівпрозорий синій фон
            rounded-2xl              // Великі закруглені кути
            p-6                      // Внутрішні відступи
            text-white               // Білий текст
            text-center              // Центрування тексту
            shadow-2xl               // Глибока тінь
            backdrop-blur-xl         // Сильний блюр заднього фону
            border border-blue-300/20// Напівпрозорий синій бордер
            transition-all duration-200 // Плавна анімація при наведенні
            hover:scale-105          // Збільшення блоку при наведенні
            hover:bg-blue-800/80     // Трохи темніший фон при наведенні
            font-sans                // Сучасний шрифт
        '
	>
		{children} {/* Основний контент, який передається у блок */}
	</div>
)
