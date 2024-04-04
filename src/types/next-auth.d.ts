import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		id: string
		name: string
		email: string
		username: string
		bio: string | null
		imageUrl: string | null
		checkOnBoarding: boolean
		token: string
	}
}