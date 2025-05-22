'use client' // Директива Next.js: компонент рендериться лише на клієнті

import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // React Query: клієнт та провайдер для роботи з асинхронними даними
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' // Devtools для дебагу React Query
import { LazyMotion, domAnimation } from 'framer-motion' // Framer Motion: анімації, LazyMotion для оптимізації завантаження
import { type PropsWithChildren, useState } from 'react' // Тип для пропсів з дітьми та хук useState
import { Toaster } from 'react-hot-toast' // Компонент для показу toast-повідомлень

/**
 * Глобальний провайдер для контекстів застосунку.
 * Обгортає додаток провайдерами React Query, Framer Motion, Toaster та Devtools.
 *
 * @param {PropsWithChildren} props - Пропси з дочірніми елементами
 */
export function Providers({ children }: PropsWithChildren) {
	// Створюємо інстанс QueryClient для роботи з кешем і запитами React Query.
	// Використовуємо useState, щоб клієнт був один на весь життєвий цикл компонента.
	const [client] = useState(new QueryClient())

	return (
		<QueryClientProvider client={client}>
			{/* Framer Motion LazyMotion: підключає анімації лише коли потрібно, для оптимізації */}
			<LazyMotion features={domAnimation}>
				{children} {/* Весь контент додатку */}
			</LazyMotion>
			{/* Toaster: глобальний контейнер для toast-повідомлень (сповіщень) */}
			<Toaster />
			{/* React Query Devtools: інструмент для дебагу запитів і кешу */}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
