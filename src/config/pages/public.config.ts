class PublicPages {
	HOME = '/'

	AUTH = '/auth'
	LOGIN = `${this.AUTH}/login`
	REGISTER = `${this.AUTH}/register`
	PLANS = '/plans'
	MAIN = '/main'
}

export const PUBLIC_PAGES = new PublicPages()
