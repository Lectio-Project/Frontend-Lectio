'use client'

import api from '@/api/api';
import Loading from '@/app/components/Loading/loading';
import { useDataContext } from '@/context/user';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import './validate.css';

export default function Validate() {
    const {data: session, update} = useSession();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const {onboarding, setOnboarding} = useDataContext();
    
    useEffect(() => {
        handleOnboardingSteps();
    }, [])

    async function handleOnboardingSteps() {
        try {
            const token = session?.token;    

            for (const item in onboarding) {

                if (onboarding.hasOwnProperty(item) && Array.isArray(onboarding[item]) && onboarding[item]?.length === 0) {
                    delete onboarding[item];
                }
            }
            
            const request = {...onboarding, checkOnBoarding: true}
            
            await api.patch('/users', request, {
                headers: { Authorization: `Bearer ${token}` }
            });  
            
            setOnboarding({ genresId: [], authorsId: [], booksId: [] })
            update({checkOnBoarding: true});
            
        } catch (error) {
            return console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    return isLoading ? (
        <div className='loading-validate'>
            <Loading />
        </div>
    ) : redirect('/home')
}