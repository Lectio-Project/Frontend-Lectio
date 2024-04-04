import NextAuth, {NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

//NextAuth será reutilizado na proteçao de rotas

export const nextAuthOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'email' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials, req) {
				const response = await fetch('https://backend-lectio-r3do.onrender.com/users/sign-in', {
					method: 'POST',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						email: credentials?.email,
						password: credentials?.password
					})
				})

				
				const user = await response.json()
                
				if (user && response.ok) {
					return user
				}

				return null
			},
		})
	],
	pages: {
		signIn: '/signin'
	},
    callbacks: {
        async jwt({ token, user }) {
			user && (token.user = user)
			
			return token
		},
		async session({ session, token }){
			session = token.user as any
			return session
		}
    }
}

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST }