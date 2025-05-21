import authService from '@/features/auth/services/auth.service'
import userService from '@features/auth/services/user.service'
import { transformUserToState } from '@/utils/transform-user-to-state'
import { useQuery } from '@tanstack/react-query'

export function useProfile() {
	const { data, isLoading, error } = useQuery({
		queryKey: ['profile'],
		retry: false,

		queryFn: () => userService.fetchProfile(),
		refetchInterval: 1800000, // 30 minutes
	})

	const {
		isSuccess,
		data: dataTokens,
		refetch,
	} = useQuery({
		queryKey: ['new tokens'],
		queryFn: () => authService.getNewTokens(),
		enabled: !data?.data,
	})

	const profile = data?.data

	const userState = profile ? transformUserToState(profile) : null

	return {
		isLoading,
		refetch,
		error,
		user: {
			...profile,
			...userState,
		},
	}
}
