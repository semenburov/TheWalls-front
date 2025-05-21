import { instance } from '@/api/axios'
import { IUser } from '@/types/user.types'

import authTokenService from './auth-token.service'

class UserService {
	private _BASE_URL = '/users'

	async fetchProfile() {
		return instance.get<IUser>(`${this._BASE_URL}/profile`)
	}

	async fetchPremium() {
		return instance.get<{ text: string }>(`${this._BASE_URL}/premium`)
	}

	async fetchManagerContent() {
		return instance.get<{ text: string }>(`${this._BASE_URL}/manager`)
	}

	async fetchList() {
		return instance.get<IUser[]>(`${this._BASE_URL}/list`)
	}

	async updateUserEmail(email: string) {
		return instance.patch(`${this._BASE_URL}/update-email`, { email })
	}

	async logout() {
		const response = await instance.post<boolean>('/auth/logout')

		if (response.data) authTokenService.removeAccessToken()

		return response
	}
}

export default new UserService()
