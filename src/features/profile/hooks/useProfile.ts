// src/features/profile/hooks/useProfile.ts

import { useBaseMutation } from '@/shared/hooks/useBaseMutation' // змінити шлях якщо треба
import UserProfileService from '../services/profile.service' // змінити шлях якщо треба

export const useProfile = () => {
	// mutationKey обираємо довільний, successRedirect та defaultErrorMsg — для універсальності
	const {
		mutate: fetchProfile,
		data: user,
		isLoading,
		isSuccess,
		error,
	} = useBaseMutation(UserProfileService.getProfile, {
		mutationKey: ['get-profile'],
		defaultErrorMsg: 'Не вдалося завантажити профіль',
	})

	return {
		user,
		isLoading,
		isSuccess,
		error,
		fetchProfile, // ти викликаєш fetchProfile() для завантаження профілю
	}
}
