'use client' // Директива Next.js: компонент рендериться лише на клієнті

import { Metadata } from 'next' // Тип для SEO-метаданих сторінки
import { AppShell } from './AppShell' // Головна обгортка для макету сторінки (хедер, футер, сайдбар)
import './globals.css' // Глобальні CSS-стилі для всього застосунку
import { Providers } from './Providers' // Провайдери контексту (наприклад, для теми, авторизації, React Query тощо)

/**
 * Об'єкт метаданих для всієї програми (SEO, заголовок, опис)
 * Використовується Next.js для генерації <head>
 */
export const metadata: Metadata = {
	title: 'TheWalls online', // Заголовок сторінки (title)
	description: 'TheWalls online', // Опис сторінки (description)
}

/**
 * Головний layout-компонент для всього застосунку.
 * Обгортка для всіх сторінок, визначає структуру HTML-документа.
 *
 * @param {object} props
 * @param {React.ReactNode} props.children - Вміст поточної сторінки
 */
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode // Дочірній контент (сторінки, модальні тощо)
}>) {
	return (
		<html lang='uk'>
			{' '}
			{/* Встановлює мову документа (українська) */}
			<head>
				{/* Підключення Google Fonts для шрифтів (Inter, JetBrains Mono, підтримка кирилиці) */}
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap&subset=cyrillic'
				/>
			</head>
			<body className='min-h-screen bg-gradient-to-br from-[#12122c] via-[#0f1013] to-[#080b13]'>
				{/* Провайдери контексту (наприклад, React Query, ThemeProvider, AuthProvider тощо) */}
				<Providers>
					{/* Основна обгортка макету (хедер, футер, сайдбар, фон) */}
					<AppShell>
						{children} {/* Вміст поточної сторінки */}
					</AppShell>
				</Providers>
			</body>
		</html>
	)
}
