import { useRouter } from 'next/navigation';
import { FooterOnboarding } from '@/types/onboarding-types';
import AlertIcon from '@/app/assets/alertIcon.svg'

import Button from '@/app/components/Button/Button';

import './FooterOnboarding.css';
import { useEffect, useState } from 'react';

export default function FooterOnboarding({ selectedItems = [], page, title }: FooterOnboarding) {
    const [error, setError] = useState<boolean>(false);
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

        return router.replace(page);
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
                <Button className='secondary' title='Pular' type='button' onClick={() => router.push(page)} />
                <Button className={error ? 'error-btn' :'continue-btn'} title='Continuar' type='submit' onClick={handleContinue} />
            </section>
        </footer>
    )
}