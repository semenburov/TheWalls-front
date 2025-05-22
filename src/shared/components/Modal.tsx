'use client'

import { AnimatePresence, m } from 'framer-motion' // Для анімації появи/зникнення модалки
import { type MouseEvent, type ReactNode } from 'react'

/**
 * Props — тип пропсів для Modal.
 * @property {boolean} isOpen - Чи відкрита модалка
 * @property {() => void} onClose - Колбек для закриття модалки
 * @property {ReactNode} children - Контент модалки
 */
interface Props {
	isOpen: boolean
	onClose: () => void
	children: ReactNode
}

/**
 * Modal — універсальна модалка з анімацією (framer-motion).
 * Закривається при кліку на фон або на кнопку ✕.
 *
 * @param {Props} props - Пропси компонента
 * @returns {JSX.Element} - Модальне вікно з анімацією
 */
export function Modal({ isOpen, onClose, children }: Props) {
	// Обробник кліку по фону (backdrop): закриває модалку, якщо клік був саме по фону, а не по контенту
	const handleBackdropClick = (e: MouseEvent) => {
		if (e.target === e.currentTarget) {
			onClose()
		}
	}

	return (
		<AnimatePresence>
			{/* Анімація появи/зникнення модалки */}
			{isOpen && (
				<m.div
					className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
					// fixed inset-0 — фулскрін оверлей
					// bg-black/50 — напівпрозорий чорний фон
					// flex items-center justify-center — центрування контенту
					// z-50 — поверх усього
					initial={{ opacity: 0 }} // Початкова прозорість (анімація появи)
					animate={{ opacity: 1 }} // Анімована прозорість (видима)
					exit={{ opacity: 0 }} // Анімація зникнення
					onClick={handleBackdropClick} // Закриття при кліку на фон
				>
					<m.div
						className='bg-zinc-900 p-6 rounded-lg shadow-lg w-full max-w-sm relative'
						// bg-zinc-900 — темний фон модалки
						// p-6 — відступи
						// rounded-lg — скруглення
						// shadow-lg — тінь
						// w-full max-w-sm — адаптивна ширина
						// relative — для позиціонування кнопки закриття
						initial={{ scale: 0.8 }} // Початковий масштаб (анімація появи)
						animate={{ scale: 1 }} // Анімований масштаб (видима)
						exit={{ scale: 0.8 }} // Анімація зникнення
					>
						<button
							onClick={onClose}
							className='absolute top-0 right-2 text-gray-500 hover:text-gray-700'
							// Кнопка закриття (іконка ✕), позиціонується у правому верхньому куті
						>
							✕
						</button>
						{children} {/* Основний контент модалки */}
					</m.div>
				</m.div>
			)}
		</AnimatePresence>
	)
}
