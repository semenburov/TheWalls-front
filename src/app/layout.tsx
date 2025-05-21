'use client'
//import { JetBrains_Mono } from 'next/font/google'
import { AppShell } from './AppShell'
import './globals.css'
import { Providers } from './Providers'
// const JetBrainsFont = JetBrains_Mono({
// 	subsets: ['cyrillic', 'latin'],
// 	weight: '400',
// })

// export const metadata: Metadata = {
// 	title: 'TheWalls online',
// 	description: 'TheWalls online',
// }

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='uk'>
			<head>
				<link
					rel='stylesheet'
					href='https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600;700&display=swap&subset=cyrillic'
				/>
			</head>
			<body className='min-h-screen bg-gradient-to-br from-[#12122c] via-[#0f1013] to-[#080b13]'>
				<Providers>
					<AppShell>{children}</AppShell>
				</Providers>
			</body>
		</html>
	)
}
