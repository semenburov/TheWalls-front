/**
 * Card — універсальний glass-контейнер для контенту.
 * Використовується для обгортання будь-якого контенту у стилізовану картку з glassmorphism-ефектом.
 *
 * @param {object} props - Пропси компонента (усі стандартні HTML-атрибути div)
 * @param {React.ReactNode} props.children - Вміст картки
 * @param {string} [props.className] - Додаткові класи Tailwind для кастомізації
 * @returns {JSX.Element} - Стилізована картка
 */
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
	children, // Контент, який буде відображено всередині картки
	className, // Додаткові класи Tailwind для стилізації
	...rest // Інші HTML-атрибути div (наприклад, onClick, style тощо)
}) => (
	<div
		className={`
            h-full                       // Картка займає всю доступну висоту контейнера
            bg-white/10                  // Напівпрозорий білий фон (glassmorphism)
            backdrop-blur-xl             // Сильний блюр заднього фону
            border border-white/15       // Напівпрозорий білий бордер
            shadow-2xl                   // Глибока тінь
            rounded-[2.5rem]             // Великі закруглені кути
            p-8                          // Внутрішні відступи
            transition-all duration-200  // Плавна анімація при hover
            hover:bg-white/20            // Світліший фон при наведенні
            hover:scale-105              // Збільшення картки при наведенні
            hover:shadow-blue-200/30     // Блакитна тінь при наведенні
            font-sans                    // Сучасний шрифт
            ${className ?? ''}           // Додаткові класи, якщо передані
        `}
		{...rest} // Передаємо всі інші пропси (наприклад, onClick, style)
	>
		{children} {/* Основний контент картки */}
	</div>
)
