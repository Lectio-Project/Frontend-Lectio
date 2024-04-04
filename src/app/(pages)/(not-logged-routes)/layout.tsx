import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

interface PrivateLayoutProps {
	children: ReactNode
}

export default async function PrivateLayout({ children }: PrivateLayoutProps){
	const session = await getServerSession()

	if (session) {
		redirect('/home')
	}

	return <>{children}</>
}