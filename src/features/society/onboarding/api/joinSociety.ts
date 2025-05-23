// src/features/society/onboarding/api/joinSociety.ts

import axios from 'axios'

export const joinSociety = async (data: { token: string }): Promise<any> => {
	const response = await axios.post('/api/users/accept-invite', data)
	return response.data
}
