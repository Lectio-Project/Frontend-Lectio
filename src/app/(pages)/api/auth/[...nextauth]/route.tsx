import NextAuth, {NextAuthOptions} from "next-auth";
import { nextAuthOptions } from "@/providers/nextAuthOptionsRenomear";

//NextAuth será reutilizado na proteçao de rotas

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST }