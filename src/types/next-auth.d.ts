import NextAuth from 'next-auth'

declare module 'next-auth' {
	interface Session {
		id: string
		name: string
		email: string
		username: string
		bio: string | undefined
		imageUrl: string | null
		checkOnBoarding: boolean
		token: string
	}
}