'use client' // Директива Next.js: компонент рендериться лише на клієнті

import { BACKEND_SOCIAL_AUTH_URL } from '@/constants' // Базова адреса для редіректу на бекенд-авторизацію
import { MiniLoader } from '@/shared/components/MiniLoader' // Компонент-лоадер для індикатора завантаження
import React, { useState } from 'react'
import { FaGithub, FaGoogle } from 'react-icons/fa' // Іконки соцмереж
import { twMerge } from 'tailwind-merge' // Утиліта для об'єднання tailwind-класів
import { socialsList, type TSocials } from './social-list.data' // Список соцмереж та тип ідентифікатора

// Отримуємо масив соцмереж для відображення кнопок
const list = socialsList()

/**
 * SocialMediaButtons — компонент для відображення кнопок авторизації через соцмережі.
 * Відповідає за відображення, стан завантаження та редірект на бекенд.
 */
export const SocialMediaButtons: React.FC = () => {
	const [loadingId, setLoadingId] = useState<TSocials | null>(null) // Стан: id соцмережі, для якої йде редірект (показати лоадер)

	/**
	 * Обробник кліку по кнопці соцмережі.
	 * Встановлює loadingId та виконує редірект на бекенд-ендпоінт авторизації.
	 * @param {TSocials} id - Ідентифікатор соцмережі ('google', 'github' тощо)
	 */
	const handleRedirect = (id: TSocials) => {
		setLoadingId(id) // Встановлюємо стан завантаження для цієї кнопки
		window.location.href = `${BACKEND_SOCIAL_AUTH_URL}/${id}` // Редірект на бекенд для OAuth-авторизації
	}

	// Об'єкт з іконками для кожної соцмережі (можна розширити)
	const icons = {
		google: <FaGoogle className='text-base mr-2' />,
		github: <FaGithub className='text-base mr-2' />,
	}
	// Тексти для кнопок кожної соцмережі
	const texts = {
		google: 'Sign in with Google',
		github: 'Sign in with GitHub',
	}

	return (
		<div className='flex flex-col gap-3'>
			{list.map(({ id }) => (
				<button
					key={id} // Унікальний ключ для React
					onClick={() => handleRedirect(id)} // Обробник кліку
					disabled={loadingId === id} // Деактивація кнопки під час завантаження
					className={twMerge(
						'w-full flex items-center justify-center gap-2 border border-neutral-600 text-white rounded-xl py-2 px-3 font-semibold hover:bg-neutral-900 transition',
						loadingId === id && 'bg-white/80 cursor-not-allowed' // Додаткові стилі для стану loading
					)}
					type='button'
				>
					{loadingId === id ? (
						<MiniLoader width={20} height={20} isDark /> // Показати лоадер, якщо йде редірект
					) : (
						<>
							{icons[id as keyof typeof icons]} {/* Іконка соцмережі */}
							{texts[id as keyof typeof texts] ?? id} {/* Текст кнопки */}
						</>
					)}
				</button>
			))}
		</div>
	)
}
