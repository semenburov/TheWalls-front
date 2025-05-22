import Image from 'next/image'

/**
 * Props — тип пропсів для MiniLoader.
 * @property {boolean} [isDark] — Якщо true, використовується темний лоадер (dark-loader.svg)
 * @property {number} [width] — Ширина лоадера (за замовчуванням 30)
 * @property {number} [height] — Висота лоадера (за замовчуванням 30)
 */
interface Props {
	isDark?: boolean
	width?: number
	height?: number
}

/**
 * MiniLoader — компонент для відображення міні-лоадера (SVG-анімації).
 * Використовується для індикації завантаження у формі, кнопці тощо.
 *
 * @param {Props} props - Пропси компонента
 * @returns {JSX.Element} - Картинка-лоадер (SVG)
 */
export function MiniLoader({
	isDark = false, // Якщо true — темний лоадер, інакше світлий
	height = 30, // Висота SVG (за замовчуванням 30)
	width = 30, // Ширина SVG (за замовчуванням 30)
	...rest // Інші пропси (наприклад, style, className)
}: Props) {
	return (
		<Image
			src={isDark ? '/dark-loader.svg' : '/loader.svg'} // Вибір SVG залежно від теми
			width={width} // Ширина картинки
			height={height} // Висота картинки
			priority // Пріоритетне завантаження (Next.js)
			alt='' // Альтернативний текст (порожній, бо це декоративний елемент)
			className='mx-auto' // Центрування лоадера по горизонталі
			{...rest} // Передача додаткових пропсів (наприклад, style)
		/>
	)
}
