'use client'

import api from "@/api/api";
import { useDataContext } from "@/context/user";
import { getCookie } from "@/utils/cookies";
import { useEffect } from "react";

export default function Home() {
    const {onboarding, setOnboarding} = useDataContext();

    useEffect(() => {
        handleOnboardingSteps();
    }, [])

    async function handleOnboardingSteps() {
        try {
            if (onboarding !== undefined) {
                const token = await getCookie('token');
    
                await api.patch('/users', onboarding, {
                    headers: { Authorization: `Bearer ${token}` }
                });
            }
        } catch (error) {
            return console.error(error);
        } 
    }
    return (
        <main>
            Home
        </main>
    )
}