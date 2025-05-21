import { ReactNode } from 'react'

interface Props {
	children: ReactNode
	heading: string
}

/**
 * Обгортка для сторінок аутентифікації
 */
export function AuthPageWrapper({ children, heading }: Props) {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<div className='bg-gradient-to-br from-[#101021] via-[#0f1116] to-[#090d14] p-8 rounded-lg shadow-md w-full max-w-md'>
				<h2 className='font-semibold mb-4 text-center text-2xl text-white'>
					{heading}
				</h2>
				{children}
			</div>
		</div>
	)
}
