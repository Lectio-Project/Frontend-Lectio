import { useRouter } from 'next/navigation';
import { FooterOnboardingProps, Onboarding } from '@/types/onboarding-types';
import AlertIcon from '@/app/assets/alertIcon.svg'

import Button from '@/app/components/Button/Button';

import { useEffect, useState } from 'react';
import { useDataContext } from '@/context/user';
import './FooterOnboarding.css';
// import api from '@/api/api';
// import { getCookie } from '@/utils/cookies';

export default function FooterOnboarding({ selectedItems = [], page, title }: FooterOnboardingProps) {
    const [error, setError] = useState<boolean>(false);
    const {onboarding, setOnboarding} = useDataContext();
    const router = useRouter();

    useEffect(() => {
        if (selectedItems.length === 3) {
            return setError(false);
        }
    }, [selectedItems])

    async function handleContinue() {
        if (selectedItems.length < 3) {
            return setError(true);
        } 

        let titleForOnboarding: string;
        const idsForOnboarding = selectedItems.map(item => item.id);

        if (title === "gêneros") {
            titleForOnboarding = "genresId";
        }
        else if (title === "autores") {
            titleForOnboarding = "authorsId";
        } else {
            titleForOnboarding = "booksId";
        }

        const newOnboardingItem: Onboarding = {
            ...onboarding,
            [titleForOnboarding]: idsForOnboarding
          };

        setOnboarding(newOnboardingItem);
        return router.replace(page);
        
        // try {
        //     if (window.location.pathname === '/onboarding/page4') {
        //         const token = await getCookie('token');

        //         await api.patch('/users', onboarding, {
        //             headers: { Authorization: `Bearer ${token}` }
        //         });
        //     }

        //     return router.replace(page);
        // } catch (error) {
        //     return console.error(error);
        // }
    }

    return (
        <footer className='onboarding-footer-button-action'>
            {error && 
                <div className='error-message'>
                    <img src={AlertIcon} className='alert-icon'/>
                    <span>Selecione 3 {title} para continuar ou aperte pular</span>
                </div>
            }

            <section className='onboarding-buttons'>
                <Button className='secondary' title='Pular' type='button' onClick={() => router.replace(page)} />
                <Button className={error ? 'error-btn' :'continue-btn'} title='Continuar' type='submit' onClick={handleContinue} />
            </section>
        </footer>
    )
}