import type { NextConfig } from 'next'

/**
 * nextConfig — основний конфіг Next.js для проєкту.
 * Визначає глобальні налаштування для рендеру, безпеки, роботи з картинками тощо.
 */
const nextConfig: NextConfig = {
	reactStrictMode: true, // Вмикає React Strict Mode (додаткові перевірки, попередження у дев-режимі)
	poweredByHeader: false, // Вимикає заголовок X-Powered-By (з міркувань безпеки)
	images: {
		remotePatterns: [
			{
				protocol: 'https', // Дозволяє лише https-завантаження
				hostname: 'lh3.googleusercontent.com', // Google Avatars (Google OAuth)
				port: '',
				pathname: '/**', // Дозволяє всі шляхи
			},
			{
				protocol: 'https',
				hostname: 'avatars.githubusercontent.com', // GitHub Avatars (GitHub OAuth)
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'static-cdn.jtvnw.net', // Twitch CDN (Twitch OAuth)
				port: '',
				pathname: '/**',
			},
			{
				protocol: 'https',
				hostname: 'github.com', // GitHub (можливо для інших зображень)
				port: '',
				pathname: '/**',
			},
		],
		// remotePatterns — перелік дозволених зовнішніх джерел для <Image /> Next.js
		// Це потрібно для безпечного використання зовнішніх аватарок/зображень у вашому застосунку
	},
}

export default nextConfig
