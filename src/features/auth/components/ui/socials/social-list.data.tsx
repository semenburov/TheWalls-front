import type { ReactElement } from 'react'
import type { IconType } from 'react-icons'
import { FaGithub, FaGoogle, FaTelegram } from 'react-icons/fa'

export type TSocials = 'google' | 'github'// | 'telegram'

export type SocialItem = {
	id: TSocials
	icon: ReactElement<IconType>
	name: string
}

export const socialsList = (iconSize = 22): SocialItem[] => [
	{ id: 'google', icon: <FaGoogle size={iconSize} />, name: 'Google' },
	{ id: 'github', icon: <FaGithub size={iconSize} />, name: 'GitHub' },
	//{ id: 'telegram', icon: <FaTelegram size={iconSize} />, name: 'Telegram' },
	//{ id: 'sms', icon: <MdSms size={iconSize} />, name: 'SMS' },
	// { id: 'apple', icon: <FaApple size={iconSize}  />, name: 'Apple' },
]
